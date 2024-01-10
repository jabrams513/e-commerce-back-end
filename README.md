# E-Commerce Backend
E-commerce backend with Express.js API and configured to use Sequelize to interact with a MySQL database.

## Purpose
This application serves as the backend for an E-Commerce website. The server is built using Express.js, and MySQL is employed as the database, with Sequelize serving as the Object-Relational Mapping (ORM) tool for executing SQL models and queries.

## User Story

AS A manager at an internet retail company

I WANT a back end for my e-commerce website that uses the latest technologies

SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria

GIVEN a functional Express.js API

WHEN I add my database name, MySQL username, and MySQL password to an environment variable file

THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands

THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application

THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia Core for categories, products, or tags

THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia Core

THEN I am able to successfully create, update, and delete data in my database

## Usage
- The application requires Node.js and MySQL for proper functioning
- To install the necessary dependencies, navigate to the root directory and execute the following command:
>    `npm i`

This application operates locally under MySQL. You can customize the .env file with your own username and password to initiate the application.

Post-installation:
- To create, sync, and seed data:
    - Run mysql -u root -p in the terminal and log in to your MySQL shell using your password
    - Execute source `db/schema.sql` in the MySQL shell
    - Run `npm run` seed in the terminal
- Functionality:
    - Execute `npm start` in the terminal to launch the server
    - Utilize [Insomnia](https://insomnia.rest/download) to interact with various routes.

## Screenshot
Please refer to the following video link(s) as a reference for the application's appearance and functionality:

[E-Commerce Backend Demo Video](https://app.screencastify.com/v2/watch/AU5PctfzrnmaSPCtfOeY) <br/>

## Code Sources and Collaborators
I had the opportunity to collaborate with my peers Kenny and Mustapha. We checked our work with one another.

In addition, I received feedback from my instructor, Diego, my TA, Andrew, as well as my tutor, Corey.

All code used was self-generated or otherwise gathered from class materials.