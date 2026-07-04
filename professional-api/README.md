# Professional API

This project is a REST API built with Node.js, Express, and MongoDB for the CSE341 Individual Activity: Develop an API.

## Project Structure

```
professional-api/
│
├── controllers/
│   └── professional.js
│
├── data/
│   └── database.js
│
├── routes/
│   ├── index.js
│   └── professional.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Technologies Used

- Node.js
- Express
- MongoDB Atlas
- dotenv

## Installation

### 1. Clone or download the project

```
cd professional-api
```

### 2. Install dependencies

```
npm install
```

### 3. Configure the `.env` file

Example:

```
PORT=8080

MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/porfolio?retryWrites=true&w=majority&appName=Cluster0

DATABASE_NAME=porfolio

COLLECTION_NAME=professional
```

Replace:

- `YOUR_USERNAME`
- `YOUR_PASSWORD`
- `YOUR_CLUSTER`

with your MongoDB Atlas credentials.

### 4. Create the MongoDB database

Database name:

```
porfolio
```

Collection name:

```
professional
```

Insert one document into the collection.

Example:

```json
{
  "professionalName": "Lucky Eni",
  "base64Image": "YOUR_BASE64_IMAGE_STRING",
  "nameLink": {
    "firstName": "Lucky",
    "url": "https://www.linkedin.com/in/your-profile"
  },
  "primaryDescription": " is a Software Development student.",
  "workDescription1": "I enjoy building full-stack applications using Node.js, Express, and MongoDB.",
  "workDescription2": "I enjoy learning backend development and creating REST APIs.",
  "linkTitleText": "Professional Links",
  "linkedInLink": {
    "text": "LinkedIn",
    "link": "https://www.linkedin.com/in/your-profile"
  },
  "githubLink": {
    "text": "GitHub",
    "link": "https://github.com/your-username"
  }
}
```

## Running the Project

Start the server:

```
npm start
```

or

```
npm run dev
```

The server runs on:

```
http://localhost:8080
```

## Available Endpoints

### Home

```
GET /
```

Response:

```json
{
  "message": "Professional API is running."
}
```

### Professional Data

```
GET /professional
```

Response:

```json
{
  "professionalName": "...",
  "base64Image": "...",
  "nameLink": {},
  "primaryDescription": "...",
  "workDescription1": "...",
  "workDescription2": "...",
  "linkTitleText": "...",
  "linkedInLink": {},
  "githubLink": {}
}
```

## Testing

1. Start the Node server.

2. Open your frontend `index.html`.

3. The frontend automatically requests:

```
http://localhost:8080/professional
```

4. If the API and MongoDB are configured correctly, your profile information will be displayed in the browser.

## Stretch Challenge

This project completes the MongoDB Stretch Challenge by:

- Connecting to MongoDB Atlas
- Reading data from the `porfolio` database
- Retrieving the first document from the `professional` collection
- Returning the data through the `/professional` REST endpoint

## Author

Lucky Eni