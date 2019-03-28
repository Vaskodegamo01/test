const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('../config');
const request = require('request-promise-native');
const nanoid = require('nanoid');

const createRouter = () => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.save()
            .then(user => res.send(user))
            .catch(error => res.status(400).send(error))
    });

    router.post('/sessions', async (req, res) => {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(400).send({error: 'Username not found'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong!'});
        }

        user.token = user.generateToken();

        await user.save();

        return res.send({message: 'User and password correct!', user});
    });

    router.post('/facebookLogin', async (req, res) => {

        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${req.body.accessToken}&access_token=${config.facebook.appId}|${config.facebook.appSecret}`

        try {
            const response = await request(debugTokenUrl);
            const decodedResponse = JSON.parse(response);

            if(decodedResponse.data.hasOwnProperty('error')) {
                return res.status(401).send({message: 'Facebook token incorrect'});
            }

            if(req.body.id !== decodedResponse.data.user_id) {
                return res.status(401).send({message: 'Wrong user ID'});
            }

            let user = await User.findOne({facebookId: req.body.id});

            if(!user) {
                user = new User({
                    username: req.body.email,
                    password: nanoid(10),
                    facebookId: req.body.id,
                    avatar: req.body.picture.data.url
                });

                user.token = user.generateToken();
                await user.save();
            }

            return res.send(user);

        } catch (error) {
            return  res.status(500).send({message: 'Internal error'});
        }

    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get('Token');
        const success = {message: 'Logout success!'};

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    });

    return router;
};

module.exports = createRouter;