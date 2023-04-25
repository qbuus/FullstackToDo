import express from "express";
import * as users from "../controllers/users";
import { requiredAuthentication } from "../middleware/authentication";

const router = express.Router();

router.post("/signup", users.signUp);
router.post("/signin", users.SignIn);
router.get(
  "/",
  requiredAuthentication,
  users.getAuthenticated
);
router.post("/signout", users.SingOut);

export default router;
