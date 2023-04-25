import express from "express";
import * as users from "../controllers/users";

const router = express.Router();

router.post("signup", users.signUp);
router.post("signin", users.SignIn);
router.get("/", users.getAuthenticated);
router.post("/signout", users.SingOut);
