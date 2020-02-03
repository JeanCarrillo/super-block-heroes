import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { KEYS } from '../../shared/constants/keyboard';

@Component({
  selector: 'app-capacity-icon',
  templateUrl: './capacity-icon.component.html',
  styleUrls: ['./capacity-icon.component.css'],
})
export class CapacityIconComponent implements OnInit, OnChanges {
  @Input() demoIcon: boolean;
  @Input() capacityName: string;
  @Input() progress: number;
  img: string;
  key: string;
  constructor() {}

  ngOnInit(): void {
    this.key = KEYS[0].CAPACITY.toUpperCase();
    this.img = this.formatImg(this.capacityName);
  }

  ngOnChanges(changes): void {
    if (changes.capacityName) {
      this.img = this.formatImg(changes.capacityName.currentValue);
    }
  }

  formatImg(str: string): string {
    const name = str.replace(' ', '').replace("'", '');
    return `url(/assets/img/capacities/${name}.png)`;
  }

  getProgress(): string {
    return `${this.progress > 100 ? 0 : 100 - this.progress}%`;
  }
}
