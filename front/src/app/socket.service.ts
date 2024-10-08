import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connectez-vous au serveur Socket.io
    this.socket = io(environment.apiUrl);
  }

  // Méthode pour écouter la progression du téléchargement
  onProgress(): Observable<{ progress: string; name: string }> {
    return new Observable(observer => {
      this.socket.on('progress', (data) => {
        observer.next(data);
      });

      // Optionnel : déconnecter l'écouteur si plus nécessaire
      return () => this.socket.off('progress');
    });
  }
}
