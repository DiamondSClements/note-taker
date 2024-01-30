//Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

//have to use middleware for JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

