import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  // Importez les environnements

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  private apiUrl = environment.apiUrl; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<Blob> {
    const formData: FormData = new FormData();
    formData.append('torrent', file, file.name);
  
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    return this.http.post(this.apiUrl + "/download", formData, {
      headers,
      responseType: 'blob'  // Spécifiez que vous attendez un Blob en réponse
    });
  }
}
