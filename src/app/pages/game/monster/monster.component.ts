import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  @Input() monster: string;

  constructor() {}

  ngOnInit() {}
}
