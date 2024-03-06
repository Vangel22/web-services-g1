const fs = require("fs");
const makeId = require("../pkg/strings");

// 1 byte = 8 bits
// 1 kilobyte KB = 1024 bytes
// 1 megabyte MB = 1024 KB
// 1 gigabyte GB = 1024 MB

const MAX_FILESIZE = 1048576; // 1024 * 1024 = 1 MB
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/pjpeg",
  "image/gif",
];

// frontend - allowed poleto ne postoi karikiram
// <form> <input type="file" allowed=["jpg, png, svg"] /> </form>

const upload = async (req, res) => {
  console.log("files", req.files);
  // req.files.file
  // treba da proverime dali fajlot koj sto bil ispraten e pogolem od MAX_FILESIZE
  // req.files doagja od express-fileupload kade sto se populira poleto
  // .document se odnesuva na key koga prikacuvame fajl
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size!");
  }
  // istata proverka obratno
  //   if(req.files.document.size > MAX_FILESIZE) {
  //     return res.status(400).send("File exceeds max file size!");
  //   }
  // dali tipot na fajlot e dozvolen
  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed");
  }

  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  let fileName = `${makeId(6)}_${req.files.document.name}`; // 872hd8_imenafajl.png
  let filePath = `${userDirPath}/${fileName}`;

  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal server error!");
    }
    return res.status(201).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  let filePath = `${userDirPath}/${req.params.filename}`;
  console.log("file path", filePath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found!");
  }

  res.download(filePath);
};

module.exports = {
  upload,
  download,
};
