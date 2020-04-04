'use strict';
const log = console.log

const express = require('express')
const api = require('./src/server/api.js')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const { mongoose } = require('./src/db/mongoose');
const { Playlist, Post } = require('./src/models/models')
const { User } = require("./src/models/user");
const session = require("express-session");

const port = process.env.PORT || 3002

app.use(express.static(__dirname + '/src'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their name and password
    User.findByUserPass(name, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.name = user.name;
            res.send({ userID: user._id });
        })
        .catch(error => {
            res.status(400).send()
        });
});


// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ userID: req.session.user })
    } else {
        res.status(401).send();
    }
});

/*** API Routes below ************************************/

// log(api.temper)
app.listen(port, () => {
        log(`Listening on port ${port}...`)
})

/*** Spotify Stuff ***************************************/

//Track = '4xkOaSrkexMciUUogZKVTS'
app.get('/song/:id', (req, res) => {
    log("Getting song info: " + req.params.id)

    const songJSON = async function getSongInfo() {
        const result = await api.authenticateWrapper(api.getSongJson, [req.params.id])
        res.send(result)
        log("sent song")
    }()
}
)

app.get('/song/:name/:artist', (req, res) => {
    log("Getting song " + req.params.name + " by " + req.params.artist)
    const songJSON = async function getSong() {
        const result = await api.authenticateWrapper(api.findSong, [req.params.name, req.params.artist])
        res.send(result)
        log("sent song")
    }()
})

// -------------users---------------
// Create a new user
app.post('/users', (req, res) => {
    // need to check if user with same name exists
    console.log(req.body);

    const newUser = new User({
        "name": req.body.name,
        "password": req.body.password, // insecure
        "isAdmin": req.body.isAdmin ? req.body.isAdmin : false,
    })


    newUser.save().then(
        result => {
            res.send(result)
        },
        error => {

            log(error)
            res.status(500).send(error)
        }
    )
})

// Get all users
app.get('/users', (req, res) => {
    console.log("Getting all users-")
    User.find().then((Users) => {
        console.log(Users)
        res.send({ Users })
    }), error => {
        res.status(500).send(error)
    }
})


// Get a particular user
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    log(`Getting user: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    User.findById(id).then((user) => {
        log(160, user)
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    log(`Deleting user: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    User.findOneAndRemove({ "_id": id }).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

// Update any field of a user, except for friends
// Usage: GET a specific user, update their non-friend fields and call this, sending the updated JSON

app.patch('/users/:id', (req, res) => {
    /**
 * Body example:
 *  {
	"isAdmin": false,
	"isBanned": false,
	"numReports": 0,
	"song": "",
	"_id": "5ddd7b722f1b94a37223e44f",
	"name": "bo2b",
	"password": "123",
	"__v": 0
	}
 *
 * {"song":"afsjgdkafjgkjasfh"} !!!
 */
    const id = req.params.id;
    log(`Upadting user: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    User.findOneAndUpdate({ "_id": id }, req.body, { "new": true })
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send(user)
            }
        }).catch((error) => {
            res.status(500).send()
        })
})

app.patch('/users/password/:id', (req, res) => {
    console.log("this is newpass bro: " + req.body.newPass)
    const id = req.params.id;
    log(`Upadting user: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    console.log(req.body.newPass)
    User.findOneAndUpdate({ "_id": id }, {"password": req.body.newPass}, { "new": true })
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                console.log(user)
                console.log("^^^")
                res.send(user)
            }
        }).catch((error) => {
            res.status(500).send()
        })
})


// Get all friends for this user
app.get('/users/:id/friends', (req, res) =>{
    const id = req.params.id;
    log(`Retrieving friends: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    User.findOne({"_id": id})
    .then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    })

})

// Add a new friend to the user with id in URI
app.post('/users/:id/friends', (req, res) => {
    const id = req.params.id;
    log(`Adding friend: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
    console.log(req.body)
    User.findOneAndUpdate({ "_id": id }, { "$push": { "friends": req.body.friendId } }, { "new": true }).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})

// Delete a friend from the user with id in URI
/**
 *
 * {"friendId": "friendId"}
 */
app.patch('/users/:id/friends', (req, res) => {
    const id = req.params.id;
    log(`Deleting friend: ${req.body.deleteID} from ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    User.findOneAndUpdate({ "_id": id }, { "$pull": { "friends": req.body.deleteID } }, { "new": true }).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})


// -----------playlists-------------
// Create a new playlist
app.post('/playlist', (req, res) => {
    // need to check if user with same name exists
    log("Received POST new playlist")
    log(req.body)

    const playlist = new Playlist({
        "name": req.body.name,
        "owner": req.body.owner,
        "songs": req.body.songs
    })

    playlist.save().then(
        result => {
            res.send(playlist)
        },
        error => {
            log(error)
            res.status(500)
        }
    )
})

// Get a particular playlist playlist
// probably need to change frontend to search only when enter is pressed
// can check which parameter is being searched for
app.get('/playlist/:id', (req, res) => {
    const id = req.params.id;
    log(`Playlist request: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Playlist.findById(id).then((playlist) => {
        if (!playlist) {
            res.status(404).send()
        } else {
            res.send(playlist)
        }
    }).catch((error) => {
        res.status(500).send()
    })

})

// Delete a playlist
app.delete('/playlist/:id', (req, res) => {
    const id = req.params.id;
    log(`Deleting playlist: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Playlist.findOneAndRemove({ "_id": id }).then((playlist) => {
        if (!playlist) {
            res.status(404).send()
        } else {
            res.send(playlist)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

// Add a song to a playlist
// Expects {"song": "songid"}
app.post('/playlist/:id/song', (req, res) => {
    const id = req.params.id;
    log(`Adding song ${req.body.song} to playlist: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Playlist.findOneAndUpdate({ "_id": id }, { "$push": { "songs": req.body.song } }, { "new": true }).then((playlist) => {
        if (!playlist) {
            res.status(404).send()
        } else {
            res.send(playlist)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})


// Remove a song from a playlist
app.delete('/playlist/:id/song', (req, res) => {
    const id = req.params.id;
    log(`Deleting song ${req.body.song} from playlist: ${id}`)
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Playlist.findOneAndUpdate({ "_id": id }, { "$pull": { "songs": req.body.song } }, { "new": true }).then((playlist) => {
        if (!playlist) {
            res.status(404).send()
        } else {
            res.send(playlist)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})


// Get playlists for a given user
// id of the user
app.get('/:id/playlist', (req, res) => {
    const id = req.params.id;
    log(`Getting playlist: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Playlist.find({ "owner": id }).then(results => {
        if (!results) {
            res.status(404).send()
        } else {
            res.send(results)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })

})

// Get all playlists
app.get('/playlist', (req, res) => {
    log("Getting all playlists...")
    Playlist.find().then(results => {
        if (!results) {
            res.status(404).send()
        } else {
            res.send(results)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})


// -----------post-------------
// Create a new post
app.post('/post', (req, res) => {
    // need to check if user with same name exists
    log("Creating post-")
    log(req.body);

    const newPost = new Post({
        "ownerID": req.body.ownerID,
        "text": req.body.text,
        "ownerName": req.body.ownerName
    })

    newPost.save().then(
        result => {
            res.send(result)
        },
        error => {
            res.status(500)
        }
    )
})

// Get post by id
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    log(`Getting post: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Post.findById(id).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.send(post)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

// Delete post by id
app.delete('/post/:id', (req, res) => {
    const id = req.params.id;
    log(`Deleting post: ${id}`)

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Post.findOneAndRemove({ "_id": id }).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.send(post)
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

// Update post fields
app.patch('/post/:id', (req, res) => {
    log(req.body)
    const id = req.params.id;
    log(`Updating post: ${id}`)


    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Post.findOneAndUpdate({ "_id": id }, req.body, { "new": true })
        .then((post) => {
            if (!post) {
                res.status(404).send()
            } else {
                res.send(post)
            }
        }).catch((error) => {
            res.status(500).send()
        })
})

// Get all posts
app.get('/post', (req, res) => {
    log("Getting all posts...")
    Post.find().then(results => {
        if (!results) {
            res.status(404).send()
        } else {
            res.send(results)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})

// Get all posts for a particular user
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    log(`Getting user posts: ${id}`)


    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    Post.find({ "owner": id }).then(results => {
        if (!results) {
            res.status(404).send()
        } else {
            res.send(results)
        }
    }).catch((error) => {
        log(error)
        res.status(500).send()
    })
})

/**
 * Things that i have done so far
 * Users
 * - New [x]
 * - Get all [x]
 * - Get particular [x]
 * - Delete [x]
 * - Update fields [x]
 *
 * Playlists
 * - New playlist [x]
 * - Get particular playlist [x]
 * - Delete playlist [x]
 * - Add song to playlist [x]
 * - Delete song from playlist [x]
 * - Get playlists for a particular user [x]
 * - Get all playlists [x]
 *
 * Posts
 * - New post [x]
 * - Get particular post [x]
 * - Get all posts [x]
 * - Delete post [x]
 * - Ban post (use update method) [x]
 * - Report post (use update method) [x]
 * - Get all posts for a particular user [x]
 *
 * */
