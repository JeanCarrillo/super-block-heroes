import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../shared/models/player';
import { Monster } from 'src/app/shared/models/monster';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.css'],
})
export class PlayerContainerComponent implements OnInit {
  @Input() player: Player;
  @Input() monster: Monster;
  constructor() {}

  ngOnInit() {}
}
