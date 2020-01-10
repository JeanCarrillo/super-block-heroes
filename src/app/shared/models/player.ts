// tslint:disable: prefer-for-of
import { Board } from './board';
import { Block } from './block';
import { Piece } from './piece';
import { Hero } from './hero';
export class Player {
  isFastForwarding = false;
  gameOver = false;
  rowNumbers = 10;
  colNumbers = 20;
  name: string;
  score: number;
  status: string;
  board: Board;
  currentBlocks: Block[];
  currentPiece: Piece;
  loopTime: number;
  loopDelay: number;
  playerNum: number;
  handlePlayerAction: any;
  handlePlayerCapacity: any;
  addToGameStream: any;
  capacity: string;
  capacityCooldown: number;
  capacityTime: number;
  // Used to display capacity cooldown icon
  capacityCooldownPercentage: number;
  currentBonus: any = {
    shurikenFury: {
      active: false,
      startTime: Date.now(),
      duration: 10000,
    },
    goldRush: {
      active: false,
      startTime: Date.now(),
      duration: 10000,
    },
  };
  nextPiece: string = null;
  hero: Hero;
  facingMonster = false;
  myPlayerIndex: number;
  test = true;
  isMyPlayer: boolean;
  constructor(
    user: any,
    playerNum: number,
    myPlayerIndex: number,
    handlePlayerAction: any,
    handlePlayerCapacity: any,
    addToGameStream: any
  ) {
    this.isMyPlayer = myPlayerIndex === playerNum;
    this.handlePlayerAction = handlePlayerAction;
    this.handlePlayerCapacity = handlePlayerCapacity;
    this.addToGameStream = addToGameStream;
    this.myPlayerIndex = myPlayerIndex;
    this.capacity = user.hero.capacity.name;
    this.capacityCooldown = user.hero.capacity.cooldown;
    this.capacityTime = Date.now();
    this.playerNum = playerNum;
    this.loopTime = Date.now();
    this.loopDelay = 300;
    this.name = user.nickname;
    this.score = 0;
    this.board = new Board(this.rowNumbers, this.colNumbers);
    this.hero = new Hero(user.hero, this.setGameOver);
    this.currentBlocks = [];
  }
  public loop(): void {
    this.hero.facingMonster = this.facingMonster;
    this.hero.move();
    if (this.isFastForwarding) {
      return;
    }
    const now = Date.now();
    this.capacityCooldownPercentage = ((now - this.capacityTime) * 100) / this.capacityCooldown;
    const bonuses = Object.keys(this.currentBonus);
    for (const bonus of bonuses) {
      if (now - this.currentBonus[bonus].startTime > this.currentBonus[bonus].duration) {
        this.currentBonus[bonus].active = false;
      }
    }
    if (this.isMyPlayer && now - this.loopTime > this.loopDelay && !this.gameOver) {
      this.loopTime = Date.now();
      if (!this.currentPiece) {
        this.createPiece();
      }
      let didCollide = false;
      for (const block of this.currentBlocks) {
        if (this.isColliding(block.x, block.y, 1)) {
          didCollide = true;
          break;
        }
      }
      if (didCollide) {
        this.handleCollision();
      } else {
        this.letCurrentBlocksFall();
      }
    }
  }
  // If there is no currentBlocks, creates a new piece
  // => calls Piece constructor to get the shape and color
  // => then recreates it with individual blocks (added to currentBlocks)
  // Piece and currentBlocks are two different entities sharing the same coordinates and updated at the same times
  private createPiece(): void {
    if (this.nextPiece) {
      this.currentPiece = new Piece(5, 0, this.nextPiece);
      this.nextPiece = null;
    } else {
      this.currentPiece = new Piece(5, 0);
    }
    this.currentBlocks = [];
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(new Block(color, 5 + i, 0 + j));
        }
      }
    }
    this.sendEvent('currentBlocks', this.currentBlocks);
  }
  // direction: number of indexes to rotate
  // => direction 1 : rotate right, direction -1 : rotate left
  public rotateCurrentPiece(direction: number): void {
    if (!this.currentPiece) {
      return;
    }
    this.currentPiece.rotate(direction);
    // Check collisions after rotating piece
    let rotationCollide = false;
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (
          color !== 0 &&
          this.board.tiles[this.currentPiece.y + j][this.currentPiece.x + i] !== 0
        ) {
          rotationCollide = true;
        }
      }
    }
    // If piece collides after rotating, rotate back and return
    // TO DO : handle different scenarios ?
    if (rotationCollide) {
      this.currentPiece.rotate(-direction);
      return;
    }
    // If no collision: clear currentBlocks and replace by new blocks (rotated piece)
    this.currentBlocks = [];
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(
            new Block(color, this.currentPiece.x + i, this.currentPiece.y + j)
          );
        }
      }
    }
    this.sendEvent('currentBlocks', this.currentBlocks);
  }
  // Y + 1 to all currentBlocks and currentPiece (fall by 1)
  private letCurrentBlocksFall(): void {
    if (!this.currentPiece) {
      return;
    }
    for (const block of this.currentBlocks) {
      block.y += 1;
    }
    this.currentPiece.y += 1;
    this.sendEvent('currentBlocks', this.currentBlocks);
  }
  // When current blocks collide with matrix or existing blocks
  // => add them to the board.tiles matrix permanently
  // => game over check
  // => reset current blocks
  private handleCollision(): void {
    let gameOver = false;
    for (const block of this.currentBlocks) {
      // If there is already a block where current block is, then it is likely we are on top of the board
      // additional check : block index is < 3 (just in case false positive bottom/middle of the board)
      // => game over
      if (this.board.tiles[block.y][block.x] !== 0 && block.y < 3) {
        gameOver = true;
      }
      // Current block is now part of the board matrix
      this.board.tiles[block.y][block.x] = block.color;
    }
    this.currentBlocks = [];
    this.currentPiece = null;
    if (gameOver) {
      this.handleGameOver();
    } else {
      this.checkCompletedLines();
    }
  }
  // Checks board.tiles matrix for full lines
  // => add all indexes to an array
  // => call deleteRows method to clear them
  private checkCompletedLines(): void {
    const rowsToDelete = [];
    for (let i = 0; i < this.board.tiles.length; i++) {
      let completed = true;
      for (let j = 0; j < this.board.tiles[i].length; j++) {
        if (this.board.tiles[i][j] === 0) {
          completed = false;
          break;
        }
      }
      if (completed) {
        rowsToDelete.push(i);
      }
    }
    if (rowsToDelete.length > 0) {
      this.deleteRows(rowsToDelete);
      this.handleScore(rowsToDelete.length);
    }
    this.sendEvent('board', this.board.tiles);
  }
  // delete all lines in the rowsToDelete array from the board.tiles matrix
  // => replace them by empty lines (filled by 0) at the 0 index of the matrix (top)
  public deleteRows(rowsToDelete: number[]): void {
    const emptyRow = new Array(this.rowNumbers).fill(0);
    for (let i = 0; i < rowsToDelete.length; i++) {
      this.board.tiles.splice(rowsToDelete[i], 1);
      this.board.tiles.splice(0, 0, emptyRow);
    }
  }
  // Score calculation
  // TODO: something more complex ;-)
  private handleScore(nbOfRows: number): void {
    let score;
    switch (nbOfRows) {
      case 1:
        score = 10;
        break;
      case 2:
        score = 24;
        break;
      case 3:
        score = 39;
        break;
      case 4:
        score = 56;
        break;
    }
    this.sendEvent('score', score);
    this.handlePlayerAction(this.playerNum, score);
  }
  private handleGameOver(): void {
    if (this.hero.status === 'Death') {
      return;
    }
    this.hero.changeStatus('Death');
    this.currentBlocks = [];
    this.currentPiece = null;
  }
  public setGameOver = (): void => {
    this.gameOver = true;
    this.sendEvent('gameOver', null);
  };
  // Returns true if something is colliding
  // Y axis only
  private isColliding(x: number, y: number, dirY: number): boolean {
    if (y + dirY < 0 || y + dirY >= this.board.tiles.length) {
      return true;
    }
    if (this.board.tiles[y + dirY][x] !== 0) {
      return true;
    }
    return false;
  }
  public useCapacity(): void {
    const now = Date.now();
    if (now - this.capacityTime > this.capacityCooldown) {
      this.capacityTime = Date.now();
      if (this.capacity === 'Shuriken Fury') {
        this.currentBonus.shurikenFury.active = true;
        this.currentBonus.shurikenFury.startTime = Date.now();
      } else {
        this.handlePlayerCapacity(this.playerNum, this.capacity);
      }
    }
  }
  // Used for Holy Block capacity, changes to I piece
  public changeBlock(): void {
    this.currentBlocks = [];
    this.currentPiece = null;
    this.nextPiece = 'I';
  }
  // Linked to Keyboard events : actions
  // Moves current blocks left/right, X axis only, no Y axis checks
  public moveCurrentBlocks(x: number): void {
    let canMove = true;
    for (const block of this.currentBlocks) {
      if (!this.canMove(block.x, block.y, x)) {
        canMove = false;
        break;
      }
    }
    if (canMove) {
      for (const block of this.currentBlocks) {
        block.x += x;
      }
      this.sendEvent('currentBlocks', this.currentBlocks);
      if (this.currentPiece) {
        this.currentPiece.x += x;
      }
    }
  }
  // Method used when moving current blocks (key pressed)
  // checks left and right, returns false if illegal move (out of matrix or existing block)
  // X axis only
  private canMove(x: number, y: number, dirX: number): boolean {
    if (x + dirX < 0 || x + dirX >= this.board.tiles[0].length) {
      return false;
    }
    if (this.board.tiles[y][x + dirX] !== 0) {
      return false;
    }
    return true;
  }
  // When key is pressed
  // => current blocks fall until collision (fast forward)
  // TO DO: DEBUG
  // Sometimes it starts to create blocks on the board :-/
  public dropCurrentBlocks(): void {
    if (!this.isFastForwarding) {
      this.isFastForwarding = true;
      let didCollide = false;
      while (!didCollide) {
        if (this.currentBlocks.length === 0) {
          break;
        }
        for (const block of this.currentBlocks) {
          if (this.isColliding(block.x, block.y, 1)) {
            didCollide = true;
            break;
          }
        }
        if (!didCollide) {
          this.letCurrentBlocksFall();
        }
      }
      this.handleCollision();
      this.isFastForwarding = false;
    }
  }
  private sendEvent(eventType: string, data?: any) {
    this.addToGameStream({
      playerIndex: this.myPlayerIndex,
      eventType,
      data,
    });
  }
}
