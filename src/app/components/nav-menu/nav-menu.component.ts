import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  constructor (public authService: AuthService) {}
  
  selectedButton = 0;
  buttons = [
    {
      text: 'Lobby',
      link: 'home',
    },
    {
      text: 'Social',
      link: 'social',
      notifs: this.authService.user.invitations.length,
    },
    {
      text: 'Ranking',
      link: 'ranking',
    },
    {
      text: 'Collection',
      link: 'collection',
    },
  ];

  setSelectedButton = (index: number): void => {
    this.selectedButton = index;
  };
}
