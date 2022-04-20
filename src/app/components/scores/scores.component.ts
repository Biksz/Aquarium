import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { collection, Firestore, getDocs} from '@angular/fire/firestore';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Chart, registerables } from 'chart.js';
import { Score } from '../../models/score';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  dataS = new MatTableDataSource<Score>([])
  displayedColumns = ['user', 'allLeft', 'allRight', 'laterialIndex', 'sIndex', 'tmutato', 'vigil', 'date'];
  laterialIndexes : number[] = [];
  sIndexes : number[] = [];
  vigilIndexes : number[] = [];
  tIndexes : number[] = [];
  allLeft : number[] = [];
  allRight : number[] = [];
  lMean : number = 0;
  sMean : number = 0;
  tMean : number = 0;
  vMean : number = 0;
  allLeftMean : number = 0;
  allRightMean : number = 0;
  chart : any;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  
  constructor(private observer: BreakpointObserver, private cd : ChangeDetectorRef, public firestore: Firestore) {
  }
  
  ngOnInit(): void {
    this.getData();
    this.chart = document.getElementById('chart');
    Chart.register(...registerables);
  }

  ngAfterViewInit(){
    this.dataS.paginator = this.paginator;
    this.dataS.sort = this.matSort;
    this.observer.observe(['(max-width: 1200px)']).subscribe((res)=> {
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cd.detectChanges(); //ne dobjon errort
  }

  getData(){
    const dbInstance = collection(this.firestore, 'scores');
    getDocs(dbInstance)
    .then((querySnapshot) => {
      let t : Score[] = [];
      querySnapshot.docs.forEach(doc => {
        t.push({...doc.data() as Score});
      })
      this.dataS.data = t;
      this.dataS.data.forEach((element) => {
        this.laterialIndexes.push(element.laterialIndex as number);
        this.sIndexes.push(element.sIndex as number);
        this.vigilIndexes.push(element.vigil as number);
        this.tIndexes.push(element.tmutato as number);
        this.allLeft.push(element.allLeft as number);
        this.allRight.push(element.allRight as number);
        });
        this.lMean = this.meanCounter(this.laterialIndexes);
        this.sMean = this.meanCounter(this.sIndexes);
        this.tMean = this.meanCounter(this.tIndexes);
        this.vMean = this.meanCounter(this.vigilIndexes);
        this.allLeftMean = this.meanCounter(this.allLeft);
        this.allRightMean = this.meanCounter(this.allRight);
        this.loadChart();
    })
  }

  dataFilter($event : any){
    this.dataS.filter = $event.target.value;
  }

  meanCounter(array: number[]): number{
    let sum : number = 0;
    for(let i=0; i < array.length; i++){
      sum += array[i];
    }
    return sum/array.length as number;
  }

  loadChart(){
    new Chart(this.chart, {
      type: 'bar',
      data:{
        datasets: [
          {
          label: 'Lateralitás index',
          data: [this.lMean],
          backgroundColor: '#ff584d',
          borderRadius: 5,
        },
        {
          label: 'Súlyossági index',
          data: [this.sMean],
          backgroundColor: '#79ff54',
          borderRadius: 5,
        },{
          label: 'Törlési mutató',
          data: [this.tMean],
          backgroundColor: '#6383ff',
          borderRadius: 5
        },{
          label: 'Vigilancia index',
          data: [this.vMean],
          backgroundColor: '#f4ff54',
          borderRadius: 5
        },{
          label: 'Bal oldal átlag',
          data: [this.allLeftMean],
          backgroundColor: '#eb34e8',
          borderRadius: 5
        },{
          label: 'Jobb oldal átlag',
          data: [this.allRightMean],
          backgroundColor: '#ff6a00',
          borderRadius: 5
        }],
        labels: ['Átlag értékek']
      }
    })
  }
}