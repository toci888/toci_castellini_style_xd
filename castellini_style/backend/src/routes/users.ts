import { Router } from 'express';
import { query } from '../db/config';

const router = Router();

// Pobranie wszystkich użytkowników
router.get('/', async (req, res) => {
  try {
    const users = await query('SELECT * FROM educational.users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Dodanie użytkownika
router.post('/', async (req, res) => {
  const { email, password_hash, name } = req.body;
  try {
    const newUser = await query(
      'INSERT INTO educational.users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
      [email, password_hash, name]
    );
    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Aktualizacja użytkownika
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password_hash, name } = req.body;
  try {
    const updatedUser = await query(
      'UPDATE educational.users SET email = $1, password_hash = $2, name = $3 WHERE id = $4 RETURNING *',
      [email, password_hash, name, id]
    );
    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Usunięcie użytkownika
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM educational.users WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;