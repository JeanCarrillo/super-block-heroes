import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SocketService } from 'src/app/shared/services/socket.service';

import { Game } from '../../shared/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  interval: any;
  game: Game;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.game.handleKeys(event.key);
  }

  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.game = new Game(
      this.socketService.room.monster,
      this.socketService.room.players,
      this.socketService.myPlayerIndex
    );
    this.socketService.getGameEvent().subscribe(event => {
      this.handleGameEvent(event);
    });
    this.game.gameStream$.subscribe((event: any) => {
      this.socketService.sendEvent('gameEvent', event);
    });
    this.interval = setInterval(() => this.gameLoop(), 20);
  }

  handleGameEvent(event: any) {
    console.log({ event });
    switch (event.eventType) {
      case 'board': {
        console.log(this.game);
        this.game.players[event.playerIndex].board.tiles = event.data;
        break;
      }
      case 'gameOver': {
        this.game.players[event.playerIndex].gameOver = true;
        break;
      }
      case 'currentBlocks': {
        this.game.players[event.playerIndex].currentBlocks = event.data;
        break;
      }
      case 'useCapacity': {
        this.game.players[event.playerIndex].useCapacity();
        break;
      }
      case 'score': {
        this.game.players[event.playerIndex].score = event.data;
        break;
      }
      case 'monsterLife': {
        this.game.monster.currentLife = event.data;
        break;
      }
    }
  }

  private gameLoop(): void {
    this.game.loop();
    if (this.game.victory || this.game.defeat) {
      clearInterval(this.interval);
      this.authService.postGame(this.game);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
