const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');


const getNews = async (req, res) => {
  try { 
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing.' });
    }
    const userId = req.userId;
    
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
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
    res.status(200).json({ news: news.data.articles || [] });
} catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
}
};


module.exports = {
  getNews,
};

