const pool = require('../db');
const logger = require('../utils/logger');

// GET all forms
const getAllForms = async (req, res) => {
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

    logger.info(`Fetched ${result.rows.length} forms`);
    res.json({ success: true, forms: result.rows, count: result.rows.length });
  } catch (err) {
    logger.error('Error fetching forms', err);
    res.status(500).json({ success: false, error: 'Failed to fetch forms', message: err.message });
  }
};

// GET single form by ID (with fields)
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const formResult = await pool.query(
      `SELECT f.*, u.name as user_name, u.email as user_email
       FROM forms f
       LEFT JOIN users u ON f.user_id = u.id
       WHERE f.id = $1`,
      [id]
    );

    if (formResult.rows.length === 0) {
      logger.warn(`Form not found with ID: ${id}`);
      return res.status(404).json({ success: false, error: 'Form not found' });
    }

    const fieldsResult = await pool.query(
      `SELECT id, label, type, options, required, field_order
       FROM form_fields
       WHERE form_id = $1
       ORDER BY field_order ASC`,
      [id]
    );

    const fields = fieldsResult.rows.map(field => ({
      ...field,
      options: field.options ? field.options.split(',') : []
    }));

    const form = {
      ...formResult.rows[0],
      fields
    };

    logger.info(`Fetched form with ID: ${id}`);
    res.json({ success: true, form });
  } catch (error) {
    logger.error('Error fetching form', error);
    res.status(500).json({ success: false, error: 'Failed to fetch form', message: error.message });
  }
};

// POST create new form
const createForm = async (req, res) => {
  const client = await pool.connect();

  try {
    const { title, description, user_id = 1, fields = [] } = req.body;

    if (!title || !title.trim()) {
      logger.warn('Attempted to create form without title');
      return res.status(400).json({ success: false, error: 'Form title is required' });
    }

    await client.query('BEGIN');

    const formResult = await client.query(
      `INSERT INTO forms (user_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, user_id, created_at`,
      [user_id, title, description || '']
    );

    const formId = formResult.rows[0].id;

    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const optionsString = Array.isArray(field.options)
          ? field.options.join(',')
          : field.options || '';

        await client.query(
          `INSERT INTO form_fields (form_id, label, type, options, required, field_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [formId, field.label, field.type, optionsString, field.required || false, i]
        );
      }
    }

    await client.query('COMMIT');
    logger.info(`Form created successfully: ID ${formId} by user ${user_id}`);

    res.status(201).json({
      success: true,
      message: 'Form created successfully',
      formId,
      form: formResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating form', error);
    res.status(500).json({ success: false, error: 'Failed to create form', message: error.message });
  } finally {
    client.release();
  }
};

// PUT update form
const updateForm = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { title, description, fields = [] } = req.body;

    await client.query('BEGIN');

    const formResult = await client.query(
      `UPDATE forms 
       SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [title, description || '', id]
    );

    if (formResult.rows.length === 0) {
      await client.query('ROLLBACK');
      logger.warn(`Attempted to update non-existent form with ID: ${id}`);
      return res.status(404).json({ success: false, error: 'Form not found' });
    }

    await client.query('DELETE FROM form_fields WHERE form_id = $1', [id]);

    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const optionsString = Array.isArray(field.options)
          ? field.options.join(',')
          : field.options || '';

        await client.query(
          `INSERT INTO form_fields (form_id, label, type, options, required, field_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [id, field.label, field.type, optionsString, field.required || false, i]
        );
      }
    }

    await client.query('COMMIT');
    logger.info(`Form updated: ID ${id}`);
    res.json({ success: true, message: 'Form updated successfully', form: formResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error updating form', error);
    res.status(500).json({ success: false, error: 'Failed to update form', message: error.message });
  } finally {
    client.release();
  }
};

// DELETE form
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM forms WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      logger.warn(`Delete failed - Form not found: ID ${id}`);
      return res.status(404).json({ success: false, error: 'Form not found' });
    }

    logger.info(`Form deleted: ID ${id}`);
    res.json({ success: true, message: 'Form deleted successfully', deletedId: result.rows[0].id });
  } catch (error) {
    logger.error('Error deleting form', error);
    res.status(500).json({ success: false, error: 'Failed to delete form', message: error.message });
  }
};

// POST submit form response
const submitFormResponse = async (req, res) => {
  const client = await pool.connect();

  try { 
    const { id } = req.params;
    const { user_id = 1, responses = {} } = req.body;

    const formCheck = await client.query('SELECT id FROM forms WHERE id = $1', [id]);

    if (formCheck.rows.length === 0) {
      logger.warn(`Response submission failed - Form not found: ID ${id}`);
      return res.status(404).json({ success: false, error: 'Form not found' });
    }

    await client.query('BEGIN');

    const responseResult = await client.query(
      `INSERT INTO form_responses (form_id, user_id)
       VALUES ($1, $2)
       RETURNING id, form_id, user_id, submitted_at`,
      [id, user_id]
    );

    const responseId = responseResult.rows[0].id;

    for (const [fieldLabel, fieldValue] of Object.entries(responses)) {
      const valueString = typeof fieldValue === 'boolean' ? fieldValue.toString() : fieldValue;

      await client.query(
        `INSERT INTO response_data (response_id, field_label, field_value)
         VALUES ($1, $2, $3)`,
        [responseId, fieldLabel, valueString]
      );
    }

    await client.query('COMMIT');
    logger.info(`Response submitted: Response ID ${responseId} for form ${id}`);

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      responseId,
      response: responseResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK'); //here note for rollback check to avoid or not
    logger.error('Error submitting response', error);
    res.status(500).json({ success: false, error: 'Failed to submit response', message: error.message });
  } finally {
    client.release();
  }
};

// GET all responses for a form
const getAllResponses = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
         fr.id as response_id,
         fr.submitted_at,
         u.name as user_name,
         u.email as user_email,
         json_agg(
           json_build_object(
             'field_label', rd.field_label,
             'field_value', rd.field_value
           )
         ) as response_data
       FROM form_responses fr
       LEFT JOIN users u ON fr.user_id = u.id
       LEFT JOIN response_data rd ON fr.id = rd.response_id
       WHERE fr.form_id = $1
       GROUP BY fr.id, u.name, u.email
       ORDER BY fr.submitted_at DESC`,
      [id]
    );

    logger.info(`Fetched ${result.rows.length} responses for form ID: ${id}`);
    res.json({ success: true, responses: result.rows, count: result.rows.length });
  } catch (error) {
    logger.error('Error fetching responses', error);
    res.status(500).json({ success: false, error: 'Failed to fetch responses', message: error.message });
  }
};

// GET single response
const getSingleResponse = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
         fr.id,
         fr.form_id,
         fr.submitted_at,
         f.title as form_title,
         u.name as user_name,
         u.email as user_email,
         json_agg(
           json_build_object(
             'field_label', rd.field_label,
             'field_value', rd.field_value
           )
         ) as response_data
       FROM form_responses fr
       LEFT JOIN forms f ON fr.form_id = f.id
       LEFT JOIN users u ON fr.user_id = u.id
       LEFT JOIN response_data rd ON fr.id = rd.response_id
       WHERE fr.id = $1
       GROUP BY fr.id, f.title, u.name, u.email`,
      [id]
    );

    if (result.rows.length === 0) {
      logger.warn(`Response not found: ID ${id}`);
      return res.status(404).json({ success: false, error: 'Response not found' });
    }

    logger.info(`Fetched response ID: ${id}`);
    res.json({ success: true, response: result.rows[0] });
  } catch (error) {
    logger.error('Error fetching response', error);
    res.status(500).json({ success: false, error: 'Failed to fetch response', message: error.message });
  }
};

module.exports = {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
  submitFormResponse,
  getAllResponses,
  getSingleResponse
};


/*
Final Thoughts:

Logged only what matters: success and error events.

Avoided over-logging (e.g., no logging inside every loop).

You can now add a log rotation strategy for large-scale deployments with something like winston-daily-rotate-file.

Would you like to add request-level logging middleware or test log output next?
 */