import multer from "multer";
import path from "path";

// Configuration du stockage avec renommage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = path.extname(originalName) || ".m4a"; // Par défaut, ajoutez .m4a si aucune extension
    cb(null, `${Date.now()}${extension}`);
  },
});

// Middleware multer
const upload = multer({ storage });

export default upload;
