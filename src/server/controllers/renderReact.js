import React from 'react';
import {StaticRouter} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'

import store from '../../state'
import App from '../../client/App'

exports.renderReact = (req, res) => {
    const context = {};
    const appWithRouter =  renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        </Provider>
    );
    const loadedState = store.getState();
    console.log("LOADEDSTATE = ",loadedState);
    if (context.url) res.redirect(context.url);
    res.status(200).send(renderFullHTML(appWithRouter, loadedState));
};

function renderFullHTML(html, store) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>mPLAYER v2</title>     
            <link href="https://fonts.googleapis.com/css?family=Jua" rel="stylesheet">
            <link rel="stylesheet" href="/public/bundle/main.css">
        </head>
        
        <body>
            <div id="root">${ html }</div>
        </body>     
        
        <script crossorigin src="/public/bundle/main.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
         <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\\u003c')}
         </script>

    </html>
`
}