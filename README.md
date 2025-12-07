## README.md
--- a/file:///Users/shrishanth/github-classroom/airtribe-projects/news-aggregator-api-Code-Sevak/README.md
+++ b/file:///Users/shrishanth/github-classroom/airtribe-projects/news-aggregator-api-Code-Sevak/README.md
@@ -1,4 +1,4 @@
 # News Aggregator API
- A RESTful API for aggregating news articles based on user preferences.
+ A RESTful API for aggregating news articles based on user preferences.
 ## Features
 - User authentication (signup, login)
 - Manage user preferences for news categories

    ## Technologies Used
   - Node.js
   - Express.js
   - MongoDB
   - Mongoose
   - JSON Web Tokens (JWT)
   - Axios  
   - dotenv

    ## Setup Instructions
   1. Clone the repository:
      ```bash
      git clone <repository-url>
      ```
   2. Navigate to the project directory:
      ```bash
      cd news-aggregator-api
      ```
   3. Install dependencies:
      ```bash
      npm install
      ```
   4. Create a `.env` file in the root directory and add your environment variables:
      ```bash
      touch .env
      ```
      Add the following variables to the `.env` file:
      ```
      PORT=5000
      MONGODB_URI=<your-mongodb-uri>
      JWT_SECRET=<your-jwt-secret>
      NEWS_API_KEY=<your-news-api-key>
      ```
   5. Start the development server:
      ```bash
      npm run dev
      ```

    The server should now be running on `http://localhost:3000`.

    ## API Endpoints
   - `POST /api/user/signup` - User signup
   - `POST /api/user/login` - User login
   - `GET /api/user/preferences` - Get user preferences
   - `PUT /api/user/preferences` - Update user preferences
   - `GET /api/news/` - Get news articles based on user preferences     

