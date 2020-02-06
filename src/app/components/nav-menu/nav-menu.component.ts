import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  constructor (public authService: AuthService) {}
  
  ngOnInit() {
    const invitNotif = `${this.authService.user.invitations.length}`;
    console.log('Invitations', invitNotif)
  }

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
