FROM node:20.18.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

