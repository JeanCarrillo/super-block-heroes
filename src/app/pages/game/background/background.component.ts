import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  @Input() monster: Monster;
  @Input() index: number;
  @Input() type: number;
  constructor() {}

  ngOnInit() {
    console.log(this.type);
  }

  getBackgroundPos(index: number) {
    return this.monster.x / ((index + 1) / 2) + '%';
  }
}
