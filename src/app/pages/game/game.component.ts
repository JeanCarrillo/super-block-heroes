import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../../db.service';

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

  constructor(private dbService: DbService) {}

  async ngOnInit() {
    let monsters;
    await this.dbService.getMonsters().subscribe(res => (monsters = res));
    const rdmMonster = monsters[Math.floor(Math.random() * monsters.length)];
    this.game = new Game(rdmMonster);
    this.backgrounds = new Array(4).fill(1);
    this.interval = setInterval(() => this.gameLoop(), 20);
  }

  private gameLoop(): void {
    this.game.loop();
    if (this.game.victory && this.game.defeat) {
      clearInterval(this.interval);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
