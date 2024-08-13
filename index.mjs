import express from 'express';
import multer from 'multer';
import WebTorrent from 'webtorrent';
import fs from 'fs';
import path from 'path';

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

  // Ajouter le torrent
  client.add(filePath, { path: downloadDir }, (torrent) => {
    console.log(`Téléchargement de : ${torrent.name}`);

    torrent.on('done', () => {
      console.log(`Téléchargement terminé : ${torrent.name}`);
    });

    torrent.files.forEach((file) => {
      const filePath = path.join(downloadDir, file.name);
      const writeStream = fs.createWriteStream(filePath);

      file.createReadStream().pipe(writeStream);

      writeStream.on('finish', () => {
        console.log(`Fichier téléchargé : ${file.name}`);
      });

      writeStream.on('error', (err) => {
        console.error(`Erreur lors de l'écriture du fichier : ${err.message}`);
      });
    });

    // Supprimez le fichier torrent après l'ajout pour éviter l'encombrement
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Erreur lors de la suppression du fichier torrent : ${err.message}`);
    });

    res.json({ message: `Téléchargement en cours pour : ${torrent.name}` });
  });

  client.on('error', (err) => {
    console.error(`Erreur : ${err.message}`);
    res.status(500).json({ error: `Erreur de téléchargement : ${err.message}` });
  });
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
