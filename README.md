![repository-open-graph-template](https://github.com/Madu-de/MaduChat/assets/85842735/e011569f-be7e-4d58-ba44-7f4d44acb98a)

## Getting started without docker
- Clone this repo
- Create a .env file in /backend and add "JWT_SECRET={your_jwt_secret_here}"
- If you want to, you can add the following .env variables. 
  - DATABASE => Default is "maduchat"
  - DATABASE_HOST => Default is "localhost"
  - DATABASE_PORT => Default is 3306
  - DATABASE_USERNAME => Default is "root"
  - DATABASE_PASSWORD => Default is ""
- Execute "npm i" in /frontend and /backend
- Start MySQL with XAMPP for example
- Create the "maduchat" Database
- Start the "startdev.bat" (If you cannot use it, you have to start the frontend and backend manually in dev mode)
- Go back to the "chat" table and add the global chat.
  - id: global
  - name: Global
- Go to "localhost:4200" in your browser and enjoy!

## Getting started with docker
- Clone this repo
- Create a .env file in /backend and add "JWT_SECRET={your_jwt_secret_here}" (You can also add this in the [docker-compose](./docker-compose.yml) at services>backend>environment)
- Execute "docker compose up -d" on this directory
- Execute "docker compose watch" if you want to instruct Docker to monitor changes and save them in the containers
- Call the CreateGlobalchat procedure
- Go to "localhost:4200" in your browser and enjoy!

## MaduChat CLI
[![MaduChat-CLI](https://github-readme-stats.vercel.app/api/pin/?username=Madu-de&repo=MaduChat-CLI&theme=dark&show_owner=true)](https://github.com/Madu-de/MaduChat-CLI)


## Docs
[Frontend](https://github.com/Madu-de/MaduChat/blob/main/frontend/README.md)
[Backend](https://github.com/Madu-de/MaduChat/blob/main/backend/README.md)
[CLI](https://github.com/Madu-de/MaduChat-CLI/blob/main/backend/README.md)
