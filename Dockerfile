# Base image
FROM node:20.11.1
# Create app directory. The smaller, the better.
WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/app.js"]

