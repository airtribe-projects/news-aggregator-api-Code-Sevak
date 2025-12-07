const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const dummyNews = [
  {
    id: 1,
    title: 'Breaking News: AI Revolutionizes Tech Industry',
    content:
      'In a groundbreaking development, artificial intelligence is transforming the technology sector with unprecedented advancements...', 
  },
  {
    id: 2,
    title: 'Sports Update: Local Team Wins Championship',
    content:
      'In an exciting finale, the local basketball team clinched the championship title, bringing joy to fans across the city.',
  },
  {
    id: 3,
    title: 'Weather Alert: Severe Storms Expected',
    content:
      'Meteorologists are warning of severe storms approaching the region, urging residents to take necessary precautions.',
  },
];

const getNews = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing.' });
    }
     const userData = jwt.verify(token, process.env.JWT_SECRET);
     req.user = userData;
    const userId = req.user.userId;

    const user = await userSchema.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const preferences = user.preferences || [];
    const queryParams = preferences.length
      ? `?q=${preferences.join(',')}`
      : '';
      const news = await axios.get(`https://newsapi.org/v2/everything${queryParams}&apiKey=${process.env.NEWS_API_KEY}`); 
    // Here, you can customize the news based on user preferences if needed
    res.status(200).json({ news: news.data.articles || dummyNews });
};

module.exports = {
  getNews,
};
