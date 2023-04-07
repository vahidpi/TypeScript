Create a simple REST API using TypeScript and Express that allows users to create, read, update, and delete blog posts. Each blog post should have a title, content, and author. Use a MongoDB database to store the blog posts. Implement authentication using JWT tokens and allow only authenticated users to create, update, and delete blog posts. Write unit tests to ensure that each API endpoint is working as expected.




init the project:
Install Node.js and TypeScript
    npm install -g typescript
Create a new project
    npm init
Install Express and other required packages
    npm install express body-parser cors

    express is the web framework for Node.js that we'll use to create the API.
    body-parser is a middleware that allows us to parse incoming request bodies in a middleware before the handlers.
    cors is a middleware that allows cross-origin resource sharing.
Write your code
    server.ts
Compile the TypeScript code
    tsc
Run the server
    node server.js

Install Mongodb dependencies 
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
    npm install express mongoose @types/express @types/mongoose
MongoDB via Docker 
    docker pull mongo:latest
    docker run --name my-mongo -p 27017:27017 -d mongo

Install swagger
    npm install swagger-ui-express swagger-jsdoc
Install JWT
     npm install jsonwebtoken express-jwt
    To call:
        after /login and having correct token
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },



curl  http://localhost:3000/
curl -X POST http://localhost:3000/api 







Project structure:

backend
│
└─── dist                   #all the javascript files are here
└─── lib                    #all the typescript files are here
      └─── config           #app configurations files
            └─── app.ts     #app starting point            
      └─── controllers      #request managers
      └─── modules          #schemas, interfaces, services
      └─── routes           #define the endpoints
      └─── environment.ts   #store all environment variables
      └─── server.js        #HTTP server that listens to server port
└─── .gitignore             #git ignore file
└─── package-lock.json      #npm automatically generated document
└─── package.json           #holds metadata and npm packagage list
└─── tsconfig.json          #specify the root level files and the compiler options

Create a src folder: This folder will contain all the source code for your application. All other folders will be inside this folder.

Create a config folder: This folder will contain configuration files for your application. For example, you could have a database.ts file which will contain your database connection information.

Create a routes folder: This folder will contain all your API endpoints. You can create a separate file for each endpoint or group them by functionality. For example, you could have a blog.ts file that contains all the endpoints related to blog posts.

Create a controllers folder: This folder will contain the logic for handling requests made to your API. You can create a separate file for each endpoint or group them by functionality. For example, you could have a blogController.ts file that contains all the logic related to blog posts.

Create a models folder: This folder will contain your database models. You can create a separate file for each model or group them by functionality. For example, you could have a postModel.ts file that contains the definition for your blog post model.

Create a middlewares folder: This folder will contain any middleware functions you may need. Middleware functions are functions that run before the main logic of your endpoint. For example, you could have a auth.ts file that contains middleware functions for authenticating users.

Create a utils folder: This folder will contain any utility functions that may be used throughout your application. For example, you could have a logger.ts file that contains functions for logging messages.

Create a dist folder: This folder will contain the compiled TypeScript code that can be run on a Node.js server. You can use a tool like tsc to compile your TypeScript code into JavaScript code.



Unit testing:
====
Install jest:
    npm install --save-dev jest



Env.
===
    .env
    npm install dotenv