import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  forgotPW = () => {
    window.alert('This feature will be enable soon!');
  } 
  
  ngOnInit() {
  }

}
