const multer = require('multer');

//configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // create a unique filename
    }
});

//File filter
const fieldFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {  //file.mimetype: returns the MIME type (e.g., image/jpeg)
        cb(null, true); // accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false); // reject the file
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fieldFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // limit file size to 5MB
    }
});

module.exports = upload;
