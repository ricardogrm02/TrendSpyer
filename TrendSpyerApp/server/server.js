const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const dbConfig = {
  user: 'trendspyer',
  password: 'p@ssword1',
  database: 'trendspyer',
  server: 'trendspyer-server.database.windows.net',
  options: {
    encrypt: true, // Azure requires encryption
  },
};

app.get('/data', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM [dbo].[Users]');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
