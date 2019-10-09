import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../../models/board';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() currentBlocks: Block[];

  constructor() {}

  ngOnInit() {}

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
}
