import { Component } from '@angular/core';
import {Meta ,Title} from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Top builder near me');
    this.meta.addTag({
      name: 'Top builder near me',
      content : 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'})
  }     
}
