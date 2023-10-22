FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

# Moved the installation procces above copying so that code changes which does not affect packages will not 
# trigger instalation resulting in low build time

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000
EXPOSE 3001
CMD ["nest", "start", "--watch"]
