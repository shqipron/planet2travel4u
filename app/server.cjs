const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;
const cookieParser = require('cookie-parser');
const statusMonitor = require('express-status-monitor');

const port = process.env.PORT || 4000;

const {initializeApp, applicationDefault} = require('firebase-admin/app');

app.use(cookieParser());
app.use(express.json());


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


app.listen(port, () => console.log(`The server is running at ${PORT}`));