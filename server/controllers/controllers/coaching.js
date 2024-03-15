import Coaching from "../models/Coaching.js";

import tryCatch from "./utils/tryCatch.js";

export const createCoaching = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newCoaching = new Coaching({ ...req.body, uid, uName, uPhoto });
  await newCoaching.save();
  res.status(201).json({ success: true, result: newCoaching });
});

export const getCoachings = tryCatch(async (req, res) => {
  const coachings = await Coaching.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: coachings });
});
