import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie widoku user_results
router.get('/', async (req, res) => {
  try {
    const userResults = await query('SELECT * FROM educational.user_results');
    res.json(userResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user results' });
  }
});

export default router;