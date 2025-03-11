REST API Blog app via TypeScript

This app contains the Apis which are needed for running a blog such as creating new posts,




# Run:
To run the project you need to have the .env file and secrets.ts.
## Create .env 
Create .env file in the root directory and add these parameters with the values:
- DB_NAME=blog
- DB_COLLECTION=post
- DB_CLUSTER_URL=cluster0.bsyzi4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Install dotenv:
```
    npm install dotenv
```
## Create sercrets.ts
Create sercrets.ts in the root directory and ..
```
export const secrets = {
    username: 'admin',
    password: '773',
    dbUserName: 'mongo',
    dbPassword: '773',
    authSecret: 'your_auth_secret', // Add this line to include the auth secret
    blogTestUser:'vp',
    blogTestPassword:'773'
  };
```
## Build
To run and build the project, needs to install Node.js and TypeScript
- To check the version of Node.js:
```
    node -v
```
- To check the version of TypeScript:
```
    tsc -v 
```
- Install TypeScript
```
    npm install -g typescript
```
- Install libraries
```
    npm install express-jwt
    npm install mongodb
```
- Compile the TypeScript code
```
    tsc
```
- Run the server
```
    node ./dist/lib/server.js
```
You should see a message that the application has started:
```sh
    Blog API started at http://localhost:3000
```

# Development
## Database
The database is build by mongodb, and contains some collection.
To view and control the collections better to use Mongosh UI, the online cloud vaersion can be reatch here (https://cloud.mongodb.com/)







npm install swagger-ui-express swagger-jsdoc @types/swagger-ui-express @types/swagger-jsdoc


Test:
    npm test