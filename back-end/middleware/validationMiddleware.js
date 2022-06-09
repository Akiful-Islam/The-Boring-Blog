import { validationResult } from "express-validator";

export const validationCheck = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((e) => e.msg)
        .join(" ")
    );
  }

  next();
};
