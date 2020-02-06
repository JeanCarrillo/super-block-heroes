import { Component, Input } from '@angular/core';
import { Board } from '../../../shared/models/board';
import { Block } from '../../../shared/models/block';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() board: Board;
  @Input() currentBlocks: Block[];
  @Input() facingMonster: boolean;

  constructor() {}

  public getBlock(y: number, x: number): any {
    const { board, currentBlocks } = this;
    if (board.tiles[y][x] !== 0) {
      return board.tiles[y][x];
    }
    for (const block of currentBlocks) {
      if (block.x === x && block.y === y) {
        return block.color;
      }
    }
    return false;
  }

  public getBoardBackgroundColor(): string {
    return this.facingMonster ? 'rgba(252, 99, 71, 0.2)' : 'rgba(255, 255, 255, 0.2)';
  }

  public getColBackground(x: number): string {
    for (const block of this.currentBlocks) {
      if (block.x === x) {
        return 'rgba(255, 255, 255, 0.2)';
      }
    }
    return 'rgba(255, 255, 255, 0)';
  }
}
