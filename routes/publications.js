const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { verifyToken } = require('./users');

router.get('/', (req, res) => {
    res.json({ message: 'welcome' });
});

router.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading posts')
    }
});

router.post('/posts', verifyToken, async (req, res) => {
    try {
        const { text, title } = req.body;
        const authorid = req.body.authorid;
        const date = new Date();
        await pool.query('INSERT INTO posts (text, authorid, addedat, title) VALUES ($1, $2, $3, $4)', [text, authorid, date, title]);
    
        res.json({ message: 'post created' })
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting the post');
    }
});

router.put('/posts/:id', verifyToken, async (req, res) => {
    try {
        const text = req.body.text;
        const postid = req.params.id;
        const date = new Date();

        await pool.query('UPDATE posts SET text = $1, addedat = $2 WHERE id = $3', [text, date, postid]);
    
        res.json({ message: 'post updated' });    
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating the post');
    }
});

router.delete('/posts/:id', verifyToken, async (req, res) => {
    try {
        const postid = req.params.id;
        await pool.query('DELETE FROM posts WHERE id = $1', [postid]);
    
        res.json({ message: 'post deleted'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting the post');
    }
});

///R - GET posts/:id/comments
///C - POST posts/:id/comments
///U - PUT posts/:id/comments/:commentid
///D - DELETE posts/:id/comments/:commentid

router.get('/posts/:id/comments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comments');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading comments');
    }

});

router.post('/posts/:id/comments', verifyToken, async (req, res) => {
    try {
        const text = req.body.text;
        const postid = req.params.id;
        const authorid = req.body.authorid;
        const date = new Date();

        await pool.query('INSERT INTO comments (text, postid, authorid, addedat) VALUES ($1, $2, $3, $4)', [text, postid, authorid, date]);
        res.json({ message: 'comment posted'})
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting the comment');
    }
});

router.put('/posts/:id/comments/:commentid', verifyToken, async (req, res) => {
    try {
        const text = req.body.text;
        const commentid = req.params.commentid;
        const date = new Date();

        await pool.query('UPDATE comments SET text = $1, addedat = $2 WHERE id = $3', [text, date, commentid]);
        res.json({ message: 'comment updated'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing the comment');
    }
});

router.delete('/posts/:id/comments/:commentid', verifyToken, async (req, res) => {
    try {
        const commentid = req.params.commentid;

        await pool.query('DELETE FROM comments WHERE id = $1', [commentid]);
        res.json({ message: 'comment deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting comment');
    }
});

module.exports = router;