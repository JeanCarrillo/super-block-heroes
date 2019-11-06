import { Player } from './player';
import { Monster } from './monster';

import { KEYS } from '../../constants/keyboard';

export class Game {
  victory = false;
  defeat = false;
  monster: Monster;
  players: Player[];

  constructor(monster: any) {
    const playerNames = ['player1', 'player2', 'player3', 'player4'];
    this.players = [];
    for (let i = 0; i < playerNames.length; i += 1) {
      this.players.push(new Player(playerNames[i], i, this.handlePlayerAction));
    }
    this.monster = new Monster(monster, this.handleMonsterAction);
  }

  handleKeys(key): void {
    for (let i = 0; i < this.players.length; i++) {
      if (!this.players[i].gameOver && !this.victory) {
        if (key === KEYS[i].MOVE_RIGHT) {
          this.players[i].moveCurrentBlocks(1);
        }
        if (key === KEYS[i].MOVE_LEFT) {
          this.players[i].moveCurrentBlocks(-1);
        }
        if (key === KEYS[i].ROTATE_RIGHT) {
          this.players[i].rotateCurrentPiece(1);
        }
        if (key === KEYS[i].INSTANT_DROP) {
          if (!this.players[i].isFastForwarding) {
            this.players[i].dropCurrentBlocks();
          }
        }
      }
    }
  }

  // If a player scores, check monster position and handle damage if monster is within player range
  handlePlayerAction = (playerNum: number, score: number): void => {
    const playersPercentage = 100 / this.players.length; // 25
    const playerMinPercentage = playerNum * playersPercentage; // 0-25-50-75
    const playerMaxPercentage = (playerNum + 1) * playersPercentage; // 25-50-75-100
    if (this.monster.x > playerMinPercentage && this.monster.x < playerMaxPercentage) {
      this.monster.takeDamage(score);
    }
  };

  handleMonsterAction = (): void => {
    // TO DO: MONSTER ACTIONS
  };

  loop(): void {
    for (const player of this.players) {
      player.loop();
    }
    if (this.monster.currentLife > 0) {
      this.monster.move();
    } else {
      this.victory = true;
    }
  }
}
