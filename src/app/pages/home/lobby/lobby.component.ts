import { Component, OnInit } from "@angular/core";
import { DbService } from "../../../shared/services/db.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent implements OnInit {
  constructor(private dbService: DbService) {}

  ngOnInit() {
    console.log(this.dbService.user);
  }
}
