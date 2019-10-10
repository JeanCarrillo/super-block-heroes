import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Player } from './player';
import { Monster } from './monster';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  players: Player[];
  interval: any;
  monster: Monster;
  backgroundX: string;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.players[0].moveCurrentBlocks(1);
    }
    if (event.key === 'ArrowLeft') {
      this.players[0].moveCurrentBlocks(-1);
    }
    if (event.key === ' ') {
      this.players[0].rotateCurrentPiece(1);
    }
    if (event.key === 'ArrowUp') {
      this.players[0].dropCurrentBlocks();
    }
  }

  constructor() {
    const playerNames = ['player1', 'player2', 'player3', 'player4'];
    this.players = [];
    for (const name of playerNames) {
      this.players.push(new Player(name));
    }
    this.monster = new Monster('giphy');
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), 200);
  }

  private gameLoop(): void {
    for (const player of this.players) {
      if (!player.gameOver) {
        player.loop();
      }
    }
    this.monster.move();
  }

  getBackgroundX(index: number) {
    return this.monster.x / ((index + 1) / 2) + '%';
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
