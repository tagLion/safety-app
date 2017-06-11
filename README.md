# GetMeSafe
> A site that redirects users to the nearest open and publicly accessible locations. Also sends emergency alerts with a map of user's location to emergency contacts. 
## Build Setup
``` bash
# install dependencies
npm install

# setup local database
createdb getmesafe
knex migrate:latest

# serve locally via localhost:3000
npm start
```
## Team Name
tagLion

## Group Members
Anita Khedkar
Matt Moyer
Thomas Castleman
Bill Boughton

## Project Description
Application to help people in distress find the nearest accessible public location.  Send info to contacts if in emergency.  App tracks their location every 15 seconds and stores in database and sends a text to emergency contacts every 5 minutes with latest update.

## Who uses it?
People who feel threatened, unsafe, needing help who don't where to go/lost.  Emergency contacts to track friends.    

## What outputs do they need?
Directions to a Safe Place

## What inputs are needed to generate those outputs?
Login
Location
Emergency Contact (sending option checked on default)


## What technologies do you plan to use?
* List libraries/frameworks you plan to use
-node.js
-express
-postgresql
-stormpath
-knex
-helmet
-html/css/scss
-bootstrap
-jquery
-Google Maps/GeoLocation
-SendGrid/Twillio/mailgun as a text/email API




## Feature list
* List all features in priority order (including stretch features)
-login/register page
-facebook/google login integration
-shows you open and accessible locations near you
-send a text/email to emergency contacts in Emergency
-post descriptions of why you used the Application
-Keep a log of times and locations used
-Add/edit/delete/list emergency contacts
-Once someone hits the button 'start' the app will keep track of their location every 15 seconds via GPS and store that in a table to bring up on a map for later review/record. After a few minutes ()
-Guest mode - simply find an open location near me.
-login mode (via google/facebook) where enter in your contact info and emergency contacts  
-Emergency Contact - be able to log in to view their friends location.
-STRETCH GOAL - distress heat map
-STRETCH GOAL - temporary guest mode tracking via gps and saving for view while still in an open browser window. 
-STRETCH GOAL - send a text every two minutes based on location until told to stop
