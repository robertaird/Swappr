<img src="https://i.imgur.com/HyT4LZP.png" alt="Drawing" width="400" height="400"/>

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
<object data="https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf">
        <p><a href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf">View PDF</a>.</p>
    </embed>
</object>


## Database Schema
<img src="https://imgur.com/0u8AqVo" alt="Database Schema" width="400" height="400"/>


## Project Set-up
### Getting Started
First thing's first, run `npm install`.
This project uses Postgres, so be sure to have that installed on your system.
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
After the database is initialized, you can `npm start` from the root of the directory to initialize the server.

## Built By:
* Scrum Master: Robert Aird
* Product Owner: Zachary Gagnier
* Team Members: Robert Aird, Zachary Gagnier, Patrick Brown

## Built With:
 - [Vue](https://vuejs.org/) - Framework that Swappr is built on
 - [PostgreSQL](https://www.postgresql.org) – Database that Swappr uses
 - [DigitalOcean](https://www.digitalocean.com/) - Where Swappr is deployed currently
 - [Auth0](https://auth0.com/) - Authentication Service
 
 <img src="https://imgur.com/vfzda0W" alt="Tech Stack" width="400" height="400"/>

## FAQ
### Do I need to sign up for an account?
We use Auth0 for our authentication which signs in using a Google account. If you would like to sign into the service you'll need to create an account for it.
###  Can I offer multiple items for the same item? 
As of right now, you can only engage in a 1 to 1 trade.
## Support
[LogoMakr](https://logomakr.com/) - Assisted in creating the logo