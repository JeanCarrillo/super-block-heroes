import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { SocialComponent } from './pages/home/social/social.component';
// import { MyaccountComponent } from './pages/main/myaccount/myaccount.component';
import { RankingComponent } from './pages/home/ranking/ranking.component';
import { CollectionComponent } from './pages/home/collection/collection.component';
import { LobbyComponent } from './pages/home/lobby/lobby.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { GameLobbyComponent } from './pages/game-lobby/game-lobby.component';
import { GameResolverService } from './shared/services/game-resolver.service';
import { MonsterResolverService } from './shared/services/monster-resolver.service';
import { HeroesResolverService } from './shared/services/heroes-resolver.service';
 
const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'game-lobby', component: GameLobbyComponent },
  {
    path: 'home',
    // Guard
    // Resolver
    component: HomeComponent,
    resolve: {
      game: GameResolverService,
      monster: MonsterResolverService,
      heroes: HeroesResolverService,
      // @TODO: resolve socketService
    },
    children: [
      {
        path: '',
        component: LobbyComponent,
      },
      {
        path: 'ranking',
        component: RankingComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'social',
        component: SocialComponent,
      },
    ],
  },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
