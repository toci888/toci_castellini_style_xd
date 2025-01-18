import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie wszystkich pytań
router.get('/', async (req, res) => {
  try {
    const questions = await query('SELECT * FROM educational.questions');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Dodanie pytania
router.post('/', async (req, res) => {
  const { test_id, content, choices, correct_answer } = req.body;
  try {
    const newQuestion = await query(
      'INSERT INTO educational.questions (test_id, content, choices, correct_answer) VALUES ($1, $2, $3, $4) RETURNING *',
      [test_id, content, choices, correct_answer]
    );
    res.status(201).json(newQuestion[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
});

// Aktualizacja pytania
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content, choices, correct_answer } = req.body;
  try {
    const updatedQuestion = await query(
      'UPDATE educational.questions SET content = $1, choices = $2, correct_answer = $3 WHERE id = $4 RETURNING *',
      [content, choices, correct_answer, id]
    );
    res.json(updatedQuestion[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// Usunięcie pytania
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM educational.questions WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

export default router;