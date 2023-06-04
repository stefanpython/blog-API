# blog-API

Blog admin interface [here](https://github.com/stefanpython/blog-admin-api)
Blog user interface [here](https://github.com/stefanpython/blog-user-api)

This is a RESTful API for a blog application. It provides endpoints for managing users, posts, and comments.

## Features

- User management: Sign up, login, and logout functionality.
- Post management: Create, read, update, and delete blog posts.
- Comment management: Add, read, update, and delete comments on blog posts.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **JSON Web Tokens (JWT)**: Securely transmit information between parties as a JSON object.

## Installation

1. Clone the repository:
   git clone https://github.com/stefanpython/blog-API.git

2. Install dependencies:
   cd blog-api
   npm install

3. Configure the environment variables:

- Create a .env file in the root directory.
- Define the following variables in the .env file:
  PORT=3000
  MONGODB_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>

4. Start server:
   npm start
