import { Player } from './player';
import { Monster } from './monster';

import { KEYS } from '../constants/keyboard';

export class Game {
  victory = false;
  defeat = false;
  startTime = Date.now();
  monster: Monster;
  players: Player[] = [];
  playersPositions: any[] = [];
  playerFacingMonster = -1;

  constructor(monster: any, users: any) {
    for (let i = 0; i < users.length; i += 1) {
      this.players.push(
        new Player(users[i], i, this.handlePlayerAction, this.handlePlayerCapacity)
      );
    }
    this.monster = new Monster(monster, this.handleMonsterAction);

    // Calculate players positions
    // Example: player 1 owns 0% to 25% of the board, player 2 25-50% etc.
    // Saved in this.positions;
    const playersPercentage = 100 / this.players.length; // 25
    for (let i = 0; i < this.players.length; i++) {
      const playerMinPercentage = i * playersPercentage; // 0-25-50-75
      const playerMaxPercentage = (i + 1) * playersPercentage; // 25-50-75-100
      this.playersPositions.push({
        min: playerMinPercentage,
        max: playerMaxPercentage,
      });
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
        if (key === KEYS[i].CAPACITY) {
          this.players[i].useCapacity();
        }
      }
    }
  }

  // Player callback
  // If a player scores, check monster position and handle damage if monster is within player range
  handlePlayerAction = (playerIndex: number, score: number): void => {
    let goldGained = score;
    if (this.players[playerIndex].currentBonus.goldRush.active) {
      goldGained *= 2;
      // TO DO : RETHINK HOW GOLD IS GAINED
    }
    if (
      (this.monster.x > this.playersPositions[playerIndex].min &&
        this.monster.x < this.playersPositions[playerIndex].max) ||
      // Special case if player has shuriken fury buff: attack from anywhere
      this.players[playerIndex].currentBonus.shurikenFury.active
    ) {
      this.monster.handleDamage(score);
    }
  };

  handlePlayerCapacity = (playerIndex: number, capacity: string): void => {
    switch (capacity) {
      case 'Frost Blast': {
        this.monster.handleCapacity(capacity);
        break;
      }
      case 'Taunt': {
        // isHeadingTo = middle of player board
        const isHeadingTo =
          this.playersPositions[playerIndex].min +
          (this.playersPositions[playerIndex].max - this.playersPositions[playerIndex].min) / 2;
        this.monster.handleCapacity(capacity, { isHeadingTo });
        break;
      }
      case 'Gold Rush': {
        for (const player of this.players) {
          player.currentBonus.goldRush.active = true;
          player.currentBonus.goldRush.startTime = Date.now();
        }
        break;
      }
      case 'Holy Blocks': {
        this.players[this.playerFacingMonster].changeBlock();
        break;
      }
      case "King's Blocks": {
        this.players[this.playerFacingMonster].capacityTime =
          Date.now() + this.players[this.playerFacingMonster].capacityCooldown;
        break;
      }
      case "Monk's Blessing": {
        let mostInDangerPlayer = -1;
        let lowerBlock = 99999;
        for (let i = 0; i < this.players.length; i++) {
          for (let j = 0; j < this.players[i].board.tiles.length; j++) {
            // tslint:disable-next-line: prefer-for-of
            for (let k = 0; k < this.players[i].board.tiles[j].length; k++) {
              if (this.players[i].board.tiles[j][k] !== 0 && j < lowerBlock) {
                lowerBlock = j;
                mostInDangerPlayer = i;
              }
            }
          }
        }
        this.players[mostInDangerPlayer].deleteRows([19, 18]);
        break;
      }
      default:
        break;
    }
  };

  // Monster callback
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

  // Returns index of player facing monster
  whichPlayerHasMonster(): number {
    for (let i = 0; i < this.players.length; i++) {
      if (
        this.monster.x > this.playersPositions[i].min &&
        this.monster.x < this.playersPositions[i].max
      ) {
        return i;
      }
    }
    return -1;
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
    this.playerFacingMonster = this.whichPlayerHasMonster();
  }
}
