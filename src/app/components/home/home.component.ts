import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$ = this.usersService.currenUserProfile$; //link az aktualis userre

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private authService: AuthenticationService, private observer: BreakpointObserver, private cd : ChangeDetectorRef, private usersService: UsersService) { }

  
  ngOnInit(): void {
  }

  ngAfterViewInit(){
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

}
