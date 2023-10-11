import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  convertBlopToImage(blob: Blob) {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        observer.next(<string>reader.result);
        observer.complete();
      });
      reader.readAsDataURL(blob);
    });
  }
}
