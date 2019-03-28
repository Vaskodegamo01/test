const config = require('../config');
const nanoid = require('nanoid');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.get('Token');

    if (!token) {
        return res.status(401).send({message: 'No token present'});
    }

    const user = await User.findOne({token: token});

    if (!user) {
        return res.status(401).send({message: 'Token incorrect'});
    }

    req.user = user;

    next();
};

module.exports = auth;
