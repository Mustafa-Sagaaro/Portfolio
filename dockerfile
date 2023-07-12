
FROM node:18.12.1

WORKDIR /portfolio

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
