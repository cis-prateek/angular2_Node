const express = require('express');

var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var bcrypt = require('bcrypt');
const saltRounds = 10;


const User = require('../models/user');

var mongooseUrl = 'mongodb://localhost:27017/meanstack';

mongoose.connect(mongooseUrl, function (err) {
    if (err) {
        console.log("Error could'nt connect to mongo");
    }
    else {
        console.log("Success : Connected to mongodb");
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/isEmailExist/:email', (req, res, next) => {

    User.find({ email: req.params.email })
        .then(result => {
            res.json({
                data: result
            });
        });
});


router.delete('/delete/:id', (req, res, next) => {
    User.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Record Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/register', (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {

        bcrypt.hash(req.body.password, salt, function (err, hash) {

            var newData = new User({
                email: req.body.email,
                name: req.body.name,
                password: hash
            });

            newData.save(function (err, user) {

                if (err)
                    res.json("error");
                else
                    res.json(201);
            });
        });
    });
});


router.post('/login', (req, res) => {
    console.log("req.body", req.body)
    // if (typeof req.body === "undefined" && req.body.email && req.body.password) {
    User.find({ email: req.body.email }, function (err, user) {
        console.log("UserData-->", user);
        if (user.length != 0) {

            bcrypt.compare(req.body.password, user[0]['password'], function (err, result) {
                console.log("result-->", result);
                if (result) {
                    return res.json({
                        statusCode: 200,
                        data: user
                    })
                }
                else {
                    return res.json({
                        statusCode: 400
                    });
                }
            });
        }
        else {
            return res.json({
                statusCode: 400
            })
        }
    })
    // }
    //  else {
    // res.status(200).json({
    //     data: "Data is missing",
    //     error: 1
    // });
    // }
});



router.put('/update', (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {

        bcrypt.hash(req.body.newPassword, salt, function (err, hash) {

            var newData = hash

            User.update({ _id: req.body.id }, { $set: { 'password': hash } })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "Product Updated",
                        data: req.body
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    });
});

module.exports = router;    