FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./
COPY . .

RUN npm install
RUN npm install -g @nestjs/cli

EXPOSE 3000
EXPOSE 3001
CMD ["nest", "start", "--watch"]