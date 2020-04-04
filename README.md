# team09 - Orchestrate

# Use final branch for deployment code, use this branch for local editing
## Local:
### node server.js
### npm start

## Continue reading for readme!

### Built With
* [React](https://reactjs.org/)
* [NPM](https://www.npmjs.com/)

## Getting Started

To set up the local dev environemnt, follow the steps below.

### Prerequisites

* npm
```
npm install npm@latest -g
```

### Installation

1. Clone the repo
```
git clone https://github.com/csc309-fall-2019/team09.git
```
2. Install NPM packages
```
npm install && cd client && npm install && npm start && cd ..
```
3. Start the server
```
node server.js
```

## Access

The site is deployed out to [Heroku](https://orchestrate-music.herokuapp.com/), and the backend is out on Atlas. The site is fully deployed, without using [Glitch](glitch.me). Further, we did have a problem with setting up MongoDB, and such hardcoded the mongo uri onto server.js. Otherwise, it is functionally deployed.

## Flow

You can login to the site using admin/admin to view admin functionality. From there, you have the view as a user, but you can also permanently delete items such as users from the search view. We scrapped the admin panel because Bill couldn't get it functioning, so Victor took over.

As a user, you have many functionality. You can create playlists, set your favorite song. You can add friends, delete friends, and post! Interacting with other users is possible and functioning.

## Issues

* When launching from heroku for the first time, please wait ~5 minutes. It takes a few minutes to deploy before you can access it.

* One issue is security. You can easily see the information from deployment by using the routes. For example, you can see all the users from this [page](https://orchestrate-music.herokuapp.com/users)

* Spotify API could not return the preview_url. Andrew opened up a github issue as well as a stackoverflow thread and responders were also having the same issue. This could imply that the functionality has thus changed. As of now, it returns the song URL instead of playing the song as we had intended.

* Spotify API is also rather slow in returning our calls, thus we used an Async function that awaits for the return, then posts it when it is retrieved. This means some of the users will need to take a while before their picture, song info, and song url show up.

* General issues with things taking too long to update.

* Functionality implemented by Bill in User profile not fully functioning.

* Broken css in User Profile.

* Works locally, but on deployment, adding songs to playlists and general playlist manipulation not fully working.

* If something is generally not working, try moving to a different page then coming back - usually fixes it.

* No routing, refreshing takes you to dashboard.

## Usage

### Register / Log In
When running the site, you should not be able to access the page without logging in or registering.
You can log in using 'user'/'user' or access the admin panel through 'admin'/'admin' (who also has user views). You can also register and create accounts. We use authentication and middleware to encrypt the passwords of registered users.

### Admin
The admin functionality has now been moved on to the search page instead of having its own dedicated page. Now, blue buttons appear for admins that allow them to delete - permanently. This includes deleting users.


### User Profile Page 
When user loggin, they can access this through a button in the top right corner (looks like an ID card). This button will then redirect user to the profile panel.
In the user profile page, they could view current friend list, delete friend from friend list, view their playlists and create play list.
User cand also modify its user name and favourite song. 

### Global Search Functionality
Global search, accessible through the button on the right side of the header, allows users to search for any resource on the site (i.e. Any users/friends, playlists, posts).
Search results updates dynamically, as the user types. When the search field is blank, all results of the current type are displayed (e.g. every playlist).
The user can change the search type through a dropdown menu on the right, with the default search being users.
Admins may use global search to delete any post, playlist, or user.
Users may use global search to add and delete friends.

### Playlists
Each playlist is accessible through links provided by global search or through the playlist owner's page.
A playlist's page contains a list of songs on the page. Playlists are editable and pull from the Spotify API.


### Settings
The settings page is used to change the user password and logging out of the app.

### Posts
Text posts can be created on the homepage and displayed on the post list feed. User can't delete their own posts, but admins have the capability to delete the posts they don't like.

## Routes

### Spotify:
Note: The Spotify API wrapper seems to be inconsistent at best some of its features were discovered to not work late into the project.

    - **GET /song/:id**: Given an id returns the song json
        Used in all spotify impementation get the picture, url, and song name
    - **GET /song/:track/:artist**: Given track and artist, search for a song
        Used to search for and add songs


### Users:
    - **/users/login**: Used to verify login
    - **/users/logout**: Used to handle a logout
    - **POST /users/**: Creates a new user on registration
    - **GET /users/**: Returns all users. Used for search.
    - **GET /users/:id**: Used to retrieve data for a particular user.
    - **DELETE /users/:id**: Used when banning users
    - **PATCH /users/:id**: Used when updating a user's password/username
    - **GET /users/:id/friends**: Used for friends lists
    - **POST /users/:id/friends**: Used for adding friends
    - **DELETE /users/:id/friends**: Used for deleting friends

### Playlists:
    - **POST /playlist**: Used for making a new playlist
    - **GET /playlist/:id**: Used for retrieving a playlist to display
    - **DELETE /playlist/:id**: Used for deleting a given playlist
    - **POST /playlist/:id/song**: Used for adding a song to a playlist
    - **DELETE /playlist/:id/song**: Used for deleting a song from a playlist
    - **GET /:id/playlist**: Used to display playlists on a profile
    - **GET /playlist**: Used to get all playlists for search (this allows instant updating)

### Posts:     
    - **POST /post**: Used for creating a new post
    - **DELETE /post/:id**: Delete post given an id (used for banning)
    - **PATCH /post/:id**: Could be used for updating posts
    - **GET /post**: Used for getting all posts (allows instant updating when searching)
    - **GET /post/:id**: Get all posts for a particular user

## Contribution for **Phase 2**
Victor:
The following features/code were completed in their entirety by Victor, unless otherwise stated:
- Playlists
- Admin (This was originally Bill's Responsibility.)
- All backend code except Spotify API calls and Authentication/Login
- Mongo models
- Linking most resources to backend + writing template code for API
  calls(utilized by whole team)
- Organized meetings
---
Andrew:
- Set up heroku, mongo, and atlas
- Handled all of deployment out to heroku and atlas
- Created packages, installations, and handled file structuring
- Integrated spotify api, as well as spotify credential authorization
- User authentication, login, registration, logout, session storage
- Cleaned up css and html throughout project
- Linked up backend and frontend
- Created and updated readme
- Implemented json pulls from spotify to user pictures, songs, and urls

---
Jeff:
- Edited mongoose models for Posts
- Modified some backend calls for posts and friends
- Integrated password changing for users
- Integrated adding friends and deleting friends for users
- Integrated create posts and displaying list of all posts on HomePage and Searchpage
- Fixed create playlist on profile page
- User profile page update
---
Bill:

- User profile page

- Semi-functioning add playlist
- Implemented update user name
- Linked playlist to user profile
