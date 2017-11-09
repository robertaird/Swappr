<img src="https://i.imgur.com/HyT4LZP.png" alt="Drawing" width="400" height="400"/>

# Swappr
##### *Item trading made easy*

## What is it?
Swappr is a website to make trading items easy. Instead of sending out personalized messages every single time you want to trade something, you can simply choose whether or not you want the item, and respond with what you’re willing to trade for it. If both parties agree they can feel free to contact each other to trade.

## Using Swappr
__Signing in:__ You’ll first be brought to a sign in page where it’ll ask for you to log into your Facebook account. After you do that, you’ll be directed to our main page which will refer you to our adding process.
__Add Items:__ Once you sign in, you’ll need to add some items to get started, simply follow the directions by adding a name and description to the items you’re willing to swap. If there is a group of items together you want to trade, you’ll need to have it under one listing.
__Check Offers:__ After you have your own listings set up, you can now see what other people in the area have to trade, you can either click “Wanna Trade?” to offer something of your own to trade, or click “No Thanks” to get the next listing.
__Trade Items:__ If someone has approved of the same offer then you’ll get a message finalizing the trade. If approved by both parties you’ll be given contact information to reach them so you can make the trade.

## Built By:

* Scrum Master: Robert Aird
* Product Owner: Zachary Gagnier
* Team Members: Robert Aird, Zachary Gagnier

## Built With:

 - [Vue](https://vuejs.org/) - Framework that Swappr is built on
 - [PostgreSQL](https://www.postgresql.org) – Database that Swappr uses
 - [DigitalOcean](https://www.digitalocean.com/) - Where Swappr is deployed currently

## Project Wireframe

<object data="https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf">
        <p><a href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/honeybadgerhackers/Swappr/master/docs/swappr-wireframe.pdf">View PDF</a>.</p>
    </embed>
</object>

## Project Set-up

### Getting Started
First things first, run npm install.

This project uses Postgres, so be sure to have that installed on your system.

### Initializing the Database
Inside the app/config folder is a config.example.json file. Copy this to config.json, and enter your credentials for your Postgres database.

Once your database is set up, you will need to use the Sequelize CLI to initialize everything.

Run the following commands from inside of the `app` folder using your command line interface of choice:

```
sequelize db:migrate
```

```
sequelize db:seed:all
```

If 'sequelize' is not a command, you may need to install the sequelize-cli globally. Otherwise, your database should be ready to go!

## FAQ

### Do I need to sign up for an account?
We use Facebook for our authentication to reduce the chance of any fraudulent transactions. We plan on adding other ways to sign in soon but until then you can log in through your own Facebook account.

### What kind of items can I trade?
You are allowed to trade any physical goods right now, we will decide if we will allow things like services soon.

###  Can I offer something else for the same item? 
Right now you can only offer the items you had available in your list at the time of the offer. We may change this later but this also helps to have people only trade the things they do want to trade.

## Support
[LogoMakr](https://logomakr.com/) - Assisted in creating the logo

