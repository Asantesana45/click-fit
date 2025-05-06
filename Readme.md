Click fit is modern, interactive and Responisive fitness website. 
This website features a drag and drop image upload system where the images are managed by the server and are uploaded to 'upload_images' folder found within the Project structure of this project. 

BACKEND & MySQL TASKS:
[1] I used the following SQL script below to create 'users' table with the specified columns as per the instructions given:
First: I created a  database called 'click_fit_db' using below SQL script:

       CREATE DATABASE click_fit_db;
       USE click_fit_db;

Second: Then, I created 'users' table with the specified columns using below script:

CREATE TABLE users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);


[2] To Create Stored Procedure `addUser` I used the following SQL:
DELIMITER //

CREATE PROCEDURE addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, 1);
END //

DELIMITER ;

The SQL Above does the following:
- Defines a stored procedure `addUser` to insert a new user.
- Takes `email`, `password`, and `type` as parameters.
- Sets `active` to 1 by default.


[3]Then, I wrote a call to stored procedure `addUser` that inserts a new user, I wrote and ran the following SQL to insert a sample user.

CALL addUser('john.doe@example.com', 'securePass123', 'member');

It inserts a user with email, password and type.



PREREQUISITES:
-Node.js(v14 or higher).
-npm(v6 or higher)

INSTALLATION:
1. Clone the Repository
   git clone https://github.com/your-username/click-fit.git
   cd click-fit

2. Install Dependencies
   npm install

USAGE:
1. Start the Server:
   npm run dev

2. The server runs on The server runs on http://localhost:3000
3. Open http://localhost:3000 in a browser to access the website.


TECHNOLOGIES USED:
Frontend:
  - HTML5, CSS3 (Bootstrap 5.3.2 for layout)
  - JavaScript (jQuery 3.6.0 for DOM manipulation)

Backend:
  - Node.js with Express.js (4.18.2) for server and API
  - Multer (1.4.5-lts.1) for file uploads
  - CORS (2.8.5) for cross-origin requests

API:
Numbers API: `http://numbersapi.com/1/30/date?json`
