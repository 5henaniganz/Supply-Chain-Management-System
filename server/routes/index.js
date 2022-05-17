import { Router } from 'express';
import ContractController from '../controllers/contractController.js';

const routes = Router();

routes.post('/active', ContractController.getAllActive);
routes.post('/create', ContractController.createContract);
routes.post('/delete', ContractController.deleteContract);
routes.post('/supply', ContractController.getSupply);
routes.post('/getAll', ContractController.getDash)

export default routes;