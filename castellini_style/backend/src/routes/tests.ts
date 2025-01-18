import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie wszystkich testów
router.get('/', async (req, res) => {
  try {
    const tests = await query('SELECT * FROM educational.tests');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// Dodanie testu
router.post('/', async (req, res) => {
  const { name, category, difficulty } = req.body;
  try {
    const newTest = await query(
      'INSERT INTO educational.tests (name, category, difficulty) VALUES ($1, $2, $3) RETURNING *',
      [name, category, difficulty]
    );
    res.status(201).json(newTest[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test' });
  }
});

// Aktualizacja testu
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, difficulty } = req.body;
  try {
    const updatedTest = await query(
      'UPDATE educational.tests SET name = $1, category = $2, difficulty = $3 WHERE id = $4 RETURNING *',
      [name, category, difficulty, id]
    );
    res.json(updatedTest[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update test' });
  }
});

// Usunięcie testu
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM educational.tests WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete test' });
  }
});

export default router;