import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() name: string;
  @Input() score: number;
  @Input() gameOver: boolean;

  constructor() {}

  ngOnInit() {}
}
