FROM node:carbon
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]