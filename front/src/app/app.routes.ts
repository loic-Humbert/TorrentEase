import { Routes } from '@angular/router';
import { DropZonePageComponent } from './drop-zone-page/drop-zone-page.component';
import { TelechargerTorrentComponent } from './articles/telecharger-torrent/telecharger-torrent.component';
import { ComparateurUtorrentComponent } from './articles/comparateur-utorrent/comparateur-utorrent.component';
import { QuestionReponseComponent } from './question-reponse/question-reponse.component';

export const routes: Routes = [
    { path: '', component: DropZonePageComponent },
    { path: 'blog/TelechargerTorrent', component: TelechargerTorrentComponent },
    { path: 'blog/ComparatorUttorent', component: ComparateurUtorrentComponent },
];
