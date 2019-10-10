import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Player } from './player';
import { Monster } from './monster';
import { KEYS } from '../../constants/keyboard';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  players: Player[];
  interval: any;
  monster: Monster;
  backgrounds: number[];
  victory = false;
  defeat = false;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.players.length; i++) {
      if (!this.players[i].gameOver) {
        if (event.key === KEYS[i].MOVE_RIGHT) {
          this.players[i].moveCurrentBlocks(1);
        }
        if (event.key === KEYS[i].MOVE_LEFT) {
          this.players[i].moveCurrentBlocks(-1);
        }
        if (event.key === KEYS[i].ROTATE_RIGHT) {
          this.players[i].rotateCurrentPiece(1);
        }
        if (event.key === KEYS[i].INSTANT_DROP) {
          if (!this.players[i].isFastForwarding) {
            this.players[i].dropCurrentBlocks();
          }
        }
      }
    }
  }

  constructor() {
    const playerNames = ['player1', 'player2', 'player3', 'player4'];
    this.players = [];
    for (const name of playerNames) {
      this.players.push(new Player(name));
    }
    this.monster = new Monster('giphy');
    this.backgrounds = new Array(4).fill(1);
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), 20);
  }

  private gameLoop(): void {
    for (const player of this.players) {
      player.loop();
    }
    if (this.monster.currentLife > 0) {
      this.monster.move();
    } else {
      this.victory = true;
      clearInterval(this.interval);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
