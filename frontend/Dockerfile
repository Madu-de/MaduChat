FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./

# Moved the installation procces above copying so that code changes which does not affect packages will not
# trigger instalation resulting in low build time
RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
