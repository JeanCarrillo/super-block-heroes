import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/home/sign-in/sign-in.component';
import { SignUpComponent } from './pages/home/sign-up/sign-up.component';
import { ForgotPwComponent } from './pages/home/forgot-pw/forgot-pw.component';
import { MainComponent } from './pages/main/main.component';
import { LobbyComponent } from './pages/main/lobby/lobby.component';
import { MenuComponent } from './pages/main/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { BoardComponent } from './pages/game/board/board.component';
import { MonsterComponent } from './pages/game/monster/monster.component';
import { ScoreComponent } from './pages/game/score/score.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPwComponent,
    MainComponent,
    LobbyComponent,
    MenuComponent,
    GameComponent,
    BoardComponent,
    MonsterComponent,
    ScoreComponent,
    ButtonComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
