import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { from } from 'rxjs';
import { Fishes } from '../../fishes/fishes';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameAreaComponent implements OnInit {

  fishes = Fishes;
  rightFishNum = 0;
  leftFishNum = 0;
  goodLeftFishes = 0;
  goodRightFishes = 0;
  badLeftFishes = 0;
  badRightFishes = 0;
  stage = 0;
  lvls = {
    first : { goodLeft: 0, goodRight: 0, badLeft: 0, badRight: 0},
    second : {goodLeft: 0, goodRight: 0, badLeft: 0, badRight: 0},
    third : {goodLeft: 0, goodRight: 0, badLeft: 0, badRight: 0},
    fourth : {goodLeft: 0, goodRight: 0, badLeft: 0, badRight: 0}
  };

  constructor(private firestore: Firestore, private auth: Auth, private router: Router) {
   }

  ngOnInit(): void {

    this.makeStage(45, 30, 1, 0, 59000);

    this.makeStage(45, 30, 2, 60000, 119000);

    this.makeStage(120, 30, 3, 120000, 179000);

    this.makeStage(120, 30, 4, 180000, 239000);

    setTimeout(() =>{this.finalCounter()},239000);

    setTimeout(() =>{this.router.navigate(['/scores'])},240000);

  }

  createFishes(isLeftSIde: boolean, isBadFIshes: boolean){
    let area = document.getElementById("gameBoard") as HTMLDivElement;
    let divWidth = area.offsetWidth;
    let divHeight = area.offsetHeight;
    let xCoordPos;
    let div = document.createElement("div");
    if(isLeftSIde){
      xCoordPos = Math.floor(Math.random() * ((divWidth/2) - 50));
    } else {
      xCoordPos = Math.floor(Math.random() * ((divWidth/2) - 50) + divWidth/2);
    }
    if(isBadFIshes){
      let rand = Math.floor(Math.random() * 13);
      div.setAttribute("style", "background-image: url(" + this.fishes[rand].img + "); background-size: 50px 50px; width: 50px; height: 50px; left: " + xCoordPos +"px; top: "+ Math.floor(Math.random() * (divHeight - 50)) +"px");
      div.classList.add("" + this.fishes[rand].id + "");
    } else {
      div.setAttribute("style", "background-image: url(assets/images/gdgfish.png); background-size: 50px 50px; width: 50px; height: 50px; left: " + xCoordPos +"px; top: "+ Math.floor(Math.random() * (divHeight - 50)) +"px");
      div.classList.add("gdgfish");
    }
    div.classList.add("fish");
    return div;
  }

  spawnBadFishes(fishNum: number, isLeftSide: boolean){
    let area = document.getElementById("gameBoard");
    for(let i=0; i<fishNum; i++){
      let div = this.createFishes(isLeftSide, true);
      if(isLeftSide){
        this.leftFishNum++;
      }else{
        this.rightFishNum++;
      }
      area?.appendChild(div);
    }
  }

  spawnGoodFishes(fishNum: number, isLeftSide: boolean){
    let area = document.getElementById("gameBoard");
    for(let i=0; i<fishNum; i++){
      let div = this.createFishes(isLeftSide, false);
      if(isLeftSide){
        this.leftFishNum++;
      }else{
        this.rightFishNum++;
      }
      area?.appendChild(div);
    }
  }

  clickFish(event: any){
    let area = document.getElementById("gameBoard") as HTMLDivElement;
    let divWidth = area.offsetWidth;
    let picked = event.target;
    let position = picked.offsetLeft;
    if(picked.classList.contains("gdgfish")){
      picked.style.backgroundImage="url(assets/images/gdgfishchecked.png)";
      if(position < divWidth/2){
        this.goodLeftFishes++;
      } else {
        this.goodRightFishes++;
      }
    } else {
      if(position < divWidth/2){
        this.badLeftFishes++;
      } else {
        this.badRightFishes++;
      }
    }
  }

  removeFishes(){
    let divs = document.getElementById("gameBoard")?.getElementsByClassName("fish") as HTMLCollection;
    for(let i = divs.length -1; i >= 0; --i){
      divs[i].remove();
    }
  }

  scoreCounter(stage: number){
    if(stage == 1){
      this.lvls.first.goodLeft = this.goodLeftFishes;
      this.goodLeftFishes = 0;
      this.lvls.first.goodRight = this.goodRightFishes;
      this.goodRightFishes = 0;
      this.lvls.first.badLeft = this.badLeftFishes;
      this.badLeftFishes = 0;
      this.lvls.first.badRight = this.badRightFishes;
      this.badRightFishes = 0;
    } if (stage == 2){
      this.lvls.second.goodLeft = this.goodLeftFishes;
      this.goodLeftFishes = 0;
      this.lvls.second.goodRight = this.goodRightFishes;
      this.goodRightFishes = 0;
      this.lvls.second.badLeft = this.badLeftFishes;
      this.badLeftFishes = 0;
      this.lvls.second.badRight = this.badRightFishes;
      this.badRightFishes = 0;
    } if (stage == 3){
      this.lvls.third.goodLeft = this.goodLeftFishes;
      this.goodLeftFishes = 0;
      this.lvls.third.goodRight = this.goodRightFishes;
      this.goodRightFishes = 0;
      this.lvls.third.badLeft = this.badLeftFishes;
      this.badLeftFishes = 0;
      this.lvls.third.badRight = this.badRightFishes;
      this.badRightFishes = 0;
    } if (stage == 4) {
      this.lvls.fourth.goodLeft = this.goodLeftFishes;
      this.goodLeftFishes = 0;
      this.lvls.fourth.goodRight = this.goodRightFishes;
      this.goodRightFishes = 0;
      this.lvls.fourth.badLeft = this.badLeftFishes;
      this.badLeftFishes = 0;
      this.lvls.fourth.badRight = this.badRightFishes;
      this.badRightFishes = 0;
    }
  }

  makeStage(badFishNum: number, goodFishNum: number, stageNumber: number, fishSpawnTime: number, endTime: number){
    setTimeout(() =>{this.spawnBadFishes(badFishNum, true)},fishSpawnTime);
    setTimeout(() =>{this.spawnBadFishes(badFishNum, false)},fishSpawnTime);
    setTimeout(() =>{this.spawnGoodFishes(goodFishNum, true)},fishSpawnTime);
    setTimeout(() =>{this.spawnGoodFishes(goodFishNum, false)},fishSpawnTime);
    setTimeout(() =>{this.removeFishes()},endTime);
    setTimeout(() =>{this.scoreCounter(stageNumber)},endTime);
  }

  finalCounter(){
    const user = this.auth.currentUser?.email;
    let laterialIndex = Math.round(((((this.lvls.first.goodRight + this.lvls.second.goodRight + this.lvls.third.goodRight + this.lvls.fourth.goodRight)-(this.lvls.first.goodLeft + this.lvls.second.goodLeft + this.lvls.third.goodLeft + this.lvls.fourth.goodLeft))/((this.lvls.first.goodRight + this.lvls.second.goodRight + this.lvls.third.goodRight + this.lvls.fourth.goodRight)+(this.lvls.first.goodLeft + this.lvls.second.goodLeft + this.lvls.third.goodLeft + this.lvls.fourth.goodLeft)))) * 100) / 100;
    let sIndex = Math.round(((180 - ( this.lvls.first.goodLeft + this.lvls.first.goodRight + this.lvls.second.goodLeft + this.lvls.second.goodRight + this.lvls.third.goodLeft + this.lvls.third.goodRight + this.lvls.fourth.goodLeft + this.lvls.fourth.goodRight))/180)*100)/100;
    let vigilancia = Math.round(((this.lvls.first.goodRight + this.lvls.second.goodRight + this.lvls.third.goodRight + this.lvls.fourth.goodRight + this.lvls.first.badRight + this.lvls.second.badRight + this.lvls.third.badRight + this.lvls.fourth.badRight) / 900 * 100)*100)/100;
    let tMutatao = Math.round((10 * (laterialIndex * sIndex))*100)/100;
    let piper = new DatePipe('en-US');
    let pipedDate = piper.transform(Date.now(), 'dd/MM/yyyy, h:mm a');
    let allLeft = (this.lvls.first.goodLeft + this.lvls.second.goodLeft + this.lvls.third.goodLeft + this.lvls.fourth.goodLeft);
    let allRight = (this.lvls.first.goodRight + this.lvls.second.goodRight + this.lvls.third.goodRight + this.lvls.fourth.goodRight);
    const ref = addDoc(collection(this.firestore, "scores"), {
      user: user,
      firstBadLeft: this.lvls.first.badLeft,
      firstBadRight: this.lvls.first.badRight,
      firstGoodLeft: this.lvls.first.goodLeft,
      firstGoodRight: this.lvls.first.goodRight,
      secondBadLeft: this.lvls.second.badLeft,
      secondBadRight: this.lvls.second.badRight,
      secondGoodLeft: this.lvls.second.goodLeft,
      secondGoodRight: this.lvls.second.goodRight,
      thirdBadLeft: this.lvls.third.badLeft,
      thirdBadRight: this.lvls.third.badRight,
      thirdGoodLeft: this.lvls.third.goodLeft,
      thirdGoodRight: this.lvls.third.goodRight,
      fourthBadLeft: this.lvls.fourth.badLeft,
      fourthBadRight: this.lvls.fourth.badRight,
      fourthGoodLeft: this.lvls.fourth.goodLeft,
      fourthGoodRight: this.lvls.fourth.goodRight,
      laterialIndex: laterialIndex,
      sIndex: sIndex,
      vigil: vigilancia,
      tmutato: tMutatao,
      date: pipedDate,
      allLeft: allLeft,
      allRight: allRight
    });
    return from(ref);
  }
}