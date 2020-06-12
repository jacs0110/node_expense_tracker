## Expense Tracker

This is a web appliaction built by Node.js, Express.js, PostgreSQL and basic CRUD and user login functions. You can also visit this app at [https://expense-tracker-0707.herokuapp.com/](https://expense-tracker-0707.herokuapp.com/)


### Features
1. User can user email or facebook to register on this app
2. User can create, see, update, and delete a catagory
3. User can create, see, update, and delete an expense record
4. User can sort records by month and category
5. User can see total amount 

![Imgur](https://i.imgur.com/UmH78Xl.png)
![Imgur](https://i.imgur.com/YLIBAX0.png)
![Imgur](https://i.imgur.com/GZsAApu.png)
---
### Getting Started
#### Prerequisites/Environment
* "bcryptjs": "^2.4.3",
* "body-parser": "^1.19.0",
* "connect-flash": "^0.1.1",
* "dotenv": "^8.0.0",
* "express": "^4.17.1",
* "express-handlebars": "^3.1.0",
* "express-session": "^1.16.2",
* "heroku-cli": "^7.0.9",
* "method-override": "^3.0.0",
* "mysql2": "^1.6.5",
* "nodemon": "^1.19.1",
* "passport": "^0.4.0",
* "passport-facebook": "^3.0.0",
* "passport-local": "^1.0.0",
* "pg": "^7.11.0",
* "sequelize": "^5.10.1",
* "sequelize-cli": "^5.5.0",

#### Setup the app

1. Clone the project from Github
```
$ git clone https://github.com/jacs0110/node_expense_tracker
```

2. Go to the project folder 
```
$ cd node_expense_tracker
```

3. Install npm packages
```
$ npm install
```

4. Install Postgres and create database "expense_tracker"

```
$ postgres=# CREATE DATABASE expense_tracker
```

5. Edit config.json
```
// /config/config.json

// ...
  "development": {
    "username": [YOUR_USER_NAME],
    "password": null,
    "database": "expense_tracker",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
// ...
```

6. Create models
```
$ npx sequelize db:migrate
```

5. Create .env for facebook login feature
```
// .ent

FACEBOOK_ID=[YOUR_FACEBOOK_ID]
FACEBOOK_SECRET=[YOUR_FACEBOOK_SECRET]
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```
6. Run the server
```
$ npm run dev
```

---
### Authors
[Jacs](https://github.com/jacs0110) / [tsungtingdu](https://github.com/tsungtingdu) (Tim)

Self-taught and trained in software development knowledge and skills, I am passionate about creating changes through technology.

You can find more about me here:
* [Medium](https://medium.com/tds-note)
* [LinkedIn](https://www.linkedin.com/in/tsung-ting-tu/)
* [Teaching Assistant at ALPHA Camp](https://lighthouse.alphacamp.co/users/3247/ta_profile)
