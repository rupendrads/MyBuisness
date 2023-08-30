import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-electrician',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnInit{
  ngOnInit() {};

  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Electrician : Top electrician near me');
    this.meta.addTag({
      name: 'Electrician',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    
    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/electrician'
   })
      
   this.meta.addTag({
      property: 'og:description',
      content:'Need a Electrician? Find the best Electrician in minutes. We have found the top Electrician near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })

   this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Electrician? Find the best Electrician in minutes. We have found the top Electrician near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })
    
  } 

}
