const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;
const cookieParser = require('cookie-parser');
const statusMonitor = require('express-status-monitor');
const firebaseAdmin = require('firebase-admin');

const {initializeApp, applicationDefault} = require('firebase-admin/app');

app.use(cookieParser());
app.use(express.json());

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseSDK.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://plan2travel4u-default-rtdb.europe-west1.firebasedatabase.app"
});

app.get("/", (req, res, next) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'html')});
})


app.get("/destination", (req, res, next) => {
    res.sendFile('destination.html', {root: path.join(__dirname, 'html')});
})

app.get("/suitcase", (req, res, next) => {
    res.sendFile('suitcase.html', {root: path.join(__dirname, 'html')});
})

app.use('/status', (req, res, next) => {

        if (req.hostname === 'localhost') {
            next();
        } else {
            const idToken = req.cookies.idToken;
            if (!idToken) {
                return res.status(401).json({error: 'Unauthorized'});
            }

            firebaseAdmin.auth().verifyIdToken(idToken)
                .then(decodedToken => {
                    const database = firebaseAdmin.database();
                    const ref = database.ref('users/' + decodedToken.uid + '/credentials');

                    ref.once('value', snapshot => {
                        const credential = snapshot.val();
                        if (credential.payload.isAdmin) {
                            req.user = decodedToken;
                            next();
                        } else {
                            return res.status(401).json({error: 'Unauthorized'});
                        }
                    }).catch(err => {
                        next(err)
                    });
                })
                .catch(err => {
                    next(err)
                });
        }
    }
);

app.use(statusMonitor({
    title: 'Healthcheck for Plan2travel4u',
    healthChecks: [{
        protocol: 'http',
        host: 'localhost',
        path: '/app/html/index.html',
        port: '8080'
    }, {
        protocol: 'http',
        host: 'localhost',
        path: '/app/html/destination.html',
        port: '8080'
    },
        {
            protocol: 'http',
            host: 'localhost',
            path: '/app/html/suitcase.html',
            port: '8080'
        }]
}));

app.use(express.static(path.join(__dirname, '..')));

app.use((req, res, next) => {
    res.sendFile('404.html', {root: path.join(__dirname, 'html')});
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.sendFile('500.html', {root: path.join(__dirname, 'html')});
});


app.listen(PORT, '0.0.0.0', () => console.log(`The server is running at ${PORT}`));