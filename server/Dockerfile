# Utiliser une image Node.js LTS 
# Comporte des vulnerabilités, par grave ici.
FROM node:22-alpine3.23

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier les fichiers de configuration et le code source
COPY tsconfig.json ./
COPY src ./src

# Compiler le TypeScript
RUN yarn build

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]