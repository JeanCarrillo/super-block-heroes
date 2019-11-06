import { Component, OnInit, Input } from '@angular/core';
import { type } from 'os';
import { logging } from 'protractor'; 

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  url: string;

  @Input() buttonType: string;

  constructor() {}

  ngOnInit() {}

  /*
   * this method choose a button depends on its type
   */
  private whichButton() {
    switch(this.buttonType) {
      case 'play': { 
        return "url(../../../assets/img/playButton.png)";
      } 
      case 'login': { 
         return "url(../../../assets/img/loginButton.png)"; 
      } 
      default: { 
         return "url(../../../assets/img/menuButton.png)";
      }
    }
  }
}