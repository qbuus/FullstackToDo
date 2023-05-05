import express from "express";
import * as users from "../controllers/users";
import { requiredAuthentication } from "../middleware/authentication";
import rateLimit from "express-rate-limit";

const createAccountLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message:
    "Too many account creation requests. It is limited to 1 request per 1 minute",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});

const router = express.Router();

router.post("/signup", createAccountLimiter, users.signUp);
router.post("/signin", createAccountLimiter, users.SignIn);
router.get(
  "/",
  requiredAuthentication,
  users.getAuthenticated
);
router.post("/signout", users.SingOut);

export default router;
