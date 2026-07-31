# Library Management API

## Project Description

Library Management API is a REST API built with:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication


The API manages:

- Books
- Authors
- Users


## Features

- User registration
- User login
- JWT authentication
- Protected API routes
- CRUD operations
- Data validation
- Error handling
- Swagger API documentation



# Installation


Clone repository:

```bash
git clone YOUR_GITHUB_URL
```


Install dependencies:

```bash
npm install
```



## Environment Variables

Create `.env`:


```
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```



## Run Application


Development:

```bash
npm run dev
```


Production:

```bash
npm start
```



# Swagger Documentation

Local:

```
http://localhost:3000/api-docs
```



Deployment:

```
https://your-render-url.onrender.com/api-docs
```



# Authentication


## Register

```
POST /auth/register
```


Example:

```json
{
 "username":"admin",
 "email":"admin@gmail.com",
 "password":"password123"
}
```



## Login

```
POST /auth/login
```


Example:

```json
{
 "email":"admin@gmail.com",
 "password":"password123"
}
```


Copy the returned JWT token.


Click Swagger:

```
Authorize
```


Enter:

```
Bearer YOUR_TOKEN
```



# Protected Routes


## Books

```
GET /books

POST /books

PUT /books/:id

DELETE /books/:id
```



## Authors


```
GET /authors

POST /authors

PUT /authors/:id

DELETE /authors/:id
```



# Database Collections


MongoDB Database:

```
libraryDB
```


Collections:


```
books

authors

users
```



# Deployment

Hosted using Render.

Required environment variables:

```
MONGODB_URI

JWT_SECRET

PORT
```

