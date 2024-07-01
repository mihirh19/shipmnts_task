# Book Review Platform

This project is a RESTful API for a book review platform with user authentication, review management (CRUD operations), web scraping to gather book data from Open Library's trending books, and a scheduler.

## Vercel deploy url :

https://shipmnts-task-sigma.vercel.app/

## Render Deploy url:

https://shipmnts-task.onrender.com

## Docker hub image

` docker pull mihir2109/shipmnts_book_review`

## Features

1. **User Authentication and Authorization:**

   - User registration and login functionality.
   - JWT (JSON Web Tokens) for securing the endpoints.
   - Only authenticated users can perform CRUD operations on their reviews.

2. **Review Management API:**

   - Create a review.
   - Get all reviews with pagination.
   - Get a single review.
   - Update a review.
   - Delete a review.

3. **Web Scraping:**
   - Extract book data from Open Library's trending books page.
   - Store the scraped data in the database and update the rows if already present.
   - Provide an endpoint to retrieve the scraped book data.

## Endpoints

### User Authentication

- **Register:** `POST /user/register`

  - Request Body: `{ "email": "user1", "password": "password123" }`
  - Response: `201 Created`

- **Login:** `POST /user/login`
  - Request Body: `{ "email": "user1", "password": "password123" }`
  - Response: `200 OK` with JWT token

### Review Management

- **Create a Review:** `POST /reviews`

  - Request Body: `{ "book_id": "OL12345M", "rating": 5, "comment": "Great book!" }`
  - Response: `201 Created` with the created review

- **Get All Reviews:** `GET /reviews?page=1&size=10`

  - Response: `200 OK` with a paginated list of reviews

- **Get a Single Review:** `GET /reviews/{review_id}`

  - Response: `200 OK` with the requested review

- **Update a Review:** `PUT /reviews/{review_id}`

  - Request Body: `{ "rating": 4, "comment": "Updated comment" }`
  - Response: `200 OK` with the updated review

- **Delete a Review:** `DELETE /reviews/{review_id}`
  - Response: `204 No Content`

### Book Data

- **Get Books:** `GET /books?page=1&size=10`
  - Response: `200 OK` with a list of books

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-review-platform.git
   cd book-review-platform

   ```

2. Create a .env file in root folder:

   ```env
      PORT=3000
      DATABASE_URI=your_database_url
      JWT_SECRET=your_jwt_secret

   ```

3. Install dependencies:
   ```
   npm i
   ```
4. run app:
   ```
   npm start
   ```
