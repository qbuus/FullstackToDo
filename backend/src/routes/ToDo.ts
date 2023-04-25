import express from "express";
import * as ToDo from "../controllers/toDo";

const router = express.Router();

router.get("/", ToDo.getToDos);
router.get("/:id", ToDo.getToDo);
router.post("/", ToDo.createToDo);
router.patch("/:id", ToDo.updateToDos);
router.delete("/:id", ToDo.deleteToDo);

export default router;
