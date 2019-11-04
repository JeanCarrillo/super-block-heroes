import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

import { Game } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  interval: any;
  backgrounds: number[];
  game: Game;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.game.handleKeys(event.key);
  }

  constructor() {
    this.game = new Game();
    this.backgrounds = new Array(4).fill(1);
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), 20);
  }

  private gameLoop(): void {
    this.game.loop();
    if (this.game.victory) {
      clearInterval(this.interval);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
