const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { insertProfile, getProfilePic } = require('../fileupload/fileupload.service')
const logger = require('../../logger/logger')







const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("req");
        const id = req.body.req_no;
        // console.log(id);
        // File or directtory check
        // const filepath = path.join('E:/', "PersonalRecords", `${id}`)
        // const filepath = path.join(__dirname, "api", `${id}`)
        // console.log(filepath)

        // if (fs.existsSync(filepath)) {
        //     // Do something
        //     // console.log("file excist")
        //     cb(null, `${filepath}`);
        // } else {
        //     fs.mkdir(path.join('E:', "/PersonalRecords", `${id}`), {}, (err) => {

        //         // console.log(err);
        //         if (err) {
        //             return cb(new Error('Error Occured while Mkdir'));
        //         }
        //         cb(null, `${filepath}`);
        //     })
        // }
        // cb(null, 'D:/Upload')

        cb(null, "D:/upload");

    },
    // filename: function (req, file, cb) {
    //     cb(null, 'profilePic' + path.extname(file.originalname))
    // },



    filename: function (req, file, cb) {
        cb(null, req.body.name);

    }
})

const maxSize = 1 * 1024 * 1024

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {

    //     console.log("file");
    //     console.log(file);
    //     if (
    //         file.mimetype == "image/png" ||
    //         file.mimetype == "image/jpg" ||
    //         file.mimetype == "image/jpeg"
    //     ) {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         // console.log('Only .png, .jpg and .jpeg format allowed!')
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // },
    // limits: { fileSize: maxSize }
}).single('file');

module.exports = {

    uploadFile: (req, res) => {
        //console.log(req);
        //  console.log(req.body.em_id);
        console.log(req);
        // upload(req, res, (err) => {
        //     const body = req.body;
        //     // console.log(req.body);
        //     // console.log(req.file);
        //     // console.log(body)
        //     // FILE SIZE ERROR
        //     if (err instanceof multer.MulterError) {
        //         // return res.end("Max file size 2MB allowed!");
        //         return res.status(200).json({
        //             status: 0,
        //             message: "Max file size 2MB allowed!",
        //         })
        //     }
        //     // INVALID FILE TYPE, message will return from fileFilter callback
        //     else if (err) {
        //         logger.errorLogger(err)
        //         // return res.end(err.message);
        //         return res.status(200).json({
        //             status: 0,
        //             message: err.message,
        //         })
        //     }
        //     // FILE NOT SELECTED
        //     else if (!req.file) {
        //         // return res.end("File is required!");
        //         return res.status(200).json({
        //             status: 0,
        //             message: "File is required!",
        //         })
        //     }
        //     // SUCCESS
        //     // else {
        //     //     // console.log("File uploaded successfully!");
        //     //     // console.log("File response", req.file);

        //     //     insertProfile(body, (err, results) => {
        //     //         if (err) {
        //     //             logger.errorLogger(err)
        //     //             return res.status(200).json({
        //     //                 success: 0,
        //     //                 message: err
        //     //             });
        //     //         }

        //     //         return res.status(200).json({
        //     //             success: 1,
        //     //             message: "File Uploaded SuccessFully"
        //     //         });
        //     //     })
        //     // }


        // })
    },
    // getEmployeeProfilePic: (req, res) => {
    //     const body = req.body;

    //     getProfilePic(body, (err, results) => {
    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     })
    // }
}