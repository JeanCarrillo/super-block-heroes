import { Component, HostListener, OnInit, OnDestroy, Input } from '@angular/core';
import { Board } from '../../../models/board';
import { Block } from '../../../models/block';
import { Piece } from '../../../models/piece';

// Keyboard buttons
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  SPACEBAR = 32
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  score: number;
  board: Board;
  rowNumbers = 10;
  colNumbers = 20;
  currentBlocks: Block[];
  currentPiece: Piece;
  // currentShape: any;
  interval: any;
  fallingSpeed: number;
  @Input() player: string; 

  // Listens to keyboard events
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveCurrentBlocks(1);
    }
    // tslint:disable-next-line: deprecation
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveCurrentBlocks(-1);
    }
    // tslint:disable-next-line: deprecation
    if (event.keyCode === KEY_CODE.SPACEBAR) {
      this.rotateCurrentPiece(1);
    }
  }

  constructor() {
    this.fallingSpeed = 200;
    this.score = 0;
    this.board = new Board(this.rowNumbers, this.colNumbers);
    this.currentBlocks = [];
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), this.fallingSpeed);
  }

  private gameLoop(): void {
    // Loop through current active blocks
    // => each block falls (y + 1) if it doesn't collide
    let didCollide = false;
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
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
    this.createPiece();
  }

  private createPiece() {
    if (this.currentBlocks.length > 0) {
      return;
    }
    this.currentPiece = new Piece(5, 0);
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(new Block(color, 5 + i, 0 + j));
        }
      }
    }
  }

  // direction: number of indexes to rotate
  // => direction 1 : rotate right, direction -1 : rotate left
  private rotateCurrentPiece(direction: number) {
    this.currentPiece.rotate(direction);
    // TO DO : CHECK COLLISIONS BEFORE ROTATING
    let rotationCollide = false;
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (
          color !== 0 &&
          this.board.tiles[this.currentPiece.y + j][this.currentPiece.x + i] !==
            0
        ) {
          rotationCollide = true;
        }
      }
    }
    if (rotationCollide) {
      this.currentPiece.rotate(-direction);
      return;
    }
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
  }

  private letCurrentBlocksFall(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      this.currentBlocks[i].y += 1;
    }
    console.log(this.currentPiece);
    if (this.currentPiece) {
      this.currentPiece.y += 1;
    }
  }

  private handleCollision(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      // Current block is now part of the board matrix
      this.board.tiles[block.y][block.x] = block.color;
    }
    this.currentBlocks = [];
    this.checkCompletedLines();
  }

  private checkCompletedLines() {
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
    this.deleteRows(rowsToDelete);
  }

  private deleteRows(rowsToDelete: number[]) {
    // TO DO : REFACTOR TO GET NEW LINE FROM board.ts
    const emptyRow = new Array(this.rowNumbers).fill(0);
    for (let i = 0; i < rowsToDelete.length; i++) {
      this.board.tiles.splice(rowsToDelete[i], 1);
      this.board.tiles.splice(0, 0, emptyRow);
    }
    this.score += rowsToDelete.length * 10;
  }

  // Returns true if something is colliding
  private isColliding(x: number, y: number, dirY: number) {
    if (y + dirY < 0 || y + dirY >= this.board.tiles.length) {
      return true;
    }
    if (this.board.tiles[y + dirY][x] !== 0) {
      return true;
    }
    return false;
  }

  private canMove(x: number, y: number, dirX: number) {
    if (x + dirX < 0 || x + dirX >= this.board.tiles[0].length) {
      return false;
    }
    if (this.board.tiles[y][x + dirX] !== 0) {
      return false;
    }
    return true;
  }

  // Method used in render : returns color (img) to display
  public getBlock(y: number, x: number) {
    if (this.board.tiles[y][x] !== 0) {
      return this.board.tiles[y][x];
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentBlocks.length; i++) {
      if (this.currentBlocks[i].x === x && this.currentBlocks[i].y === y) {
        return this.currentBlocks[i].color;
      }
    }
    return false;
  }

  // Linked to Keyboard events : actions
  private moveCurrentBlocks(x: number) {
    let canMove = true;
    for (const block of this.currentBlocks) {
      if (!this.canMove(block.x, block.y, x)) {
        canMove = false;
      }
    }
    if (canMove) {
      for (const block of this.currentBlocks) {
        block.x += x;
      }
      if (this.currentPiece) {
        this.currentPiece.x += x;
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
