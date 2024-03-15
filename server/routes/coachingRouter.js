
import { Router } from 'express';

import { createCoaching, getCoachings } from '../controllers/coaching.js';
import auth from '../middleware/auth.js';

const coachingRouter = Router();
coachingRouter.post('/', auth, createCoaching);
coachingRouter.get('/', getCoachings);
export default coachingRouter;