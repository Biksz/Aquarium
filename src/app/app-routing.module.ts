import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ScoresComponent } from './components/scores/scores.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ProfileComponent } from './components/profile/profile.component';

const redirectToLogin = ()=> redirectUnauthorizedTo(['login']);
const redirectToHome = ()=> redirectLoggedInTo(['home']);

const routes: Routes = [{

  path: '',
  pathMatch: 'full',
  component: LandingComponent
},
{
  path: 'login',
  component: LoginComponent,
  ...canActivate(redirectToHome)
},
{
  path: 'sign-in',
  component: SingInComponent,
  ...canActivate(redirectToHome)
},
{
  path: 'home',
  component: HomeComponent,
  ...canActivate(redirectToLogin) //... csak egy roviditese a szintaxisnak
},
{
  path: 'game',
  component: GameComponent,
  ...canActivate(redirectToLogin)
},
{
  path: 'scores',
  component: ScoresComponent,
  ...canActivate(redirectToLogin)
},
{
  path: 'introduction',
  component: IntroductionComponent,
  ...canActivate(redirectToLogin)
},
{
  path: 'profile',
  component: ProfileComponent,
  ...canActivate(redirectToLogin)
},
{
  path: '**',
  redirectTo: '/login'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
