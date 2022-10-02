var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
const AuthController = require('../Controllers/AuthController');
const Auth = require("../Middleware/Auth");
const upload = require("../Middleware/fileUpload");

// let Controllers = require('../Controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Register',AuthController.Register)
router.post('/Login', AuthController.Login)
router.get('/getAllusers',Auth,AuthController.getAllusers);
router.post('/UploadFile', Auth,upload,AuthController.UploadFile);
router.post('/pagination', Auth,AuthController.pagination);
router.get('/search', Auth, AuthController.search);
router.get('/getdat', Auth, AuthController.getdat);











module.exports = router;
