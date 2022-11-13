import { Router } from "express";
import {
  createperson,
  deleteperson,
  getperson,
  getpersons,
  updateperson,
} from "../controllers/persons.controller.js";

const router = Router();

// GET all persons
router.get("/persons", getpersons);

// GET An person
router.get("/person/firstname/:firstname/lastname/:lastname", getperson);

// DELETE An person
router.delete("/person/:id", deleteperson);

// INSERT An person
router.post("/person", createperson);

router.patch("/person/:id", updateperson);

export default router;
