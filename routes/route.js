const express = require("express");
const router = express.Router();
const pool = require('../db/pool');

router.get('/', (req, res) => {
    res.json({ message: 'welcome' });
});

router.get('/posts', async (req, res) => {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
});

router.post('/posts', async (req, res) => {
    const text = req.body.text;
    const authorid = req.body.authorid;
    await pool.query('INSERT INTO posts (text, authorid) VALUES ($1, $2)', [text, authorid]);

    res.json({ message: 'post created' })
});

router.put('/posts/:id', async (req, res) => {
    const newText = req.body.newText;
    const postid = req.params.id;
    await pool.query('UPDATE posts SET text = $1 WHERE id = $2', [newText, postid]);
});

router.delete('/posts/:id', async(req, res) => {
    const postid = req.params.id;
    await pool.query('DELETE FROM posts WHERE id = $1', [postid]);
});

module.exports = router;