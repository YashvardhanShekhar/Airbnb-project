# Airbnb Project

## Overview
This project is a web application for managing Airbnb-like rental listings and user interactions. It is built using JavaScript, EJS (Embedded JavaScript), and CSS for front-end and back-end development. The repository includes functionality for user authentication, listing management, and cloud integration.

## Features
- User authentication and session management
- Create, read, update, and delete (CRUD) operations for listings
- Integration with cloud services (e.g., image storage)
- Dynamic views using EJS templates

## Technologies Used
- **Front-end**: EJS, CSS
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Cloudinary (for image storage)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/YashvardhanShekhar/Airbnb-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Airbnb-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```
5. Start the development server:
   ```bash
   npm start
   OR
   nodemon index.js 
   ```
7. Access the application in your browser at `http://localhost:3000`.

## Project Structure
- **`controllers/`**: Contains logic for handling requests and responses.
- **`models/`**: Database schemas and models.
- **`routes/`**: Application routing logic.
- **`views/`**: EJS templates for dynamic web pages.
- **`public/`**: Static assets like CSS, images, and JavaScript files.
- **`utils/`**: Utility functions for common tasks.

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Contact
For questions or feedback, feel free to reach out to the repository owner or create an issue on GitHub.

