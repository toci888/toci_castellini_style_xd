import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './src/routes/users';
import testRoutes from './src/routes/tests';
import questionRoutes from './src/routes/questions';
import resultRoutes from './src/routes/results';
import userResultsRoutes from './src/routes/user_results';
import testQuestionsRoutes from './src/routes/test_questions';

const pool = require('./src/db/config');

require('./src/routes/users.ts');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rejestracja tras
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/user-results', userResultsRoutes);
app.use('/api/test-questions', testQuestionsRoutes);

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
