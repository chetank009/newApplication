import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  @Output() side = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  side1 (){
   this.side = new EventEmitter();
  }

}
