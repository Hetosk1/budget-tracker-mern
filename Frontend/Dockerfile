FROM node:20.18.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

ARG VITE_API_URL 
ENV VITE_API_URL=$VITE_API_URL

RUN npm install 

EXPOSE 5173

CMD ["npm", "run", "dev"]

