import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

}
