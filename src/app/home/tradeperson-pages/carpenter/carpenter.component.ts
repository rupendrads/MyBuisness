import { Component, OnInit } from '@angular/core';
import {Meta ,Title} from '@angular/platform-browser'
@Component({
  selector: 'app-carpenter',
  templateUrl: './carpenter.component.html',
  styleUrls: ['./carpenter.component.css']
})
export class CarpenterComponent implements OnInit{
  selectedTrade = 'Builder';
  selectedJob = 'Just Me';

  ngOnInit() {};

  constructor(private meta: Meta, private titleService: Title) {
      this.titleService.setTitle('Carpenter : Top carpenter near me');
      this.meta.addTag({
        name: 'Carpenter',
        content: 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'
       })
    
       this.meta.addTag({
          property: 'og:url',
          content:'https://topbuildernearme.co.uk/carpenter'
       })
          
       this.meta.addTag({
          property: 'og:description',
          content:'Need a Carpenter? Find the best Carpenter in minutes. We have found the top Carpenters near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
       })
    
       this.meta.addTag({
        property: 'twitter:description',
        content:'Need a Carpenter? Find the best Carpenter in minutes. We have found the top Carpenters near you. Search in seconds, read reviews &amp; get free quotes. Post your request today!'
     })
  }   
}
