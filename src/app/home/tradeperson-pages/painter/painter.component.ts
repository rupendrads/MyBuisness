import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-painter',
  templateUrl: './painter.component.html',
  styleUrls: ['./painter.component.css']
})
export class PainterComponent implements OnInit{
  
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('Painter : Top painter near me');
    this.meta.addTag({
      name: 'Painter',
      content : 'Top Builders Near Me. Quickly connect with the best builders companies in your area.'})
  } 

  ngOnInit() {    
  };
}
