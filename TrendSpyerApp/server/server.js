const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  server: 'your_server.database.windows.net',
  options: {
    encrypt: true, // Azure requires encryption
  },
};

app.get('/data', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM your_table');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
