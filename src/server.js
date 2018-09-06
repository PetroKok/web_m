//-----MODULES------
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import colors from "colors";
//--------CONTROLLERS--
import {renderReact} from './server/controllers/renderReact'
import musicController from './server/controllers/musicController'
import bicycleController from './server/controllers/bicycleController'
import userController from './server/controllers/userController'
import shopCartController from './server/controllers/shopCartController'

//--------DATABASE
import db from './db'
let urlDB = 'mongodb://adminPetro:adminPetro@ds157538.mlab.com:57538/petrobase';

//--------VARIABLES
const PORT = process.env.PORT || 3001;
const app = express();

//--------MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('./public'));
app.use(passport.initialize())
require('./server/settings/passport')(passport);

app.use((req, res, next) => {
    console.log(colors.green("Request to route"),colors.blue(" => "), colors.yellow(req.url));
    next();
});

//--------ROUTES
app.use(musicController); // upload files on server -> folder "files-music"

app.use(bicycleController); //for bicycles there're 4 router ("/upload-bicycle", "bicycles/:count/:skp", "bicycle/:id", "remove-bicycle/:id")

app.use(shopCartController);

app.use("/api", userController);
//--------SERVER-SIDE-RENDERING
app.use(renderReact);// render React app

db.connect(urlDB, error => {
    if (error) console.log(error);
    console.log(db.getStatus());

    app.listen(PORT, () =>
        console.log('Server started! PORT = ', PORT));

});

// fs.unlink('./public/files-photo/123.png', err => {
//     if(err) throw err;
//     console.log("DELETED");
// });
