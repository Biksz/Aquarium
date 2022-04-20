import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, updateProfile, UserInfo} from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private router: Router) { }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signup(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any>{
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if(!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData)
      })
    )
  }
  
  logout(){
    return from(this.auth.signOut());
  }
}
