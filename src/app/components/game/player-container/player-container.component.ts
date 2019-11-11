import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../shared/models/player';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.css'],
})
export class PlayerContainerComponent implements OnInit {
  @Input() player: Player;
  @Input() facingMonster: boolean;
  constructor() {}

  ngOnInit() {}
}
