Introduction
The Book Collection API allows users to manage a collection of books. It provides user authentication using JWT (JSON Web Tokens) to secure the API endpoints, ensuring only authenticated users can perform CRUD operations on books.

Requirements
Setup:

Initialize a new Node.js project.
Use Express.js as the framework for building the API.
Set up a MongoDB database to store book data.
Authentication:

Implement user authentication using JWT.
Users can register, log in, and log out.
API Endpoints:

POST /api/register: Register a new user.
POST /api/login: Log in an existing user.
POST /api/logout: Log out the currently authenticated user.
GET /api/books: Retrieve a list of all books.
GET /api/books/:id: Retrieve details of a specific book.
POST /api/books: Add a new book to the collection.
PUT /api/books/:id: Update details of a specific book.
DELETE /api/books/:id: Delete a book from the collection.
Book Schema:
Each book has fields for title, authors, genre, and publication year.

Getting Started
Prerequisites
Before getting started, make sure you have the following installed:

Node.js
npm (Node Package Manager)
MongoDB
Installation
Clone the repository:https://github.com/mohithguddandra/bookcollection.githttps://github.com/mohithguddandra/bookcollection.git

Change to the project directory:
cd book-collection-api

Install dependencies:
npm install

Configuration
Start the server:npm run dev 

Authentication
User authentication is implemented using JSON Web Tokens (JWT). Users can register, log in, and log out. Secure your API endpoints by requiring a valid JWT token for access.

API Endpoints
User Management
POST /api/register/: Register a new user.
POST /api/login/: Log in an existing user.
POST /api/logout/: Log out the currently authenticated user.

Books
GET /api/books/: Retrieve a list of all books.
GET /api/books/:id: Retrieve details of a specific book.
POST /api/books/: Add a new book to the collection.
PUT /api/books/:id: Update details of a specific book.
DELETE /api/books/:id: Delete a book from the collection.

Book Schema
Each book in the collection has the following fields:

title: The title of the book.
authors: The authors of the book.
genre: The genre of the book.
publicationYear: The publication year of the book.
