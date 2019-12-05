import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-capacity-icon',
  templateUrl: './capacity-icon.component.html',
  styleUrls: ['./capacity-icon.component.css'],
})
export class CapacityIconComponent implements OnInit {
  @Input() capacityName: string;
  @Input() progress: number;
  img: string;
  constructor() {}

  ngOnInit() {
    const imgName = this.capacityName.replace(' ', '').replace("'", '');
    this.img = `url(/assets/img/capacities/${imgName}.png)`;
  }

  getProgress(): string {
    return `${this.progress > 100 ? 0 : 100 - this.progress}%`;
  }
}
