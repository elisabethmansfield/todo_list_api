Start
    1. update node to latest version using nvm or 7.6+: `nvm install 10.13.0` or `nvm install node --reinstall-packages-from=node`
    2. install global: `npm install --global gatsby-cli nodemon`
    3. install gatsby-site: `npm run gatsby-install`
    - recursively install all node modules subdependencies (recursive-install???)
    4. install: `npm install`


Global:
install gatsby-cli globally: npm install --global gatsby-cli
install mongodb globally?
npm install -g nodemon (or dev dependency?): npm install --global nodemon

- npm install --save dns fs module net tls
- install gatsby dependencies and app dependencies separate commands
- NPM install in gatsby-site and app
GatsbyJS - install globally (gatsby-cli)
NoSQL database: MongoDB (or Couchbase?) - install globally
NodeJS + Express
Typescript
- upgrade node version to 7.6+
- 
Full size of app? Disk space?

------ Part 1: 
Create a Todo List API in Node JS 

Operations the API must provide: 
1. Get the list of all the task of the todo list 
2. Check/uncheck a task 
3. Delete a task 

Technologies: 
NodeJS
Used an NoSQL database 
Build a REST or GraphQL API (GraphQL is the most valued) 
Used Typescript or Flow for type checked the API 
Used ES6/7 features 
Test at least one operation


------- Part 2: 
Create a GatsbyJS website with 3 pages. 

Webpages:
- Page 1: Who you are 
- Page 2: Your previous code project 
- Page 3: Contact page with a form that send data with Zapier Webhooks. 

Technologies:
GatsbyJS (React, Webpack, GraphQL)
Don't waste too much time on design. 
Use styled components for css. 
All texts have to be query from Prismic.
Git


------- Tutorials
* Write GraphQL APIs on Node with MongoDB: https://blog.bitsrc.io/write-graphql-apis-on-node-with-mongodb-f3d0084cbbb8
express-graphql Documentation: https://github.com/graphql/express-graphql
graphql-tools Documentation: https://github.com/apollographql/graphql-tools
graphql Documentation: https://www.npmjs.com/package/graphql
GraphQL and MongoDB - A Quick Example: https://medium.com/the-ideal-system/graphql-and-mongodb-a-quick-example-34643e637e49
^ source code: https://github.com/nmaro/graphql-mongodb-example/blob/master/src/start.js
How to set-up a powerful API with Nodejs, GraphQL, MongoDB, Hapi, and Swagger: https://medium.freecodecamp.org/how-to-setup-a-powerful-api-with-nodejs-graphql-mongodb-hapi-and-swagger-e251ac189649
GRAPHQL-TO-MONGODB, OR HOW I LEARNED TO STOP WORRYING AND LOVE GENERATED QUERY APIS: https://blog.solutotlv.com/graphql-to-mongodb-or-how-i-learned-to-stop-worrying-and-love-generated-query-apis/?utm_source=stackoverflow&utm_medium=47660758
A CRUD app with Apollo, GraphQL, NodeJs, Express, MongoDB, Angular (v5): https://blog.cloudboost.io/a-crud-app-with-apollo-graphql-nodejs-express-mongodb-angular5-2874111cd6a5
Setting up a simple GraphQL Server with Node, Express and Mongoose: https://medium.com/@gethylgeorge/setting-up-a-simple-graphql-server-with-node-express-and-mongoose-ff8a1071af53
* Using GraphQL with MongoDB: https://www.compose.com/articles/using-graphql-with-mongodb/
<Location> with CodeSandbox: https://github.com/gatsbyjs/gatsby/issues/1875

------- mlab.com
To connect using the mongo shell:
mongo ds161653.mlab.com:61653/todo_list_api_db -u <dbuser> -p <dbpassword>

To connect using a driver via the standard MongoDB URI (what's this?):
mongodb://<dbuser>:<dbpassword>@ds161653.mlab.com:61653/todo_list_api_db

owner
dev161653