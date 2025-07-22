# Stage 1: Build Vite (React) App
FROM node:20.18.0 AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm install
RUN npm run build   # <-- This creates the 'dist/' folder

# Stage 2: Serve with Apache
FROM httpd:2.4

# Copy build output to Apache html directory
COPY --from=builder /usr/src/app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80
CMD ["httpd-foreground"]

