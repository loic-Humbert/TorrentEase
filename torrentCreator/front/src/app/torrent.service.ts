import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  private apiUrl = 'http://localhost:3000/download'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<Blob> {
    const formData: FormData = new FormData();
    formData.append('torrent', file, file.name);
  
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    return this.http.post(this.apiUrl, formData, {
      headers,
      responseType: 'blob'  // Spécifiez que vous attendez un Blob en réponse
    });
  }
}
