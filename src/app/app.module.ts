import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { SingInModule } from './components/sing-in/sing-in.module';
import { LandingModule } from './components/landing/landing.module';
import { GameModule } from './components/game/game.module';
import { ScoresModule } from './components/scores/scores.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { IntroductionModule } from './components/introduction/introduction.module';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ProfileModule } from './components/profile/profile.module';
import { GameAreaModule } from './components/game-area/game-area.module';
import { FishComponent } from './components/fish/fish.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    LandingModule,
    GameModule,
    ScoresModule,
    SingInModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatSlideToggleModule,
    IntroductionModule,
    ProfileModule,
    GameAreaModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
