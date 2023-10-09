const express = require('express');
const router = express.Router();
const { Articles } = require('../mongodb/articlesSchema');
let { mongoose } = require('../mongodb/connection');
require('dotenv').config();


// SAVE NEW TRANSLATION
router.post('', async(req, res) => {
    try {
        const newArticle = new Articles ({
            title: req.body.title,
            link: req.body.link,
            topic: req.body.topic,
            language: req.body.language,
            summary: req.body.summary
        })
        const result = await newArticle.save();
        res.status(201);
        res.send(result);

    }catch {
        console.log("req.body.topic:", req.body.topic);
        res.status(404);
        res.send({
            error: "Article could not be saved :("
        })
    }
});

// GET ONE TRANSLATION BY ID
router.get('/:id', async (req, res) => {
    try{
        const prompt = await Articles.findOne({_id: req.params.id});
        console.log(prompt);
        res.send(prompt);
    } catch {
        res.status(404);
        res.send({
            error: "Article could not be read :("
        })
    }
});

router.get('', async (req, res) => {
    try{
        const lang = req.query.l;
        const topic = req.query.t;
        const query = {};
        if (lang) {
            query.language = { $in: Array.isArray(lang) ? lang : [lang] };
        }
        if (topic) {
            query.topic = { $in: Array.isArray(topic) ? topic : [topic] };
        }
        Articles.find(query)
            .then(async (Articles) => {
            console.log(Articles);
            res.status(200);
            res.send(Articles);
        })
        /*const articles = await Articles.find(query)//.toArray();
        console.log(articles);
        res.send(articles);*/
    } catch {
        res.status(404);
        res.send({
            error: "Articles could not be read :("
        })
    }
});
/*-- INCLUDED IN THE QUERY PARAMETER ONE
// GET ALL TRANSLATIONS
router.get('', async(req, res) => {
    try{
        Articles.find({
        }).then(async (Articles) => {
            console.log(Articles);
            res.status(200);
            res.send(Articles);
        })
    } catch {
        res.status(404);
        res.send({
            error: "Articles could not be read :("
        })
    }
});*/

// UPDATE ONE TRANSLATION BY ID
router.patch('/:id', async(req, res) => {
    try {
        const article = await Articles.findOne({ _id: req.params.id })
        if (req.body.title) {
            article.title = req.body.title
        }
        if (req.body.link) {
            article.link = req.body.link
        }
        if (req.body.topic) {
            article.topic = req.body.topic
        }
        if (req.body.language) {
            article.language = req.body.language
        }
        if (req.body.summary) {
            article.summary = req.body.summary
        }
        await Articles.updateOne({ _id: req.params.id }, article);
        res.status(200);
        res.send(article)
    } catch {
        res.status(404)
        res.send({ error: "Article could not be updated :(" })
    }
});

// DELETE ONE TRANSLATION BY ID
router.delete('/:id', async(req, res) => {
    try {
        const articles = await Articles.deleteOne({ _id: req.params.id })
        console.log('articles', articles)
        res.status(200)
        res.send( { message: "Article deleted" })
    } catch {
        res.status(404)
        res.send({ error: "Article could not be deleted :(" })
    }
});

module.exports = router;
