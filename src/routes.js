const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.login);

routes.get('/ongs', OngController.list);

routes.post('/ongs', OngController.create);


routes.get('/incidents', IncidentController.listAll);
routes.get('/MeusIncidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;