# Verwende den offiziellen Node.js-Image als Basis
FROM node:18.12.1

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Projektcode in das Arbeitsverzeichnis
COPY . .

# Baue das React-App-Bundle
RUN npm run build

# Exponiere den Port, auf dem deine App ausgeführt wird (Port 5173 für npm run dev)
EXPOSE 5173

# Starte den Server
CMD ["npm", "run", "dev"]
