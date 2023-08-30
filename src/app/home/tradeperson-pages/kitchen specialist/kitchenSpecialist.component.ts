import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-kitchen-specialist',
  templateUrl: './kitchenSpecialist.component.html',
  styleUrls: ['./kitchenSpecialist.component.css']
})
export class KitchenSpecialistComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('KitchenSpecialist : Top kitchenspecialist near me');
    this.meta.addTag({
      name: 'KitchenSpecialist',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    

    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/kitchenspecialist'
   })
      
   this.meta.addTag({
      property: 'og:description',
      content:'Need a Kitchenspecialist? Find the best Kitchenspecialist in minutes. We have found the top Kitchenspecialist near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })

   this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Kitchenspecialist? Find the best Kitchenspecialist in minutes. We have found the top Kitchenspecialist near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })
    
  } 

  ngOnInit() {    
  };
}
