import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie widoku test_questions
router.get('/', async (req, res) => {
  try {
    const testQuestions = await query('SELECT * FROM educational.test_questions');
    res.json(testQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test questions' });
  }
});

export default router;