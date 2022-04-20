import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameAreaModule } from '../game-area/game-area.module';
 

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameAreaModule
  ],
  exports: [GameComponent]
})
export class GameModule { }
