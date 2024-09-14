const express = require("express");
const router = express.Router();
const pool = require('../db/pool');

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

router.post('/posts', async (req, res) => {
    try {
        const text = req.body.text;
        const authorid = req.body.authorid;
        await pool.query('INSERT INTO posts (text, authorid) VALUES ($1, $2)', [text, authorid]);
    
        res.json({ message: 'post created' })
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting the post');
    }
});

router.put('/posts/:id', async (req, res) => {
    try {
        const text = req.body.text;
        const postid = req.params.id;
        await pool.query('UPDATE posts SET text = $1 WHERE id = $2', [newText, postid]);
    
        res.json({ message: 'post updated' });    
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating the post');
    }
});

router.delete('/posts/:id', async (req, res) => {
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

router.post('posts/:id/comments', async (req, res) => {
    try {
        const text = req.body.text;
        const postid = req.params.id;
        const authorid = req.body.authorid;

        await pool.query('INSERT INTO comments (text, postid, authorid) VALUES ($1, $2, $3)', [text, postid, authorid]);
        res.json({ message: 'comment posted'})
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting the comment');
    }
});

router.put('/posts/:id/comments/:commentid', async (req, res) => {
    try {
        const text = req.body.text;
        const commentid = req.params.commentid;

        await pool.query('UPDATE comments SET text = $1 WHERE commentid = $2', [text, commentid]);
        res.json({ message: 'comment updated'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting the comment');
    }
});

module.exports = router;