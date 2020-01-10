import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  invitations: [];
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  this.invitations = this.authservice.user.invitations ? this.authservice.user.invitations : []; 
  console.log(this.authservice.user);
  console.log(this.authservice.user.friends ? this.authservice.user.friends : 'tu nas pas damis');
  console.log(this.invitations);
  }
}
