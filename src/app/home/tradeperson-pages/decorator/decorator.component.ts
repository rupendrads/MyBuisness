import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.css']
})
export class DecoratorComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Decorator : Top decorator near me');
    this.meta.addTag({
      name: 'Decorator',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    
    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/decorator'
   })
      
   this.meta.addTag({
      property: 'og:description',
      content:'Need a Decorator? Find the best Decorator in minutes. We have found the top Cleaner near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })

   this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Decorator? Find the best Decorator in minutes. We have found the top Cleaner near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })
    
  } 


  ngOnInit() {    
  };
}
