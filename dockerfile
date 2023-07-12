
FROM node:18.12.1

WORKDIR /portfolio/src

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
