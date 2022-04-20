import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAreaComponent } from './game-area.component';


@NgModule({
  declarations: [GameAreaComponent],
  imports: [
    CommonModule
  ],
  exports: [GameAreaComponent]
})
export class GameAreaModule { }
