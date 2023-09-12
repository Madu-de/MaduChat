<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
  <span style="font-size: 250px; margin: 20px;">X</span>
  <a href="https://github.com/Madu-de" target="blank">
    <img src="https://avatars.githubusercontent.com/u/85842735?v=4" with="200" alt="Madu">
  </a>
</p>

# MaduChat Backend

## Description

MaduChat utilizes [Nest](https://github.com/nestjs/nest) for all backend-related functionalities.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints


<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(Returns string)</code></summary>

##### Parameters
None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `MaduChat programmed by Madu`                                |


##### Example cURL

> ```js
>  curl http://localhost:3000/
> ```

</details>

### Auth
<details>
<summary><code>POST</code> <code><b>/auth/login</b></code> <code>(Returns an access_token when the data is correct)</code></summary>

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username      |  required | string   | N/A  |
> | password      |  required | string   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"access_token": "token"}`                                |
> | `401`         | `application/json`                | `{"message": "Password or Username wrong", "error": "Unauthorized", "statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"username":"madu", "password":"examplePassword"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth/login
> ```

</details>

<details>
<summary><code>POST</code> <code><b>/auth/register</b></code> <code>(Returns an access_token when everything is fine)</code></summary>

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name          |  required | string   | N/A  |
> | username      |  required | string   | N/A  |
> | email         |  required | string   | N/A  |
> | password      |  required | string   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"access_token": "token"}`                                |
> | `400`         | `application/json`                | `{"message": ["ExampleError", "ExampleError"], "error": "Bad Request", "statusCode": 400}`                            |


##### Example cURL

> ```js
>  curl -d '{"name": "Madu", "username":"madu", "email": "madu@example.de", "password":"examplePassword"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth/register
> ```

</details>

### Users

<details>
<summary><code>GET</code> <code><b>/users</b></code> <code>(Returns user array)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | like      |  required | string   | Chars contained in username or name of users  |
> | friends      |  optional | boolean   | Get friend data too  |
> | chats      |  optional | boolean   | Get chats too  |
> | settings      |  optional | boolean   | Get settings too  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `[{"id": "a0f22b2e-a038-4f11-a8f1-6f5f3474fa7d","email": "madu@example.com", "name": "Madu","username": "madu"}]`                                |
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "Parameter 'like' is required"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:3000/users?like=ma
> ```

</details>

<details>
<summary><code>GET</code> <code><b>/users/{id | 'me'}</b></code> <code>(Returns an user)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | friends      |  optional | boolean   | Get friend data too  |
> | chats      |  optional | boolean   | Get chats too  |
> | settings      |  optional | boolean   | Get settings too  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": "a0f22b2e-a038-4f11-a8f1-6f5f3474fa7d","email": "madu@example.com", "name": "Madu","username": "madu"}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400, "message": "User not found"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:3000/users/me?friends=true
> ```

</details>

#### User Settings (2 options available)
<details>
<summary><code>POST</code> <code><b>/users/me/settings</b></code> <code>(Returns new settings)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | examples                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | settings      |  required | Settings   | {"showAvatar": true, "language": "Deutsch"}  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": "a0feab27-15a2-42ba-8518-dc11786fbab9", "showAvatar": true, "language": "Deutsch", ...}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400, "message": "Datatype of '{key}' value is not the same as needed. Is: '{datatypeOfKey}' Has to be: '{datatypeOfSetting}'"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"showAvatar":true, "language":"Deutsch"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/me/settings
> ```

</details>

<details>
<summary><code>POST</code> <code><b>/users/me/settings/{key}</b></code> <code>(Returns new settings)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | examples                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | value      |  required | string   | "Deutsch"  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": "a0feab27-15a2-42ba-8518-dc11786fbab9", "showAvatar": true, "language": "Deutsch", ...}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400, "message": "Datatype of '{key}' value is not the same as needed. Is: '{datatypeOfKey}' Has to be: '{datatypeOfSetting}'"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"value":true}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/me/settings/showAvatar
> ```

</details>

### Friends

<details>
<summary><code>POST</code> <code><b>/friends</b></code> <code>(Returns the user whose id was requested)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | friendId      |  required | string   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": "f8bac12b-2772-42ed-8dee-a490067be7e4","email": "gerald@gmail.de","name": "Gerald","username": "gerald","friends": [{"id": "dde16db4-20db-4ecc-9d04-dd720b4067fe","email": "damiancan@gmail.com","name": "Damian","username": "damian"}],"friendRequestsSent": [],"friendRequetsReceived": []}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "You cannot send a friend request to a friend"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"friendId":"f8bac12b-2772-42ed-8dee-a490067be7e4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/friends
> ```

</details>

<details>
<summary><code>DELETE</code> <code><b>/friends</b></code> <code>(Returns the user whose id was requested)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | friendId      |  required | string   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": "f8bac12b-2772-42ed-8dee-a490067be7e4","email": "gerald@gmail.de","name": "Gerald","username": "gerald","friends": [{"id": "dde16db4-20db-4ecc-9d04-dd720b4067fe","email": "damian@gmail.com","name": "Damian","username": "damian"}],"friendRequestsSent": [],"friendRequetsReceived": []}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "friendId is required"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"friendId":"f8bac12b-2772-42ed-8dee-a490067be7e4"}' -H "Content-Type: application/json" -X DELETE http://localhost:3000/users/friends
> ```

</details>

### Chat
<details>
<summary><code>GET</code> <code><b>/chat/{id}</b></code> <code>(Returns chat)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | members      |  optional | boolean   | Return members too  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": "global","name": "Global"}`                                | 
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |
> | `405`         | `application/json`                | `{"message": "Not Allowed","statusCode": 405}`      

##### Example cURL

> ```js
>  curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:3000/chat/global?members=true
> ```

</details>


<details>
<summary><code>GET</code> <code><b>/chat/{id}/messages</b></code> <code>(Returns chatmessages)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `[{"id": "c1ac413a-2608-4741-b2c1-31fd2abae9bd","message": "Hello World!","createdAt": "2023-08-21T16:13:42.137Z","author": {"id": "a0f22b2e-a038-4f11-a8f1-6f5f3474fa7d","email": "madu@example.com","name": "Madu","username": "madu"},"chat": {"id": "global","name": "Global"}}, ...]`                                | 
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |
> | `405`         | `application/json`                | `{"message": "Not Allowed","statusCode": 405}`      

##### Example cURL

> ```js
>  curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:3000/chat/global/messages
> ```

</details></summary>

<details>
<summary><code>POST</code> <code><b>/chat</b></code> <code>(Adds a chat with sender as owner)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | memberids      |  required | string[]   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"members": [{"id": "dde16db4-20db-4ecc-9d04-dd720b4067fe","email": "damian@gmail.com","name": "Damian","username": "damian"},{"id": "a0f22b2e-a038-4f11-a8f1-6f5f3474fa7d","email": "madu@gmail.com","name": "Madu","username": "madu","friends": [{"id": "dde16db4-20db-4ecc-9d04-dd720b4067fe","email": "damian@gmail.com","name": "Damian","username": "damian"}]}],"name": "Chat","id": "d0eec1fb-2276-4b4a-9c48-3b51e0ae362c"}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "Some members were not found"}`   
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "1419ac4e-18a6-4252-8d61-b0a8f07d2ab8 is not a friend of the owner"}`   
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |


##### Example cURL

> ```js
>  curl -d '{"memberids": ["f8bac12b-2772-42ed-8dee-a490067be7e4"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/chat
> ```

</details>

### Message

<details>
<summary><code>GET</code> <code><b>/message/{id}</b></code> <code>(Returns message)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | author      |  optional | boolean   | Return author too  |
> | chat      |  optional | boolean   | Return chat too  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": "2977c2dd-20d0-408d-bc45-8ee4a5719372","message": "Hallo Global","createdAt": "2023-08-24T08:09:23.890Z"}`                                | 
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |
> | `405`         | `application/json`                | `{"message": "Not Allowed","statusCode": 405}`      

##### Example cURL

> ```js
>  curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:3000/message/2977c2dd-20d0-408d-bc45-8ee4a5719372
> ```

</details>

<details>
<summary><code>POST</code> <code><b>/message/{chatid}</b></code> <code>(Returns sent message)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | message      |  required | string   | N/A  |

##### Parameters
None


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": "2977c2dd-20d0-408d-bc45-8ee4a5719372","message": "Hallo Global","createdAt": "2023-08-24T08:09:23.890Z"}`                                |
> | `401`         | `application/json`                | `{"message": "Unauthorized","statusCode": 401}`                            |
> | `405`         | `application/json`                | `{"message": "Not Allowed","statusCode": 405}`      


##### Example cURL

> ```js
>  curl -d '{"message":"Hello World!"}' -H "Content-Type: application/json" -X POST http://localhost:3000/message/global
> ```

</details>

## Websocket
MaduChat uses Socket.io (^10.1.3) to ensure the real-time chat.
- Port: 3001

### Serverevents
<details>
<summary><code>WS_EVENT</code> <code><b>joinChat</b></code> <code>(Triggers 'error' event when the user is not a member)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | chatid      |  required | string   | N/A  |

##### Responses
- If the user is not authenticated, it triggers the 'error' event on the client.
Message: 'Unauthorized'
- If the user is not allowed to join this chat, it triggers the 'error' event on the client.
Message: 'Not Allowed'

</details>

<details>
<summary><code>WS_EVENT</code> <code><b>sendMessage</b></code> <code>(Triggers 'error' event when the user is not a member)</code></summary>

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | authorization      |  required | string   | N/A |

##### Body
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | message      |  required | string   | N/A  |

##### Responses
- If the user is not authenticated, it triggers the 'error' event on the client.
Message: 'Unauthorized'
- If the user is not allowed to join this chat, it triggers the 'error' event on the client.
Message: 'Not Allowed'
- If everything is fine, it triggers the 'message' event containing the message on every client that joins the chat.

</details>

### Client Events
<summary><code>WS_EVENT</code> <code><b>message</b></code> <code>(Executes on every client when a message has been sent (Client has to be part of the chat))</code></summary>
</details>

<summary><code>WS_EVENT</code> <code><b>error</b></code> <code>(More details in serverevents)</code></summary>
</details>
