import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie wszystkich wyników
router.get('/', async (req, res) => {
  try {
    const results = await query('SELECT * FROM educational.results');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Dodanie wyniku
router.post('/', async (req, res) => {
  const { user_id, test_id, score } = req.body;
  try {
    const newResult = await query(
      'INSERT INTO educational.results (user_id, test_id, score) VALUES ($1, $2, $3) RETURNING *',
      [user_id, test_id, score]
    );
    res.status(201).json(newResult[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create result' });
  }
});

// Aktualizacja wyniku
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const updatedResult = await query(
      'UPDATE educational.results SET score = $1 WHERE id = $2 RETURNING *',
      [score, id]
    );
    res.json(updatedResult[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update result' });
  }
});

// Usunięcie wyniku
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM educational.results WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete result' });
  }
});

export default router;