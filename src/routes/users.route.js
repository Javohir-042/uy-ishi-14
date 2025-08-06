import BaseController from "../controller/base.controller.js";
import { Router } from "express";
import joinController from "../controller/join.Controller.js";

const controller = new BaseController();
const router = Router();

router
    
    .get('/get', joinController.join)
    .post('/:table', controller.create)
    
    .get('/:table', controller.getAll)
    .get('/getbyid/:table/:id' ,controller.getById)

    .patch('/patch/:table/:id', controller.update)

    .delete('/delete/:table/:id', controller.delete)

export default router;