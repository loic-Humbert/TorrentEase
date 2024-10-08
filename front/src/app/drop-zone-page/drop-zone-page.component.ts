import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TorrentService } from '../torrent.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketService } from '../socket.service';
import { QuestionReponseComponent } from "../question-reponse/question-reponse.component";


@Component({
  selector: 'app-drop-zone-page',
  standalone: true,
  imports: [HttpClientModule, QuestionReponseComponent],
  templateUrl: './drop-zone-page.component.html',
  styleUrl: './drop-zone-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Ajouter cette ligne
})
export class DropZonePageComponent {
  currentFile: any
  progress = 0;
  torrentName = '';

  constructor(
    private torrentService: TorrentService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    // S'abonner aux mises à jour de progression
    this.socketService.onProgress().subscribe(data => {
      this.progress = parseInt(data.progress);
      this.torrentName = data.name;
      console.log(this.progress);
      
      
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.torrentName = file.name

      // Vous pouvez lire le fichier ici
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target?.result;
        console.log(fileContent);  // Contenu du fichier
      };
      this.currentFile = file
      console.log(file);

      reader.readAsText(file); // ou readAsArrayBuffer pour les fichiers binaires
    }
  }

  transformExtension(filename: string): string {
    if (filename.endsWith('.torrent')) {
        return filename.replace('.torrent', '.zip');
    } else {
        return filename
    }
}


  downloadTorrent() {
    this.torrentService.uploadFile(this.currentFile).subscribe(
      (response: Blob) => {
        // Créer un objet URL pour le Blob
        const url = window.URL.createObjectURL(response);
        // Créer un lien pour télécharger le fichier
        const a = document.createElement('a');
        a.href = url;
        a.download = this.transformExtension(this.currentFile.name);  // Vous pouvez aussi utiliser un nom spécifique pour le fichier téléchargé
        document.body.appendChild(a);
        a.click();
        // Nettoyer
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error => {
        console.error('Erreur lors de l\'upload du fichier', error);
      }
    );

  }

}
