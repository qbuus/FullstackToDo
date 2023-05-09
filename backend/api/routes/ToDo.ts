import express from "express";
import * as ToDo from "../controllers/toDo";
import { requiredAuthentication } from "../middleware/authentication";

const router = express.Router();

router.get("/todo/", requiredAuthentication, ToDo.getToDos);
router.get("/todo/:id", requiredAuthentication, ToDo.getToDo);
router.post("/todo/", requiredAuthentication, ToDo.createToDo);
router.patch(
  "/todo/:id",
  requiredAuthentication,
  ToDo.updateToDos
);
router.delete(
  "/todo/:id",
  requiredAuthentication,
  ToDo.deleteToDo
);

export default router;
