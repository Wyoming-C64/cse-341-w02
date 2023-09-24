const routes = require('express').Router();
const controller = require('../controllers/controller');
 
routes.get('/contacts', controller.getData);



module.exports = routes;