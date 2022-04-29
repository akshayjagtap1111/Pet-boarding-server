# Pet-boarding-server
Pet Boarding site backend server, which provides all basic crud operations, uses authentication, authorisation using JWT ,passport, and uses fussy search, sorting and lot more CRUD operations



the project consist of the two way connection betwwen site admin and user, wherein any person can register himself as a user of the site, after registretion user can book the place for his pet at whatever place they want, which are available on the site, after that comes a role of admin admin should be logged in to site on his dashboard he can see the all requests for pet registretion, where he can accept or reject the request 


## Run Locally

Clone the project

```bash
  For Front-End
  git clone https://github.com/akshayjagtap1111/Pet-Boarding-Site.git
  
  For Back-End
  git clone https://github.com/akshayjagtap1111/Pet-boarding-server.git
```

Deployment link of backend on Heroku
```bash
got to https://pet-care-boarding.herokuapp.com/
```

Install npm packages
```bash
npm install
```

Run the server
```bash
npm run server
```

View in Browser
```
go to https://pet-care-xi.vercel.app/
```

```bash

Base url

https://pet-care-boarding.herokuapp.com/


registretion and authentication routes
 

user register
route =>  /user/register
method => post

admin register
route =>  user/register-admin
method => post

user login
route =>  /user/login
method => post

admin login
route =>  /user/login-admin
method => post


get user profile (user authorised route)

route =>/user/profile
method => get


place-related routes


get all places
route => /pet-place
method => get

querries =>
              to sort by cost          ord1=1 or -1 or ""
              to sort by ratings       ord1=1 or -1 or ""
              to find by city          city=[city name] or ""
              to sort by verification  verified= yes or no or ""
              pagination               page && qty


get single place by id
route => /pet-place/:id
method => get

get single place by name
route => /pet-place/:name
method => get

add place ( admin authorised only)
route => /pet-place/add
method => post


edit place ( admin authorised only)
route => /pet-place/edit/:id
method => patch

delete place ( admin authorised only)
route => /pet-place/edit/:id
method => delete




pet related routs

add pet (user authorised)
route => /pet/add
method => post

 pet approval 
route => /pet/approve/:id
method => patch


delete place ( user authorised )
route => /pet/:id
method => delete

get pets 

route => /all
method => get

route => /approved
method => get

route => /pending
method => get
```

## Technologies we used

In this project we have used the following technologies:

- Nodejs
- React
- Redux
- Expressjs
- MongoDB
- HTML
- CSS
- JavaScript
- env

*All the data got stored in and called from **Mongo Atlas cloud database**.*

## Libraries & Packages Used

- NPM Packages
    - express
    - mongoose
    - jsonwebtoken
    - Passport
    - bcryptjs
    - cors
    - body-parser
    - dotenv
