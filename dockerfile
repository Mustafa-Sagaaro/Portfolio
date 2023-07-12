# Verwende den offiziellen Node.js-Image als Basis
FROM node:14

# Setze das Arbeitsverzeichnis im Container
WORKDIR /portfolio

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Projektcode in das Arbeitsverzeichnis
COPY . .

# Starte den Entwicklungsserver
CMD ["npm", "run", "dev"]
