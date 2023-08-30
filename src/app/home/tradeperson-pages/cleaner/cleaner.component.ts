import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cleaner',
  templateUrl: './cleaner.component.html',
  styleUrls: ['./cleaner.component.css']
})
export class CleanerComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Cleaner : Top cleaner near me');
    this.meta.addTag({
      name: 'Cleaner',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    
    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/cleaner'
   })
      
   this.meta.addTag({
      property: 'og:description',
      content:'Need a Cleaner? Find the best Cleaner in minutes. We have found the top Cleaner near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })

   this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Cleaner? Find the best Cleaner in minutes. We have found the top Cleaner near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })
    
  } 

  ngOnInit() {    
  };
}
