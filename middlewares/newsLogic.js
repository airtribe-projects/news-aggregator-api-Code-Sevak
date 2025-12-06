const userSchema = require('../models/userModel');
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

const getNews = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing.' });
    }

    res.status(200).json({ news: dummyNews });
};

module.exports = {
  getNews,
};
