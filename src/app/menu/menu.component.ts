import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

@Output() side = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onSide(){
    this.side = emit();
  }

}
