## Introduction

The TechMates(Tech Tips & Tricks) project is a dynamic full-stack web application designed to assist tech enthusiasts in mastering the ever-evolving technology landscape. Users can explore expert advice, share personal tech experiences, and contribute user-generated content on various topics including troubleshooting common tech issues, software reviews, gadget insights, and practical digital solutions. <br/>

**The platform features**

- User Registration & Authentication: : Customizable experience with user profiles. <br>
- Premium Content Options : Access to exclusive tips through integrated payment. <br>
- Upvoting & Community Interaction : Users can upvote valuable posts and engage with other tech enthusiasts. <br>
- Following System : Users can follow, unfollow other tech enthusiasts. <br>
- Content Analytics : Users can view detailed analytics on votes, comments, views on the User Profile.<br>
- Admin Dashboard : Comprehensive management of posts, user data, and system settings.<br>

## Steps

1. Clone the Repository --- https://github.com/keyamoni05866/techmates-server <br>
2. Install Dependencies. --- npm install <br>
3. Set up the Env variables:<br>

- Create a .env file in the root directory.
- Add the following environment variables:<br>
  PORT=5000<br>
  DATABASE_URL= The connection string for your MongoDB database.<br>
  JWT_ACCESS_SECRET=use your secret<br>
  JWT_ACCESS_EXPIRES_IN= use expiration time<br>
  JWT_REFRESH_SECRET=use refresh secret<br>
  JWT_REFRESH_EXPIRES_IN=use expire time<br>
  STORE_ID=amarpay store id<br>
  SIGNATURE_KEY= amarpay signature key<br>
  PAYMENT_URL=payment url<br>
  PAYMENT_VERIFY_URL=payment verify url<br>

## Running the server

-in package.json file there is 2 scripts for run the server.example:<br>

- start:prod(this is for javascript file ).<br>
- start:dev(this is for typescript file).<br>

## Live Link-

https://car-rental-reservation-server-three.vercel.app/
