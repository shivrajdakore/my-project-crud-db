const express = require("express");
const db = require("../db");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer config for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Serve uploaded files statically
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// CREATE user with photo
router.post("/", upload.single("photo"), (req, res) => {
  const { username, email, password, mobile } = req.body;
  let photoUrl = null;

  if (req.file) {
    photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  db.query(
    "INSERT INTO users (username, email, password, mobile, photo) VALUES (?, ?, ?, ?, ?)",
    [username, email, password, mobile, photoUrl],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, photo: photoUrl });
    }
  );
});

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET user by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

// UPDATE user
router.put("/:id", upload.single("photo"), (req, res) => {
  const { username, email, password, mobile } = req.body;
  let photoUrl = null;

  if (req.file) {
    photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  db.query(
    "UPDATE users SET username=?, email=?, password=?, mobile=?, photo=COALESCE(?, photo) WHERE id=?",
    [username, email, password, mobile, photoUrl, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated", photo: photoUrl });
    }
  );
});

// DELETE user
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
