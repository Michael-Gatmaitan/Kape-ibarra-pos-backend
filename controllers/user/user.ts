import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Get all user
router.get("/", (req: Request, res: Response) => {
  res.json({ res: req.params.name });
});

// Create new user using { req.body } if validated on frontend
router.post("/", (req: Request, res: Response) => {
  const body: { username: string; password: string } = req.body;
  console.log(body);
  res.json({ res: body });
});

// Get specific user
router.get(
  "/:name",
  (req: Request & { params: { name: string } }, res: Response) => {
    res.json({ res: `user's name is ${req.params.name}` });
  }
);

export default router;
