
FROM node:18.12.1

WORKDIR C:\Users\MSAAG\OneDrive - bbw.ch\Datenablage\Abschlussprojekt\Portfolio\portfolio

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
