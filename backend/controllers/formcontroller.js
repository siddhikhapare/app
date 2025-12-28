const pool = require('../db');

// GET all forms
exports.getAllForms = async (req, res) => {
  try {
    const { limit = 10, offset = 0, user_id } = req.query;

    let query = `
      SELECT f.*, u.name AS user_name, u.email AS user_email,
             COUNT(fr.id) AS response_count
      FROM forms f
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN form_responses fr ON f.id = fr.form_id
    `;

    const queryParams = [];

    if (user_id) {
      query += ' WHERE f.user_id = $1';
      queryParams.push(user_id);
    }

    query += `
      GROUP BY f.id, u.name, u.email
      ORDER BY f.created_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    res.json({ success: true, forms: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('Error fetching forms:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch forms', message: err.message });
  }
};

// Add more methods like getFormById, createForm, updateForm, deleteForm, submitResponse etc.
