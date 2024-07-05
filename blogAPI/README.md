REST API Blog app via TypeScript

This app contains the Apis which are needed for running a blog such as creating new posts,




# Run:
To run the project you need to have the .env file and secrets.ts.
## Create .env 
Create .env file in the root directory and add these parameters with the values:
- DB_NAME:blog
- DB_COLLECTION:post
## Create sercrets.ts
Create sercrets.ts in the root directory and ..
- username
- password


# Development
## Database
The database is build by mongodb, and contains some collection.
To view and control the collections better to use Mongosh UI, the online cloud vaersion can be reatch here (https://cloud.mongodb.com/)

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
- Compile the TypeScript code
```
    tsc
```
- Run the server
```
    node server.js
```
