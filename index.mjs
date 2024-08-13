import express from 'express';
import multer from 'multer';
import WebTorrent from 'webtorrent';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import archiver from 'archiver';

const app = express();
const port = 3000;

// Configuration de multer pour stocker les fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Utilisez le nom original du fichier
  }
});
const upload = multer({ storage });

// Créez une instance du client WebTorrent
const client = new WebTorrent();

// Créez le dossier pour les fichiers téléchargés s'il n'existe pas
const downloadDir = 'downloads/';
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

// Route pour télécharger un torrent via fichier uploadé
app.post('/download', upload.single('torrent'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier torrent reçu' });
  }

  const filePath = req.file.path;
  const uniqueId = uuidv4();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format de date pour éviter les problèmes de nom de fichier
  const zipFileName = `download-${uniqueId}-${timestamp}.zip`;

  // Ajouter le torrent
  client.add(filePath, { path: downloadDir }, (torrent) => {
    console.log(`Téléchargement de : ${torrent.name}`);

    torrent.on('done', () => {
      console.log(`Téléchargement terminé : ${torrent.name}`);

      // Créer un fichier ZIP
      const output = fs.createWriteStream(zipFileName);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        console.log(`Fichier ZIP créé : ${zipFileName}`);
        // Envoyer le fichier ZIP en réponse
        res.download(zipFileName, (err) => {
          if (err) {
            console.error(`Erreur lors de l'envoi du fichier ZIP : ${err.message}`);
          }
          // Nettoyer les fichiers temporaires après l'envoi
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error(`Erreur lors de la suppression du fichier torrent : ${unlinkErr.message}`);
          });
          fs.unlink(zipFileName, (unlinkErr) => {
            if (unlinkErr) console.error(`Erreur lors de la suppression du fichier ZIP : ${unlinkErr.message}`);
          });
        });
      });

      output.on('error', (err) => {
        console.error(`Erreur lors de la création du fichier ZIP : ${err.message}`);
        res.status(500).json({ error: `Erreur lors de la création du fichier ZIP : ${err.message}` });
      });

      archive.pipe(output);

      // Ajouter les fichiers téléchargés au ZIP
      torrent.files.forEach((file) => {
        const fileStream = file.createReadStream();
        archive.append(fileStream, { name: file.name });
      });

      archive.finalize();
    });

    client.on('error', (err) => {
      console.error(`Erreur : ${err.message}`);
      res.status(500).json({ error: `Erreur de téléchargement : ${err.message}` });
    });
  });
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
