import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../../../models/board';
import { Block } from '../../../models/block';
import { Piece } from '../../../models/piece';

// Keyboard buttons
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board;
  currentBlocks: Block[];
  interval: any;
  fallingSpeed: number;

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
  }

  constructor() {
    this.fallingSpeed = 200;
    const rowNumbers = 10;
    const colNumbers = 20;
    this.board = new Board(rowNumbers, colNumbers);
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
    const newPiece = new Piece();
    for (let i = 0; i < newPiece.shape.length; i++) {
      for (let j = 0; j < newPiece.shape[i].length; j++) {
        const color = newPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(new Block(color, 5 + i, 0 + j));
        }
      }
    }
  }

  private letCurrentBlocksFall(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      this.currentBlocks[i].y += 1;
    }
  }

  private handleCollision(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      this.board.tiles[block.y][block.x] = block.color;
    }
    this.currentBlocks = [];
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
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
