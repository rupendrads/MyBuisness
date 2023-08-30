import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MyErrorStateMatcher } from './job-title.component';
import { JobPostService } from '../../services/jobPost.service';

@Component({
  selector: 'app-jobplace',
  templateUrl: './jobplace.component.html',
  styleUrls: ['./jobplace.component.css', '../../../post-coder/postcoder.css']
})
export class JobplaceComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('input',{static : true}) input!: ElementRef<HTMLInputElement>;
    @ViewChild('suggestionlist',{static : true}) suggestionlist!:ElementRef;
    @Output() optionChanged = new EventEmitter<number>();
    jobPlaceFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();

    // postcode autocomplete variables
    suggestionendpoint:any;
    retrieveendpoint:any;
    cache: any;
    suggestionhierarchy:any;
    suggestions:any;
    searchterm:any;
    selectedoptiontext:any;
    pathfilter:any;
    selectedIndex:any;
    no_results_message:any;
    inputdelay:any;
    
    constructor(private jobPostService: JobPostService){
    }

    ngOnInit(): void {    
      if(this.jobPostService.JobPost.JobStatic?.PostCode){
        this.jobPlaceFormControl.setValue(this.jobPostService.JobPost.JobStatic?.PostCode);
      }   

      this.postcodeinit();                
    }
  
    ngAfterViewInit(){
        console.log("emit from jobplace");
      this.optionChanged.emit(-1);
    }

    ngOnDestroy(): void {
      console.log(this.jobPlaceFormControl.value);
      if(this.jobPlaceFormControl.value!== null){
        this.jobPostService.setJobPostCode(this.jobPlaceFormControl.value);
      }
    } 

    postcodeinit(){
      this.suggestionendpoint = 'https://ws.postcoder.com/pcw/autocomplete/find?apikey=PCW2G-5SLX7-DKHNA-F3MKX';
      this.retrieveendpoint = 'https://ws.postcoder.com/pcw/autocomplete/retrieve?apikey=PCW2G-5SLX7-DKHNA-F3MKX';
      this.cache = [];
      this.suggestionhierarchy = [];
      this.suggestions = [];
      this.searchterm = '';
      this.selectedoptiontext = '';
      this.pathfilter = '';
      this.selectedIndex = -1;
      this.no_results_message = 'No addresses found';
      this.inputdelay = 300;

      this.input.nativeElement.setAttribute('type', 'search')
      this.input.nativeElement.setAttribute('autocomplete', 'off')
      this.input.nativeElement.setAttribute('autocapitalize', 'off')
      this.input.nativeElement.setAttribute('autocorrect', 'off')
      this.input.nativeElement.setAttribute('spellcheck', 'false')

      this.input.nativeElement.addEventListener('input', this.handleInput)
      this.input.nativeElement.addEventListener('focus', this.handleFocus)
      this.input.nativeElement.addEventListener('keydown', this.handleKeyDown)

      this.suggestionlist.nativeElement.addEventListener('click', this.handleSuggestionClick)

      // add click event listener to the document, to hide the suggestions when clicked away
      document.body.addEventListener('click', this.handleDocumentClick)      
    }

    hideSuggestions = () => {
      // clear the ul list
      console.log(this.suggestionlist);

      this.suggestionlist.nativeElement.innerHTML = ''  
    }

    addCache = (url:any) => {
      let obj:any = {}
      obj.url = url;
      obj.suggestions = this.suggestions;
      obj.label = this.selectedoptiontext;
      this.cache.push(obj);
    }

    addSuggestionHierarchy = (index:any) => {
      // store the cache entry index for each suggestion level selected
      this.suggestionhierarchy.push(index)  
    }

    newSuggestionsReset = () => {
      // remove previous options
      this.hideSuggestions()
      this.pathfilter = ''
  
      this.suggestionlist.nativeElement.ATTRIBUTE_NODE;
      this.selectedIndex = -1  
    }

    showSuggestions = () => {

      this.newSuggestionsReset()
  
      if( this.suggestions.length === 0 ){
        // show no results message in ul
        let option = document.createElement('li')
        option.innerHTML = this.no_results_message
        this.suggestionlist.nativeElement.appendChild(option)
  
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
          this.suggestionlist.nativeElement.appendChild(option)
  
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
  
          this.suggestionlist.nativeElement.appendChild(option)
  
        }
      }
    }

    
  handleDocumentClick = (event:any) => {
    if (this.suggestionlist.nativeElement.contains(event.target) || this.input.nativeElement.contains(event.target)) {
      return;
    }
    this.hideSuggestions();
  }

  processResult = () => {
    this.hideSuggestions();    
  }

  retrieve = (id:any) => {

    var url = this.retrieveendpoint + '&country=' + 'GB' + '&query=' + this.searchterm + '&id=' + id + '&exclude=organisation,country'

    // fetch the json formatted result from Postcoder and pass it to processResult
    fetch(url)
      .then( response => {
        if (!response.ok) { 
          throw response;
        }
        return response.json();
      })
      .catch( err => {
        if(typeof err.text === 'function'){
          err.text().then( (errorMessage:any) => {
            console.log('Postcoder request error ' + err.status + ' : ' + errorMessage)
          })
        }else{
          console.log(err)
        }
    })
  }

  selectSuggestion = (target:any) => {
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
      this.getSuggestions();
    }    
        
  }

  handleSuggestionClick = (event:any) => {
    event.stopPropagation();
    let target = event.target;

    // if click was not directly on the <li>, but a child, find the <li> in parent
    while(target.tagName.toLowerCase() !== 'li' ){
      target = target.parentNode
    }

    this.selectSuggestion(target)

  }

  suggestionsHierarchyReset = () => {
    //reset suggestionHierarchy
    this.suggestionhierarchy = []
  }

  handleInput = () => {
    this.suggestionsHierarchyReset();
  }

  handleTab = (event:any) => {
    if(this.selectedIndex >= 0){
      event.preventDefault()
      this.selectSuggestion( this.suggestionlist.nativeElement.querySelectorAll('li')[this.selectedIndex] )
    }else{
      this.hideSuggestions()
    }
  }

  handleArrows = (selectedIndex:any) => {

    // Loop selectedIndex back to first or last result if out of bounds
    let suggestionsCount = this.suggestions.length

    if(this.suggestionhierarchy.length > 1){
      // add previous suggestion
      suggestionsCount++
    }

    if(this.suggestionlist.nativeElement.querySelectorAll('li').length > 0){

      if(this.selectedIndex >= 0){
        // clear the previously selected class
        this.suggestionlist.nativeElement.querySelectorAll('li')[this.selectedIndex].classList.remove('selected')
      }

      this.selectedIndex = ((selectedIndex % suggestionsCount) + suggestionsCount) % suggestionsCount

      // set the selected class
      this.suggestionlist.nativeElement.querySelectorAll('li')[this.selectedIndex].classList.add('selected')

      // scroll into view
      this.suggestionlist.nativeElement.querySelectorAll('li')[this.selectedIndex].scrollIntoView(false)

    }
  }

  handleFocus = () => {
    console.log("inside handleFocus");
    if(this.suggestions.length > 0){
      this.showSuggestions()
    }else{
      this.getSuggestions()
    }
  }

  handleKeyDown = (event:any) => {
    this.searchterm = this.input.nativeElement.value;
    console.log("Key Down");
    console.log(event);
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
        event.preventDefault();
        this.handleArrows(selectedIndex);
        break;
      }
      case 'Tab': {
        this.handleTab(event)
        break
      }
      case 'Enter': {
        this.selectSuggestion( this.suggestionlist.nativeElement.querySelectorAll('li')[this.selectedIndex] )
        break;
      }
      case 'Esc':
      case 'Escape': {
        this.hideSuggestions()
        break;
      }
      default:
        return;
    }
  }

    getSuggestions = () =>{
      this.searchterm = this.searchterm.trim();
  
      // require a minimum of three characters
      if(this.searchterm.length < 3){
        this.hideSuggestions();
        return
      }
  
      let url = this.suggestionendpoint + '&country=' + 'GB' + '&query=' + this.searchterm;
  
      if(this.pathfilter){
        url += '&pathfilter=' + this.pathfilter
      }else{
        this.selectedoptiontext = this.searchterm
      }
  
      let index = this.cache.findIndex((c:any) => c.url === url);
  
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
              err.text().then( (errorMessage:string) => {
                console.log('Postcoder request error ' + err.status + ' : ' + errorMessage)
              })
            }else{
              console.log(err)
            }
  
        })
  
      }
    }
}
