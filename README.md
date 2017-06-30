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
