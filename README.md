# SPA
This project is CRUD Single Page Application (SPA), made with .NET at backend and React at frontend. The application is kind of phone book, containing contacts with 
required name, email, category and password. Surname, phone number date of birth and subcategory of contact are optional. I added possibility to programmatically 
define categories and subcategories in database (I didn't create CRUD functions for it, because it had no sense). Category of contact must be one of the defined ones, 
and subcategories can be defined by user, if there is no predefined ones for this category.
![creation page](https://github.com/evgenius081/SPA/blob/main/images/creation.jpg)
Each contact is a user, who can log in using his email and password, but email can't be unique. The problem is, that people can share on email, but they still have different passwords. On the other hand, if they will have same passwords, there will be collision and the first stored in database user will be logged in (I guess). But all this has no sense, because it has no difference what user is logged in :). As it's CRUD-application, you can create, delete and edit 
contacts.

![application view for logged in](https://github.com/evgenius081/SPA/blob/main/images/logged.jpg)

Creating, editting and deleting contacts is available only if you're logged in. If you're not, you can only see a table with minified contacts' info. 

![application view for unlogged in](https://github.com/evgenius081/SPA/blob/main/images/unlogged.jpg)

On click on table element it expands and shows all contact info. If field is empty, there will be drawn a black rectangle (imo it's very stylish).

![expanded contact](https://github.com/evgenius081/SPA/blob/main/images/expanded.jpg)

## Serverside
Server side of application was created using ASP.NET MVC Framework 6.0. Serverside application is not complicated and does not have views, because I'm using React 
application instead of them, thats why controllers (there is only one actually xD) have only actions responding on fetch requests from React components. 

Used packages:
- EntityFramework 6.0.6

  This package allows mapping database rows on entities and entities on objects. Also used its subpackage Sqlite, which allows to use SQLite database 
(Database/applicationDatabase.db).
- SpaProxy 6.0.4

  Server side of application runs separate proxy server with Node.js, where client side is runned.
- Authentication 6.0.6

  Addes JWT tokens, used to set sessionStorage token on client side (Honestly speaking, I used it from one of my previous projects connected with cybersecurity).

## Clientside
Client side is created using React and Node.js 16.16.0. In general, it's not very complicated React application, using states to transfer data between components. If you want some details, please read note \#1 ;)

Additional packages on client side are bootstrap for nice UI, and FontAwesome, for the same reason (addes pleasant icons).
## Start-up
Using MS Visual Studio or Jetbrains Rider Projects:
1. Open SPA.sln file
2. Run solution using SPA IIS or SPA configuration

Works on MS Visual Studio 2022, Rider Projects 2021.3.4. I saw that Visual Studio 2019 can't start this project properly. 

## Notes
1. Implementation details are stored in code comments, if something is not understandable, please contact me.
2. I found one major bug: alerting system on client side is made using states of components, thats why when an alert disappears, current page's state updates, what 
causes rerendering of the page (at list I think so), what is a little annoying. Hope it won't bother you :)
