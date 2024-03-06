const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");
const fileUpload = require("express-fileupload");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./handlers/auth");
const { upload, download } = require("./handlers/storage");

require("./pkg/db");

const app = express();

// middlewares
app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      //dokolku sme na nekoja od ovie pateki nema da ni bara da bideme avtenticirani
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
    ],
  })
);

app.use(fileUpload());

// api.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
// }));

// Auth routes
app.post("/api/auth/login", login);
app.get("/api/auth/refresh-token", refreshToken);
app.post("/api/auth/register", register);
app.post("/api/auth/reset-password", resetPassword);

// Storage routes
app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);

// Homework
// app.delete("/api/storage/:filename", removeFile);
// app.get("/api/list", listFilesForUser)

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
