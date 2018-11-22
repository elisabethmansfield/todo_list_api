# Documentation

## Overview
- Name: **To Do List Application**
- Author: Elisabeth Mansfield
- Version: 1.0.0
- Description: A To-Do list that retrieves data from a NoSQL API.
- Git: https://github.com/elisabethmansfield/todo_list_api.git

## Installation
1. Clone the app using the command line:
	```shell
	git clone https://github.com/elisabethmansfield/todo_list_api.git
	cd todo_list_api
	```

2.	Update Node to a version 7.6+:
	```shell
	nvm install 10.13.0
	```

3. Install dependencies:
	```shell
	npm install --global gatsby-cli nodemon
	npm run install-all
	```

## Application
1. Run the application in **development** mode:
 - Develop the server and GraphQL API (with hot reloading):
    * Note: This uses the production build of gatsby-site (no hot reloading), 
    and any changes to gatsby-site will require the command to be re-run.
	```shell
	npm run start-dev
	```

- Develop only the Gatsby static pages (with hot reloading):
	```shell
    npm run gatsby-dev
	```

2. Run the application in **production** mode:
	```shell
    npm run start
	```

## Testing
1. Test the application:
	```shell
    npm run test
	```

## Technologies
- [Node.js](https://nodejs.org/): Server-side JavaScript runtime environment
- [React](https://reactjs.org/): Front-end user interface JavaScript library 
- [Express](https://expressjs.com/): Web app framework for Node.js
- [GatsbyJS](https://www.gatsbyjs.org/): Static site generator for React
- [GraphQL](https://graphql.org/): Query language for APIs
- [MongoDB](https://www.mongodb.com/): Document-oriented NoSQL database
- [Apollo](https://www.apollographql.com/): Implementation tool for GraphQL 
- [Sass](https://sass-lang.com/): Preprocessor for CSS styles 
- [Zapier](https://zapier.com/): Webhook for HTTP POST messages
- [Jest](https://jestjs.io/): Testing for JavaScript and React

	### Other:
	- HTML
	- CSS
	- JavaScript ES6/7
	- Webpack	
	- RESTful 
	- API
	- Git
