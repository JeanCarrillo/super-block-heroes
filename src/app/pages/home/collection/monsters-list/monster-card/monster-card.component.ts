import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'],
})
export class MonsterCardComponent implements OnInit, OnDestroy {
  @Input() selected: boolean;
  @Input() monster: any;
  sprite: number;
  interval: number;
  status = 'Idle';

  constructor() {}

  ngOnInit(): void {
    console.log(this.monster);
    this.sprite = 0;
    this.interval = window.setInterval(() => {
      if (this.sprite < this.monster.sprites[this.status]) {
        this.sprite += 1;
      } else {
        if (this.status === 'Attack') {
          this.status = 'Idle';
        }
        this.sprite = 0;
      }
    }, 50);
  }

  getBackgroundImg(): string {
    // tslint:disable-next-line: max-line-length
    return `url(assets/img/monsters/${this.monster.name.replace(' ', '_')}/${
      this.status
    }/skeleton-${this.status}_${this.sprite}.png)`;
  }

  getScale() {
    return `scale(${this.selected ? '2' : '1'})`;
  }

  changeStatus() {
    this.status = 'Attack';
    this.sprite = 0;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
