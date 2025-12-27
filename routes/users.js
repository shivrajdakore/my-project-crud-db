const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: alex123
 *               email:
 *                 type: string
 *                 example: a@test.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               mobile:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", (req, res) => {
  const { username, email, password, mobile } = req.body;
  db.query(
    "INSERT INTO users (username, email, password, mobile) VALUES (?, ?, ?, ?)",
    [username, email, password, mobile],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users list
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (!results.length)
        return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    }
  );
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details (username, email, password, mobile)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: alex456
 *               email:
 *                 type: string
 *                 example: newemail@test.com
 *               password:
 *                 type: string
 *                 example: newpass123
 *               mobile:
 *                 type: string
 *                 example: "0987654321"
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/:id", (req, res) => {
  const { username, email, password, mobile } = req.body;
  db.query(
    "UPDATE users SET username=?, email=?, password=?, mobile=? WHERE id=?",
    [username, email, password, mobile, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated" });
    }
  );
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User deleted" });
    }
  );
});

module.exports = router;
