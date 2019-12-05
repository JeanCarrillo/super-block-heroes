import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-capacity-icon',
  templateUrl: './capacity-icon.component.html',
  styleUrls: ['./capacity-icon.component.css'],
})
export class CapacityIconComponent implements OnInit, OnChanges {
  @Input() capacityName: string;
  @Input() progress: number;
  img: string;
  constructor() {}

  ngOnInit() {
    this.img = this.formatImg(this.capacityName);
  }

  ngOnChanges(changes) {
    if (changes.capacityName) {
      this.img = this.formatImg(changes.capacityName.currentValue);
    }
  }

  formatImg(str: string) {
    const name = str.replace(' ', '').replace("'", '');
    return `url(/assets/img/capacities/${name}.png)`;
  }

  getProgress(): string {
    return `${this.progress > 100 ? 0 : 100 - this.progress}%`;
  }
}
