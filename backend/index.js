const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME
});

const dbReady = new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) return reject(err);
      console.log('MySQL Connected');
  
      db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
        if (err) return reject(err);
  
        db.query(`USE ${process.env.DB_NAME}`, (err) => {
          if (err) return reject(err);
  
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS persons (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL
            )
          `;
          db.query(createTableQuery, (err) => {
            if (err) return reject(err);
            console.log('Table ready');
            resolve();
          });
        });
      });
    });
  });

// Routes
app.get('/', (req, res) => res.json({ message: 'API is working' }));

app.get('/api/person/:id', (req, res) => {
  db.query('SELECT * FROM persons WHERE id = ?', req.params.id, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result[0] || {});
  });
});

app.get('/api/person', (req, res) => {
  db.query('SELECT * FROM persons', (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post('/api/person', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO persons (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.status(201).json({ id: result.insertId });
  });
});

app.put('/api/person/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE persons SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: 'Updated' });
  });
});

app.delete('/api/person/:id', (req, res) => {
  db.query('DELETE FROM persons WHERE id = ?', req.params.id, (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: 'Deleted' });
  });
});

// Export app + db for test
module.exports = { app, db, dbReady };
// ... optional start server block ...
/* c8 ignore start */
if (require.main === module) {
    const port = process.env.PORT || 3000;
    dbReady.then(() => {
      app.listen(port, () => console.log(`Server running on ${port}`));
    });
  }
/* c8 ignore stop */