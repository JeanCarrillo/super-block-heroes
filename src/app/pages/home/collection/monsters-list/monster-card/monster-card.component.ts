import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { rdmFloor } from '../../../../../shared/helpers/functions';

// tslint:disable: max-line-length
// Database monster sprites format
// SNAIL
// '{"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":59},"GetHit":{"start":60,"end":79},"Death":{"start":80,"end":109},"total":109,"paddingBottom":100}'
// BIGBOB
// {"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":119},"GetHit":{"start":120,"end":139},"Death":{"start":140,"end":199},"total":199,"paddingBottom":68.87}
// SORCEROR
// {"Walk":{"start":0,"end":39},"Idle":{"start":40,"end":59},"Attack":{"start":60,"end":109},"GetHit":{"start":110,"end":129},"Death":{"start":130,"end":164},"total":164,"paddingBottom":100}
// SPECTER
// {"Walk":{"start":0,"end":19},"Idle":{"start":20,"end":39},"Attack":{"start":40,"end":74},"GetHit":{"start":75,"end":94},"Death":{"start":95,"end":133},"total":133,"paddingBottom":100}

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
  img: string;
  paddingBottom: string;
  marginTop: string;

  constructor() {}

  ngOnInit(): void {
    this.img = `url(/assets/img/monsters/${this.monster.name.replace(' ', '')}.png)`;
    this.paddingBottom = this.monster.sprites.paddingBottom + '%';
    this.marginTop = 100 - this.monster.sprites.paddingBottom + '%';
    this.sprite = this.monster.sprites[this.status].start;
    this.interval = window.setInterval(() => {
      if (this.sprite < this.monster.sprites[this.status].end) {
        this.sprite += 1;
      } else {
        if (this.status !== 'Idle') {
          this.status = 'Idle';
        }
        this.sprite = this.monster.sprites[this.status].start;
      }
    }, 50);
  }

  getBackgroundPosition(): string {
    return `0 ${this.sprite === 0 ? 0 : (100 / this.monster.sprites.total) * this.sprite}%`;
  }

  changeStatus(): void {
    const status = ['Attack', 'Death', 'GetHit'];
    const rdmStatus = rdmFloor(status.length);
    this.status = status[rdmStatus];
    this.sprite = this.monster.sprites[this.status].start;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
