const jwt = require('jsonwebtoken');    

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing.' });
    }
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
