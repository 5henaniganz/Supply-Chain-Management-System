import { Router } from 'express';
import ContractController from '../controllers/contractController.js';

const routes = Router();

routes.post('/active', ContractController.getAllActive);
routes.post('/create', ContractController.createContract);

export default routes;