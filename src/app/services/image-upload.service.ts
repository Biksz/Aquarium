import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) { }

  uploadImage(img: File, path: string): Observable<string>{
    const storageRef = ref(this.storage, path);
    const storageTask = from(uploadBytes(storageRef, img));
    return storageTask.pipe(
      switchMap((res)=> getDownloadURL(res.ref))
    )
  }
}
