import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'firebase/auth';
import { concatMap } from 'rxjs/operators';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.usersService.currenUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private authService: AuthenticationService, private usersService: UsersService, private imgUploadService: ImageUploadService, private toast: HotToastService) { }

  ngOnInit(): void {
    this.usersService.currenUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({...user});
    })
  }

  uploadImage(event: any, user: ProfileUser){
    let extension = event.target.files[0].name.split('.').pop();
    if(extension == 'jpg' || extension == 'jpeg' || extension == 'png'){
      this.imgUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
        this.toast.observe({
          loading: 'Kép feltöltése...',
          success: 'A kép sikeresen feltöltve',
          error: 'A képet nem sikerült menteni'
        }), concatMap((photoURL)=> this.usersService.updateUser({uid: user.uid, photoURL}))
      ).subscribe();
    } else {
      alert('Nem megfelelő file formátum!');
    }
  }

  saveProfile(){
    const profileData = this.profileForm.value;
    this.usersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Adatok mentése...',
        success: 'Adatok sikeresen mentve',
        error: 'Valami hiba történt'
      })
    ).subscribe();
  }

}
