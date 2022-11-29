# CS50 Final Project - NoteApp

The project is a mern stack website where users can create, read, update, and delete notes. The implementation is fairly simple, to keep the project scope in check. I wanted to make a project like this to expand my knowledge of Node JS and of techniques like authentications, Routing, database (with ODM) etc.

##### Technologies used:

###### Backend:

- NodeJS (Runtime enviroment to JavaScrit)
- ExpressJS (Framework for backend)
- bcryptjs (Package to hash & encode the passwords)
- JWT (Package to generate token for login and registered users)
- Validator (Package to validate the inputs)
- Other libraries or packages

###### Frontend:

- React (JavaScript framework for client side)
- React router dom (Package for managing the routing)
- Material UI (CSS framework)
- Framer motion (Animation library for react)
- Redux (state management library)
- Other libraries or packages

##### How the website works?

The idea is simple. The user can register or login (If the user already has an account). During registration you need to enter these fields:

- Name (It can be anything, but can noot be empty)
- Email (Email can only registered one time & should be a valid Email & can not be empty)
- Password: must be at least 8 symbols long conatins letters (Uppercase and lowercase), numbers, symbols and is hashed after checks are done

After the registration process, the website will direct the user to the home page, then the user can create a note by navigate to the create note page, or can view and update a note, or delete a note

#### Routing

There are two types of routes, unprotected routes (register & login), and protected routes (all the pages related to the notes, the user can not view them if he is not logged in), this routing system is on both the backend and the frontend

#### Authentication

The website uses json web token to confirm that user is verified user or not. Once the user registered or logged in, his credentials are checked with bcrypt and generate a token with JWT library. With this token the user can use the website and with every request the token get verified to check if it from a valid user or note

#### Database

Database stores all the users and notes, every note has a userID to connect it to its user. in this website i used NoSql database which is MongoDB with ODM.

##### How to launch application:

1. Check that you have Node version 8+
2. Clone the code: `git clone https://github.com/Amr-Salman/NoteApp-CS50-final-project.git`
3. Run command prompt in the folder and run `npm install` to install all dependencies
4. In the backend folder: create .env file and store the PORT=5000, MONGO_URI=your-mongo-connection-string, JWT_PRIVATE_KEY=your-random-generated-key-for-JWT
5. Once installed run command `npm start` in both folders, backend and frontend
6. In your browser go to localhost:3000
7. You are ready to go!
