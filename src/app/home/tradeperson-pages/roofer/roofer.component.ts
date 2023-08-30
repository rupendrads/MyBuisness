import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-roofer',
  templateUrl: './roofer.component.html',
  styleUrls: ['./roofer.component.css']
})
export class RooferComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Roofer : Top roofer near me');
    this.meta.addTag({
      name: 'Roofer',
      content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
    })
    

    this.meta.addTag({
      property: 'og:url',
      content:'https://topbuildernearme.co.uk/roofer'
   })
      
   this.meta.addTag({
      property: 'og:description',
      content:'Need a Roofer? Find the best Roofer in minutes. We have found the top Roofer near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })

   this.meta.addTag({
    property: 'twitter:description',
    content:'Need a Roofer? Find the best Roofer in minutes. We have found the top Roofer near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
   })
    
    
  } 

  ngOnInit() {    
  };
}
