const Userdata = require('../Models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var uploads = require("../Models/Upload")
const paginate = require('express-paginate');
const {Op} = require("sequelize");


exports.Register = async (req, res) => {

    const errors = validationResult(req);
    if (! errors.isEmpty()) {

        return res.json(errors);
    } else {

        const {name, email, password} = req.body;

        const hashpassword = await bcrypt.hashSync(password, 12);
        const add = await Userdata.create({Name: name, email: email, password: hashpassword});


        return res.status(201).json({status: true, data: add, message: "user  created successfully"});


    }
}
exports.Login = async (req, res) => {

    const data = await Userdata.findOne({
        where: {
            email: req.body.email
        }
    });

    const validpass = bcrypt.compareSync(req.body.password, data.password);


    if (req.body.email === data.email && validpass) {
        console.log(data.id, "dfsfgh");

        const token = jwt.sign({
            userId: data.id
        }, process.env.JWT_SECRET, {expiresIn: '1000h'});
        res.send({"status": "true", "message": "User Login successfully", data: token});

    } else {
        res.send({"status": "false", "message": "User failed Login "});

    }
}
exports.getAllusers = async (req, res) => {
    try {
        const data = await Userdata.findAll();
        if (data) {
            res.status(200).send({status: true, message: "user fetched successfully", data: data});
        }


    } catch (error) {
        res.status(200).send({status: false, message: "user failed to fetch data"});

    }

}

exports.UploadFile = async (req, res) => {

    try { // console.log(req.body.title, , req.files[0].path, req.userId, "dsslajklfh;kjplkj");


        const data = await uploads.create({title: req.body.title, description: req.body.description, video: req.files[0].path, userId: req.userId});


        data.save();
        console.log(data, "dfsghgjkhgjgfdsadfghfds");

        if (data) {

            res.status(201).json({status: true, message: "fileupload save successfully", data: data});
        }

    } catch (error) {
        res.status(200).json({status: false, message: "fileupload failed"});
    }


}

exports.pagination = async (req, res) => {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startingIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const data = await uploads.findAll();

    if (startingIndex > 0) {
        results.previous = {
            page: page,
            limit: limit - 1
        };
    }
    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    results.results = data.slice(startingIndex, endIndex);


    res.json(results);


}

exports.search = async (req, res) => {
    // try {

    // console.log(req.body.name, "dffgggg")
    const search = req.query.search;
    console.log(search, "GGGGGG")

    const data = await Userdata.findAll({
        where: {
            [Op.and]: [

                {
                    Name: {
                        [Op.iLike]: "%" + search + "%"


                    }
                },
                // {
                //     email: {
                //         [Op.regexp]: '^[k|s|a]'
                //     }
                // },


            ]
        }


    });
    console.log(data, "dkflghlk");

    if (data == null) {
        res.status(500).json({status: false, message: "Failed to fetch data"});
    } else {

        res.status(200).json({status: true, message: "data fetching successfully", 'data': data});
    }


    // } catch (error) {
    //     res.status(500).json({status: false, message: "something went wrong"});

    // }
}

exports.getdat = async (req, res) => {
    const data = await Userdata.findAll({
            where: {
                id: {
                    [Op.between]: [1, 9]
                }
            },
            order: [
                ['id', 'DESC']
            ]

            });
        if(data != null) {
            res.status(200).json({status: true, message: "data fetching successfully", data: data});

        } else {
            res.status(500).json({status: false, message: "data fetching failed"});
        }

    }

// 

exports.stvm  = (req,res)=>{

}
