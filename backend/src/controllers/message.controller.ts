import { Request, Response } from "express";

export const sendMessage = (req: Request, res: Response): Response => {
  return res.json({ message: "Hii There !! it's Purus" });
};