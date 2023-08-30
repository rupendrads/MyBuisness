export class PostcoderAutocomplete{
  
  constructor(config) {
    this.config = config
    this.init()
  }

  init = () => {

    this.suggestionendpoint = 'https://ws.postcoder.com/pcw/autocomplete/find?apikey=' + this.config.apikey
    this.retrieveendpoint = 'https://ws.postcoder.com/pcw/autocomplete/retrieve?apikey=' + this.config.apikey
    this.cache = []
    this.suggestionhierarchy = []
    this.suggestions = []
    this.searchterm = ''
    this.selectedoptiontext = ''
    this.pathfilter = ''
    this.selectedIndex = -1
    this.no_results_message = 'No addresses found'
    this.inputdelay = 300

    this.suggestionlist = document.querySelector(this.config.suggestions)
    this.input = document.querySelector(this.config.searchterm)

    this.input.setAttribute('type', 'search')
    this.input.setAttribute('autocomplete', 'off')
    this.input.setAttribute('autocapitalize', 'off')
    this.input.setAttribute('autocorrect', 'off')
    this.input.setAttribute('spellcheck', 'false')

    this.input.addEventListener('input', this.handleInput)
    this.input.addEventListener('focus', this.handleFocus)
    this.input.addEventListener('keydown', this.handleKeyDown)

    this.suggestionlist.addEventListener('click', this.handleSuggestionClick)

    // add click event listener to the document, to hide the suggestions when clicked away
    document.body.addEventListener('click', this.handleDocumentClick)

    // determine the number of addresslines required
    this.addresslines = 0
    for (let i = 1; i <= 4; i++) {
      if( this.config['addressline'+i] !== ''){
        this.addresslines ++
      }
    }    

  }

  getSuggestions = event =>{

    this.searchterm = encodeURIComponent(this.input.value.trim())

    // require a minimum of three characters
    if(this.searchterm.length < 3){
      this.hideSuggestions()
      return
    }

    let url = this.suggestionendpoint + '&country=' + this.getCountry() + '&query=' + this.searchterm

    if(this.pathfilter){
      url += '&pathfilter=' + this.pathfilter
    }else{
      this.selectedoptiontext = this.searchterm
    }

    let index = this.cache.findIndex(c => c.url === url)

    if( index >= 0){

      // use cached data
      this.suggestions = this.cache[index].suggestions
      this.addSuggestionHierarchy(index)
      this.showSuggestions()

    }else{

      fetch(url)
        .then( response => {
          if (!response.ok) { 
            throw response 
          }
          return response.json()
        })
        .then( json => {
          this.suggestions = json
          this.addCache(url)
          this.addSuggestionHierarchy(this.cache.length - 1)          
          this.showSuggestions()
        })
        .catch( err => {

          if(typeof err.text === 'function'){
            err.text().then( errorMessage => {
              console.log('Postcoder request error ' + err.status + ' : ' + errorMessage)
            })
          }else{
            console.log(err)
          }

      })

    }
  }

  addCache = url => {

    let obj = {}
    obj.url = url
    obj.suggestions = this.suggestions
    obj.label = this.selectedoptiontext
    this.cache.push(obj)

  }

  newSuggestionsReset = () => {

    // remove previous options
    this.hideSuggestions()
    this.pathfilter = ''

    this.suggestionlist.scrollTop = 0
    this.selectedIndex = -1

  }

  suggestionsHierarchyReset = () => {
    //reset suggestionHierarchy
    this.suggestionhierarchy = []
  }

  addSuggestionHierarchy = index => {

    // store the cache entry index for each suggestion level selected
    this.suggestionhierarchy.push(index)

  }

  handleSuggestionClick = event => {

    event.stopPropagation()

    let target = event.target

    // if click was not directly on the <li>, but a child, find the <li> in parent
    while(target.tagName.toLowerCase() !== 'li' ){
      target = target.parentNode
    }

    this.selectSuggestion(target)

  }

  selectSuggestion = target => {

    this.selectedoptiontext = target.innerHTML

    if(target.getAttribute('data-type') == 'CACHE'){
      // back to previous results using cached suggestions
      this.suggestions = this.cache[target.getAttribute('data-id')].suggestions
      this.suggestionhierarchy.pop()
      this.showSuggestions()

    }else if(target.getAttribute('data-type') == 'ADD'){  
      // if the type is an address, retrieve it using the id
      this.retrieve(target.getAttribute('data-id'))
    }else{
      // get more suggestions, using the id
      this.pathfilter = target.getAttribute('data-id')
      this.getSuggestions()
    }    
        
  }

  retrieve = id => {

    var url = this.retrieveendpoint + '&country=' + this.getCountry() + '&query=' + this.searchterm + '&id=' + id + '&lines='+this.addresslines + '&exclude=organisation,country'

    // fetch the json formatted result from Postcoder and pass it to processResult
    fetch(url)
      .then( response => {
        if (!response.ok) { 
          throw response 
        }
        return response.json()
      })
      .then( addresses => {
        // always one result, use the first array item
        this.cache[url] = addresses[0]
        this.processResult(addresses[0])
      })
      .catch( err => {

        if(typeof err.text === 'function'){
          err.text().then( errorMessage => {
            console.log('Postcoder request error ' + err.status + ' : ' + errorMessage)
          })
        }else{
          console.log(err)
        }
    })
  }

  showSuggestions = () => {

    this.newSuggestionsReset()

    if( this.suggestions.length === 0 ){
      // show no results message in ul
      let option = document.createElement('li')
      option.innerHTML = this.no_results_message
      this.suggestionlist.appendChild(option)

    }
    else{

      if(this.suggestionhierarchy.length > 1){
        // a suggestion was selected so show previous option
        let cacheid = this.suggestionhierarchy[this.suggestionhierarchy.length - 2] // .length -1 is current suggestions
        let option = document.createElement('li')   
        option.classList.add('header')     
        option.innerHTML = '<i class="arrow left"></i> ' + unescape(this.cache[cacheid].label)
        option.setAttribute('data-id', cacheid)
        option.setAttribute('data-type', 'CACHE')
        this.suggestionlist.appendChild(option)

      }

      for (let i = 0; i < this.suggestions.length; i++) {

        let option = document.createElement('li')

        let suggestiontext = this.suggestions[i].summaryline + ' ' + '<span class="location">' + this.suggestions[i].locationsummary + '</span>'

        if(this.suggestions[i].count > 1){

          let count = this.suggestions[i].count > 100 ? '100+' : this.suggestions[i].count
          suggestiontext += ' <span class="count">(' + count + ' addresses)</span>'

        }

        option.innerHTML = suggestiontext 

        // add the id and type attibutes to the option
        option.setAttribute('data-id', this.suggestions[i].id)
        option.setAttribute('data-type', this.suggestions[i].type)

        this.suggestionlist.appendChild(option)

      }
    }
  }

  getCountry = () => {

    return (typeof this.config.countrycode !== 'undefined' && this.config.countrycode !== '') 
      ? this.config.countrycode 
      : document.querySelector(this.config.country).value
    
  }

  processResult = address => {

    this.hideSuggestions()

    let fields = ['organisation','addressline1','addressline2','addressline3','addressline4','posttown','county','postcode']

    //populate the address form  
    for (let i = 0; i < fields.length; i++) {
      let field_selector = this.config[fields[i]]
      if(typeof field_selector !== 'undefined' && field_selector !== ''){
        document.querySelector(field_selector).value = (typeof address[fields[i]] !== 'undefined') ? address[fields[i]] : ''
      }
    }
  }

  handleDocumentClick = event => {

    if (this.suggestionlist.contains(event.target) || this.input.contains(event.target)) {
      return
    }

    this.hideSuggestions()

  }

  hideSuggestions = () => {

    // clear the ul list
    this.suggestionlist.innerHTML = ''

  }

  handleKeyDown = event => {

    const { key } = event

    switch (key) {
      case 'Up':
      case 'Down':
      case 'ArrowUp':
      case 'ArrowDown': {
        const selectedIndex =
          key === 'ArrowUp' || key === 'Up'
            ? this.selectedIndex - 1
            : this.selectedIndex + 1
        event.preventDefault()
        this.handleArrows(selectedIndex)
        break
      }
      case 'Tab': {
        this.handleTab(event)
        break
      }
      case 'Enter': {
        this.selectSuggestion( this.suggestionlist.querySelectorAll('li')[this.selectedIndex] )
        break
      }
      case 'Esc':
      case 'Escape': {
        this.hideSuggestions()
        this.setValue()
        break
      }
      default:
        return
    }
  }

  handleArrows = selectedIndex => {

    // Loop selectedIndex back to first or last result if out of bounds
    let suggestionsCount = this.suggestions.length

    if(this.suggestionhierarchy.length > 1){
      // add previous suggestion
      suggestionsCount++
    }

    if(this.suggestionlist.querySelectorAll('li').length > 0){

      if(this.selectedIndex >= 0){
        // clear the previously selected class
        this.suggestionlist.querySelectorAll('li')[this.selectedIndex].classList.remove('selected')
      }

      this.selectedIndex = ((selectedIndex % suggestionsCount) + suggestionsCount) % suggestionsCount

      // set the selected class
      this.suggestionlist.querySelectorAll('li')[this.selectedIndex].classList.add('selected')

      // scroll into view
      this.suggestionlist.querySelectorAll('li')[this.selectedIndex].scrollIntoView(false)

    }
  }

  handleTab = event => {
    if(this.selectedIndex >= 0){
      event.preventDefault()
      this.selectSuggestion( this.suggestionlist.querySelectorAll('li')[this.selectedIndex] )
    }else{
      this.hideSuggestions()
    }
  }

  handleInput = () => {
    this.suggestionsHierarchyReset()
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.getSuggestions(), this.inputdelay)
  }

  handleFocus = () => {
    if(this.suggestions.length > 0){
      this.showSuggestions()
    }else{
      this.getSuggestions()
    }
  }

}