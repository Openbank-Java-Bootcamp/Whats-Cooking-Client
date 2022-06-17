# What's Cooking? Client

In the past, recipes were passed down through families on hand-written cards or gathered in cookbooks with notes jotted in the margins.
Now you can share all of your favorite recipes with loved ones near and far. Don’t forget to include the secret ingredient!

What's Cooking? is a recipe management app that allow you to share your recipes with others. 

A user can create an account and add their own recipes to share. From the Recipes Page a user can view all of the recipes that have been added to the app and can save any recipe to their own cookbook. 

A user can also make a personal note on any recipe, ex. "Add less salt" or "Bake longer next time". This note is only viewable to the viewer.

Other user's cookbooks can also be viewed by clicking on the "Added by:" on the recipe's details page. 

View the trello board: https://trello.com/b/nzXCoDvl/whats-cooking-app 
## Setup

Start the API server first (see repo for What's Cooking? Server)

Need to run command npm install first
```bash
npm install 
```

Use command npm start to start the app.
```bash
npm start
```

## Technologies Used
SPA frontend built with React.

## Components and Pages Structure
The Home page is what anyone not logged in can see. From here the Login page and Signup page can be accessed.

Once a user has logged in they can view the Recipe List page which dispays all of the recipes any user has added. This page has a search bar feature in which the user can search recipe title and ingredients for keywords.

The cookbook page is also viewable to logged-in users. This page shows all of recipes a user has chosen to add to their personal cookbook. A user's cookbook is visible to other users.

From either the Recipe List page or the Cookbook Page the user can click on a Recipe Card to access the Recipe Details Page. This pages displays all the the details of the recipe and included buttons to add/remove a recipe from the user's cookbook, adding a personal note to the recipe that is only visible to the user, as well as recipe edit and delete buttons if the user is the creator of the recipe. The recipe creator's cookbook can also be accessed by clicking on the creator's name below the recipe title.


## Future Work
There are many things I would like to add to this project, especially more interactive features for the user such as:

Ratings system for user's to rate the recipes.

Ability for users to be able to follow eachother and receive recipe suggestions or notifications based on the recipes their connected users are adding. 

## Resources
W3Schools website https://www.w3schools.com/

Baeldung website https://www.baeldung.com/

and of course my Ironhack instructors Raymond and Shaun
