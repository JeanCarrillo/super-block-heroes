import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  constructor(public authservice: AuthService) {}

  ngOnInit() {}
}
