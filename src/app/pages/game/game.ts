import { Player } from './player';
import { Monster } from './monster';

import { KEYS } from '../../constants/keyboard';

export class Game {
  victory = false;
  defeat = false;
  startTime = Date.now();
  monster: Monster;
  players: Player[] = [];
  playersPositions: any[] = [];

  constructor(monster: any, users: any) {
    for (let i = 0; i < users.length; i += 1) {
      this.players.push(new Player(users[i], i, this.handlePlayerAction));
    }
    this.monster = new Monster(monster, this.handleMonsterAction);

    // Calculate players positions
    // Example: player 1 owns 0% to 25% of the board, player 2 25-50% etc.
    // Saved in this.positions;
    const playersPercentage = 100 / this.players.length; // 25
    for (let i = 0; i < this.players.length; i++) {
      const playerMinPercentage = i * playersPercentage; // 0-25-50-75
      const playerMaxPercentage = (i + 1) * playersPercentage; // 25-50-75-100
      this.playersPositions.push({ min: playerMinPercentage, max: playerMaxPercentage });
    }
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
  handlePlayerAction = (playerIndex: number, score: number): void => {
    if (
      this.monster.x > this.playersPositions[playerIndex].min &&
      this.monster.x < this.playersPositions[playerIndex].max
    ) {
      this.monster.takeDamage(score);
    }
  };

  handleMonsterAction = (): void => {
    for (let i = 0; i < this.players.length; i++) {
      if (
        this.monster.x > this.playersPositions[i].min &&
        this.monster.x < this.playersPositions[i].max
      ) {
        this.players[i].loopDelay -= 50;
      }
    }
  };

  whichPlayerHasMonster() {
    for (let i = 0; i < this.players.length; i++) {
      if (
        this.monster.x > this.playersPositions[i].min &&
        this.monster.x < this.playersPositions[i].max
      ) {
        return i;
      }
    }
  }

  loop(): void {
    let defeat = true;
    for (const player of this.players) {
      player.loop();
      if (!player.gameOver) {
        defeat = false;
      }
    }
    if (defeat) {
      this.defeat = true;
    }
    if (this.monster.currentLife > 0) {
      this.monster.move();
    } else {
      this.victory = true;
    }
  }
}
