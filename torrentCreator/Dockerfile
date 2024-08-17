# Utiliser une image de base officielle de Node.js
FROM node:18

# Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY torrentCreator/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Exposer le port que votre application utilise
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "index.mjs"]
