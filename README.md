<p align="center">
<img src="https://i.imgur.com/HyT4LZP.png" alt="Drawing" width="400" height="400"/>
</p>

# Swappr
##### *Item trading made easy*
## Deployed Site
You can find Swappr running [here](http://104.236.12.220:8080/)
## What is it?
Swappr is an app for item swapping. Items are traded by just a name and a description. The user can either reject the trade or accept it, offering their own item in exchange. If there is a match, they are given info about the other person to set up a trade.
## Using Swappr
__Signing in:__ You’ll first be brought to a sign in page where it’ll ask for you to log into your Google account. After you do that, you’ll be directed to our main page which will refer you to our adding process
__Add Items:__ Once you sign in, you’ll need to add some items to get started, simply follow the directions by adding a name and description to the items you’re willing to swap. If there is a group of items together you want to trade, you’ll need to have it under one listing.
__Check Offers:__ After you have your own listings set up, you can now see what other people in the area have to trade, you can either click “Wanna Trade?” to offer something of your own to trade, or click “No Thanks” to get the next listing.
__Trade Items:__ If someone has approved of the same offer then you’ll get a message finalizing the trade. If approved by both parties you’ll be given contact information to reach them so you can make the trade.

## Project Wireframe

<a href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf">
<img alt="Wire Frame" src="https://i.imgur.com/OfEprst.png" width="600" height="400">
</a>

## Database Schema
<img src="https://i.imgur.com/0u8AqVo.png" alt="Database Schema" width="600" height="400"/>


## Project Set-up
### Getting Started
First thing's first, run `npm install`.
This project uses Postgres, so be sure to have that installed on your system.
You'll find a file called `auth0-variables.example.js` inside the `src/Auth` folder. Copy this to `auth0-variables.js`. You will need an account with Auth0. Fill the file out with your relevant information.
### Initializing the Database
Inside the app/config folder is a `config.example.json` file. Rename or copy this to `config.json`, and enter your credentials for your Postgres database.
Once your database is set up, you will need to use the Sequelize CLI to initialize everything.
Run the following commands from inside of the `app` folder using your command line interface of choice:
```
sequelize db:migrate
```
```
sequelize db:seed:all
```
If 'sequelize' is not a command, you may need to install the sequelize-cli globally. Otherwise, your database should be ready to go!
### Running Swappr
To run Swappr in Dev mode, run `npm start`. This will start a webpack dev server as well as the API server, allowing for hot reload.

This CAN lead to some finicky issues now and then with the hot reload, and if you find this is the case, run `npm run server` and `npm run dev` in separate terminals.
### Building for Production
To build Swappr for production, first run `npm run build`. This will minify and concat all of the files in /src. Afterwards, all that's left to do is run `npm run start:prod` and you should be up and running!

## Built By:
* Scrum Master: Robert Aird
* Product Owner: Zachary Gagnier
* Team Members: Robert Aird, Zachary Gagnier, Patrick Brown

## Built With:
 - [Vue](https://vuejs.org/) - Framework that Swappr is built on
 - [PostgreSQL](https://www.postgresql.org) – Database that Swappr uses
 - [DigitalOcean](https://www.digitalocean.com/) - Where Swappr is deployed currently
 - [Auth0](https://auth0.com/) - Authentication Service

 <img src="https://i.imgur.com/vfzda0W.png" alt="Tech Stack" width="600"/>

## FAQ
### Do I need to sign up for an account?
We use Auth0 for our authentication which signs in using a Google account. If you would like to sign into the service you'll need to create an account for it.
###  Can I offer multiple items for the same item?
As of right now, you can only engage in a 1 to 1 trade.
## Support
[LogoMakr](https://logomakr.com/) - Assisted in creating the logo
