const multer = require("multer")
const path = require("path");
const fs = require("fs");


const generateFolderName = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const time = now.toISOString().split('T')[1].split('.')[0].replace(/:/g, '-');
    return `${date} ${time}`;
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {filePath} = req.body;
        const dirName = filePath ? filePath : generateFolderName()
        const filepath = path.join('D:/DocMeliora/Meliora/MedVallet/ImageofVehicle', `${dirName}`);
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        req.filePath = dirName;
        cb(null, filepath);
    },
    filename: (req, file, cb) => {
        const isPaymentFile = file.originalname.startsWith('payment_');
        const isDefaultImage = file.originalname.startsWith('default_vehicle_');
        req.isPaymentFile = isPaymentFile;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);

        let filename;

        if (isDefaultImage) {
            filename = `default_vehicle_${uniqueSuffix}${extension}`;
        } else if (isPaymentFile) {
            filename = `payment_${uniqueSuffix}${extension}`;
        } else {
            filename = `vehicle_${uniqueSuffix}${extension}`;
        }

        cb(null, filename);
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            console.error("Invalid file type:", file.mimetype);
            cb(new Error('Only .png, .jpg, and .jpeg are allowed'), false);
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }
}).array('files', 6);

module.exports = {
    upload
}




