import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';

const route = Router();

const icar = new CarModel();
const icarService = new CarService(icar);
const icarController = new CarController(icarService);

route.post('/cars', (req, res) => icarController.create(req, res));

export default route;