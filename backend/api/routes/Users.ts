import express from "express";
import * as users from "../controllers/users";
import { requiredAuthentication } from "../middleware/authentication";
import rateLimit from "express-rate-limit";

const createAccountLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message:
    "Too many account creation requests. It is limited to 2 request per 1 minutes",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});

const router = express.Router();

router.post(
  "/users/signup/",
  createAccountLimiter,
  users.signUp
);
router.post(
  "/users/signin/",
  createAccountLimiter,
  users.SignIn
);
router.get(
  "/users/",
  requiredAuthentication,
  users.getAuthenticated
);
router.post("/users/signout/", users.SingOut);

export default router;
