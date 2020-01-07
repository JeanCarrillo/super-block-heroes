import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() nickname: string;
  @Input() gold: number;
  @Input() hero: Hero;
}
