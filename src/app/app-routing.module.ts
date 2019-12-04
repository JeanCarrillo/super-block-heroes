import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/authentification/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { GameComponent } from "./pages/game/game.component";
import { StoreComponent } from "./pages/home/store/store.component";
import { SocialComponent } from "./pages/home/social/social.component";
// import { MyaccountComponent } from './pages/main/myaccount/myaccount.component';
import { RankingComponent } from "./pages/home/ranking/ranking.component";
import { CollectionComponent } from "./pages/home/collection/collection.component";
import { LobbyComponent } from "./pages/home/lobby/lobby.component";
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "sign-in", component: SignInComponent},
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: LobbyComponent
      },
      {
        path: "store",
        component: StoreComponent
      },
      {
        path: "ranking",
        component: RankingComponent
      },
      {
        path: "collection",
        component: CollectionComponent
      },
      {
        path: "social",
        component: SocialComponent
      }
    ]
  },
  { path: "game", component: GameComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
