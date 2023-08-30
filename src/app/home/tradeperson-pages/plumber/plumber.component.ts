import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-plumber',
  templateUrl: './plumber.component.html',
  styleUrls: ['./plumber.component.css']
})
export class PlumberComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Plumber : Top plumber near me');
    this.meta.addTag({
      name: 'Plumber',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    

    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/plumber'
    })
      
    this.meta.addTag({
      property: 'og:description',
      content:'Need a Plumber? Find the best Plumber in minutes. We have found the top Plumber near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
    })

    this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Plumber? Find the best Plumber in minutes. We have found the top Plumber near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
    })
    
    
  } 
  ngOnInit() {    
  };
}
