const mongoose = require('mongoose');
require('dotenv').config();

// Define your Mongoose schema and model
const articleSchema = new mongoose.Schema({
    title: String,
    source: String,
    link: String,
    summary: String,
    topic: String,
    language: String
});

const Article = mongoose.model('Article', articleSchema);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;

db.on('error', err => {
    console.error('Connection error:', err);
});

db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Sample data to populate the database
    const articlesData = [];
    const sources = ['KBS', 'Tagesschau'];
    const links = [
        'https://onair.kbs.co.kr/?sname=onair&stype=live&ch_code=21&ch_type=radioList&bora=on&chat=on',
        'https://www.tagesschau.de/'
    ];

    for (let i = 1; i <= 40; i++) {
        const index = i % 2; // Alternate between 0 and 1
        articlesData.push({
            title: `Article ${i}`,
            source: sources[index],
            link: links[index],
            summary: `Summary ${i}`,
            topic: i % 4 === 0 ? 'Technology' : i % 4 === 1 ? 'Education' : i % 4 === 2 ? 'Health' : 'Music',
            language: i % 4 === 0 ? 'English' : i % 4 === 1 ? 'German' : i % 4 === 2 ? 'French' : 'Korean'
        });
    }

    try {
        // Insert sample data into the database
        await Article.insertMany(articlesData);
        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
});
