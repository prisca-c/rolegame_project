# rolegame-project

This is a project for a role-playing game. It is a work in progress.
To make this project work, there is 2 folders:
- `backend` : Which contains the api needed to get all the infos from the database. (php / slim framework)
- `frontend` : Which contains the frontend of the game (ReactJS)

## How to install

When you clone the project, you need to install the dependencies for both the backend and the frontend.

### Backend

To install the backend, you need to go to the `backend` folder and run one of the following command:

    - composer install
    - php composer.phar install

### Frontend

To install the frontend, you need to go to the `frontend` folder and run one of the following command:

    - npm install
    - yarn install

It's very important to create a .env file in the `frontend` folder. This file will contain the api url needed for the project to work. You can find an example of this file in the `frontend` folder, named `.env.example`.

## How to run

### Backend

Depends on your environment, if you have a web server, you can just put the `backend` folder in your web server folder and access it from your browser.

If you don't have a web server, you can run the following command:

    - php -S localhost:8080 -t public /index.php

### Frontend

To run the frontend, you need to go to the `frontend` folder and run one of the following command:

    - npm start
    - yarn start


## Which database is used?

The database used is a MySQL database. You can find the database as a SQL file in the `backend` folder.
It's very important to keep the same name for the database, the tables and the columns.
It's also very important to keep the same structure in columns. (exemple: `events` have a column `description` which have a specific structure)
