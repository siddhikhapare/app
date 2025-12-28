// routes/forms.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /forms — create a new form with fields
router.post('/', async (req, res) => {
  const { title, description, user_id, fields } = req.body;
  if (!title || !user_id || !Array.isArray(fields)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // Insert into forms table
    const formInsert = await client.query(
      `INSERT INTO forms (title, description, user_id)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [title, description, user_id]
    );
    const formId = formInsert.rows[0].id;

    // Insert each field
    const fieldInsertPromises = fields.map((f, idx) => {
      const { label, type, options, required } = f;
      // store options as JSON or text array
      return client.query(
        `INSERT INTO form_fields
         (form_id, label, type, options, required, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [formId, label, type, JSON.stringify(options || []), required, idx]
      );
    });

    await Promise.all(fieldInsertPromises);

    await client.query('COMMIT');
    res.status(201).json({ success: true, formId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error inserting form:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// (Optional) GET /forms/:id — fetch a form with its fields
router.get('/:id', async (req, res) => {
  const formId = req.params.id;
  try {
    const formRes = await db.query(
      `SELECT id, title, description, user_id
       FROM forms
       WHERE id = $1`,
      [formId]
    );
    if (formRes.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    const form = formRes.rows[0];

    const fieldsRes = await db.query(
      `SELECT id, label, type, options, required, sort_order
       FROM form_fields
       WHERE form_id = $1
       ORDER BY sort_order`,
      [formId]
    );

    // parse options JSON
    const fields = fieldsRes.rows.map((f) => ({
      id: f.id,
      label: f.label,
      type: f.type,
      options: f.options, // might parse if stored as JSON string
      required: f.required,
      sort_order: f.sort_order,
    }));

    res.json({ form, fields });
  } catch (err) {
    console.error('Error fetching form:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
