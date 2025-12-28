const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "your_jwt_secret_key"; // store in .env in production

// User registration (optional)
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields are required" });

//     const hashed = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
//       [name, email, hashed]
//     );

//     res.json({ success: true, user: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Registration failed" });
//   }
// };

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ success: false, message: "Invalid email" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Verify token middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user; // { id, email }
    next();
  });
};

module.exports = {
  //registerUser,
  loginUser,
  verifyToken
};
