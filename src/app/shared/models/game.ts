import { Player } from './player';
import { Monster } from './monster';
import { KEYS } from '../constants/keyboard';
import { Observable } from 'rxjs';
export class Game {
  victory = false;
  defeat = false;
  startTime = Date.now();
  monster: Monster;
  players: Player[] = [];
  playersPositions: any[] = [];
  playerFacingMonster = -1;
  myPlayerIndex: number;
  keyboardEvents: Set<any> = new Set<any>();
  private observer: any;
  gameStream$: Observable<any[]> = Observable.create(observer => {
    this.observer = observer;
  });
  constructor(monster: any, users: any, myPlayerIndex: number) {
    this.myPlayerIndex = myPlayerIndex;
    for (let i = 0; i < users.length; i += 1) {
      this.players.push(
        new Player(
          users[i],
          i,
          myPlayerIndex,
          this.handlePlayerAction,
          this.handlePlayerCapacity,
          this.addToGameStream
        )
      );
    }
    this.monster = new Monster(
      monster,
      this.handleMonsterAction,
      this.addToGameStream,
      myPlayerIndex
    );
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

    // DEV: TEST PLAYER ATTACK MOVE
    // setInterval(() => {
    //   this.handlePlayerAction(0, 10);
    // }, 2000);
  }
  addToGameStream = event => {
    this.observer.next(event);
  };
  handleKeys(key): void {
    // TODO: keep local multiplayer keys?
    // for (let i = 0; i < this.players.length; i++) {
    if (!this.players[this.myPlayerIndex].gameOver && !this.victory) {
      if (key === KEYS[0].MOVE_RIGHT) {
        this.players[this.myPlayerIndex].moveCurrentBlocks(1);
      }
      if (key === KEYS[0].MOVE_LEFT) {
        this.players[this.myPlayerIndex].moveCurrentBlocks(-1);
      }
      if (key === KEYS[0].ROTATE_RIGHT) {
        this.players[this.myPlayerIndex].rotateCurrentPiece(1);
      }
      if (key === KEYS[0].INSTANT_DROP) {
        if (!this.players[this.myPlayerIndex].isFastForwarding) {
          this.players[this.myPlayerIndex].dropCurrentBlocks();
        }
      }
      if (key === KEYS[0].CAPACITY) {
        this.addToGameStream({
          playerIndex: this.myPlayerIndex,
          eventType: 'useCapacity',
        });
        // this.players[this.myPlayerIndex].useCapacity();
      }
    }
    // }
  }
  // Player callback
  // If a player scores, check monster position and handle damage if monster is within player range
  handlePlayerAction = (playerIndex: number, score: number): void => {
    if (this.players[playerIndex].currentBonus.goldRush.active) {
      score *= 2;
    }
    this.players[playerIndex].score += score;
    if (
      (this.monster.x > this.playersPositions[playerIndex].min &&
        this.monster.x < this.playersPositions[playerIndex].max) ||
      // Special case if player has shuriken fury buff: attack from anywhere
      this.players[playerIndex].currentBonus.shurikenFury.active
    ) {
      this.players[playerIndex].hero.changeStatus('Attack');
      this.monster.handleDamage(score);
    }
  };
  handlePlayerCapacity = (playerIndex: number, capacity: string): void => {
    this.players[playerIndex].hero.changeStatus('Throw');
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
  handleMonsterAction = (act?: boolean) => {
    // Monster action
    if (act) {
      for (let i = 0; i < this.players.length; i++) {
        if (
          this.monster.x > this.playersPositions[i].min &&
          this.monster.x < this.playersPositions[i].max
        ) {
          // Triggers player animation
          this.players[i].hero.changeStatus('GetHit');
          // monster.id = 1-2-3-4
          // Backend needs a new strength value if we need new monsters
          this.players[i].addRows(this.monster.id);
          // Speeds up player
          // this.players[i].loopDelay -= 50;
        }
      }
    } else {
      // Monster is getting info about player facing him: if dead returns false;
      if (this.players[this.playerFacingMonster].gameOver) {
        return false;
      }
      return true;
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
      } else {
      }
    }
    return -1;
  }
  loop(): void {
    let defeat = true;
    this.playerFacingMonster = this.whichPlayerHasMonster();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.players.length; i++) {
      if (this.playerFacingMonster === i) {
        this.players[i].facingMonster = true;
      } else {
        this.players[i].facingMonster = false;
      }
      this.players[i].loop();
      if (!this.players[i].gameOver) {
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
