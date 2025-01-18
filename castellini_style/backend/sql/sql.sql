


DROP SCHEMA IF EXISTS educational CASCADE;



-- Tworzenie schematu "educational"
CREATE SCHEMA IF NOT EXISTS educational;

-- Tworzenie tabeli użytkowników
CREATE TABLE educational.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tworzenie tabeli testów
CREATE TABLE educational.tests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tworzenie tabeli pytań
CREATE TABLE educational.questions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL,
    content TEXT NOT NULL,
    choices JSONB NOT NULL, -- Zawiera możliwe odpowiedzi w formacie JSON
    correct_answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (test_id) REFERENCES educational.tests (id) ON DELETE CASCADE
);

-- Tworzenie tabeli wyników
CREATE TABLE educational.results (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    test_id INT NOT NULL,
    score INT NOT NULL,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES educational.users (id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES educational.tests (id) ON DELETE CASCADE
);

-- Wypełnianie danych (seedy)
-- Dodanie użytkowników
INSERT INTO educational.users (email, password_hash, name) VALUES
('student1@example.com', 'hashedpassword1', 'Student One'),
('student2@example.com', 'hashedpassword2', 'Student Two'),
('teacher1@example.com', 'hashedpassword3', 'Teacher One');

-- Dodanie testów
INSERT INTO educational.tests (name, category, difficulty) VALUES
('Matematyka Podstawowa', 'Matematyka', 'easy'),
('Historia Średniowiecza', 'Historia', 'medium'),
('Zaawansowana Fizyka Kwantowa', 'Fizyka', 'hard');

-- Dodanie pytań
INSERT INTO educational.questions (test_id, content, choices, correct_answer) VALUES
(1, 'Ile to jest 2 + 2?', '{"a": "3", "b": "4", "c": "5"}', 'b'),
(1, 'Ile to jest 5 * 5?', '{"a": "20", "b": "25", "c": "30"}', 'b'),
(2, 'Kto był królem Polski w 1410 roku?', '{"a": "Kazimierz Wielki", "b": "Władysław Jagiełło", "c": "Jan III Sobieski"}', 'b'),
(3, 'Co to jest splątanie kwantowe?', '{"a": "Stan cząstek, które są połączone na poziomie kwantowym", "b": "Teoria grawitacji", "c": "Rodzaj promieniowania"}', 'a');

-- Dodanie wyników
INSERT INTO educational.results (user_id, test_id, score) VALUES
(1, 1, 100),
(1, 2, 50),
(2, 3, 75);

-- Tworzenie widoków
-- Widok wyników użytkowników z pełnymi informacjami
CREATE OR REPLACE VIEW educational.user_results AS
SELECT 
    u.id AS user_id,
    u.name AS user_name,
    t.name AS test_name,
    r.score,
    r.taken_at
FROM educational.results r
INNER JOIN educational.users u ON r.user_id = u.id
INNER JOIN educational.tests t ON r.test_id = t.id;

-- Widok pytań z pełnymi informacjami
CREATE OR REPLACE VIEW educational.test_questions AS
SELECT 
    t.id AS test_id,
    t.name AS test_name,
    q.id AS question_id,
    q.content AS question_content,
    q.choices
FROM educational.questions q
INNER JOIN educational.tests t ON q.test_id = t.id;
