// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'formbuilder',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

// ============================================
// DATABASE INITIALIZATION QUERIES
// ============================================
const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create forms table
    await client.query(`
      CREATE TABLE IF NOT EXISTS forms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create form_fields table
    await client.query(`
      CREATE TABLE IF NOT EXISTS form_fields (
        id SERIAL PRIMARY KEY,
        form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
        label VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        options TEXT,
        required BOOLEAN DEFAULT false,
        field_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create form_responses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS form_responses (
        id SERIAL PRIMARY KEY,
        form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create response_data table
    await client.query(`
      CREATE TABLE IF NOT EXISTS response_data (
        id SERIAL PRIMARY KEY,
        response_id INTEGER REFERENCES form_responses(id) ON DELETE CASCADE,
        field_label VARCHAR(255) NOT NULL,
        field_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_forms_user_id ON forms(user_id);
      CREATE INDEX IF NOT EXISTS idx_form_fields_form_id ON form_fields(form_id);
      CREATE INDEX IF NOT EXISTS idx_form_responses_form_id ON form_responses(form_id);
      CREATE INDEX IF NOT EXISTS idx_response_data_response_id ON response_data(response_id);
    `);

    // Insert a default user if none exists
    await client.query(`
      INSERT INTO users (id, name, email) 
      VALUES (1, 'Default User', 'user@example.com')
      ON CONFLICT (email) DO NOTHING
    `);

    await client.query('COMMIT');
    console.log('Database tables initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Initialize database on startup
initializeDatabase().catch(console.error);

// ============================================
// API ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============================================
// FORM ROUTES
// ============================================

// GET all forms (with pagination and filtering)
app.get('/api/forms', async (req, res) => {
  try {
    const { limit = 10, offset = 0, user_id } = req.query;
    
    let query = `
      SELECT f.*, u.name as user_name, u.email as user_email,
             COUNT(fr.id) as response_count
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
    
    res.json({
      success: true,
      forms: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch forms',
      message: error.message 
    });
  }
});

// GET single form by ID (with fields)
app.get('/api/forms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get form details
    const formResult = await pool.query(
      `SELECT f.*, u.name as user_name, u.email as user_email
       FROM forms f
       LEFT JOIN users u ON f.user_id = u.id
       WHERE f.id = $1`,
      [id]
    );
    
    if (formResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Form not found' 
      });
    }
    
    // Get form fields
    const fieldsResult = await pool.query(
      `SELECT id, label, type, options, required, field_order
       FROM form_fields
       WHERE form_id = $1
       ORDER BY field_order ASC`,
      [id]
    );
    
    // Parse options from string to array
    const fields = fieldsResult.rows.map(field => ({
      ...field,
      options: field.options ? field.options.split(',') : []
    }));
    
    const form = {
      ...formResult.rows[0],
      fields
    };
    
    res.json({
      success: true,
      form
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch form',
      message: error.message 
    });
  }
});

// POST create new form
app.post('/api/forms', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { title, description, user_id = 1, fields = [] } = req.body;
    
    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Form title is required' 
      });
    }
    
    await client.query('BEGIN');
    
    // Insert form
    const formResult = await client.query(
      `INSERT INTO forms (user_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, user_id, created_at`,
      [user_id, title, description || '']
    );
    
    const formId = formResult.rows[0].id;
    
    // Insert form fields
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
    
    res.status(201).json({
      success: true,
      message: 'Form created successfully',
      formId,
      form: formResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create form',
      message: error.message 
    });
  } finally {
    client.release();
  }
});

// PUT update form
app.put('/api/forms/:id', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { title, description, fields = [] } = req.body;
    
    await client.query('BEGIN');
    
    // Update form
    const formResult = await client.query(
      `UPDATE forms 
       SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [title, description || '', id]
    );
    
    if (formResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        error: 'Form not found' 
      });
    }
    
    // Delete existing fields
    await client.query('DELETE FROM form_fields WHERE form_id = $1', [id]);
    
    // Insert updated fields
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
    
    res.json({
      success: true,
      message: 'Form updated successfully',
      form: formResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update form',
      message: error.message 
    });
  } finally {
    client.release();
  }
});

// DELETE form
app.delete('/api/forms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM forms WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Form not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Form deleted successfully',
      deletedId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete form',
      message: error.message 
    });
  }
});

// ============================================
// FORM RESPONSE ROUTES
// ============================================

// POST submit form response
app.post('/api/forms/:id/responses', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { user_id = 1, responses = {} } = req.body;
    
    // Verify form exists
    const formCheck = await client.query(
      'SELECT id FROM forms WHERE id = $1',
      [id]
    );
    
    if (formCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Form not found' 
      });
    }
    
    await client.query('BEGIN');
    
    // Insert form response
    const responseResult = await client.query(
      `INSERT INTO form_responses (form_id, user_id)
       VALUES ($1, $2)
       RETURNING id, form_id, user_id, submitted_at`,
      [id, user_id]
    );
    
    const responseId = responseResult.rows[0].id;
    
    // Insert response data
    for (const [fieldLabel, fieldValue] of Object.entries(responses)) {
      const valueString = typeof fieldValue === 'boolean' 
        ? fieldValue.toString() 
        : fieldValue;
      
      await client.query(
        `INSERT INTO response_data (response_id, field_label, field_value)
         VALUES ($1, $2, $3)`,
        [responseId, fieldLabel, valueString]
      );
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      responseId,
      response: responseResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error submitting response:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit response',
      message: error.message 
    });
  } finally {
    client.release();
  }
});

// GET all responses for a form
app.get('/api/forms/:id/responses', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get all responses with data
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
    
    res.json({
      success: true,
      responses: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch responses',
      message: error.message 
    });
  }
});

// GET single response details
app.get('/api/responses/:id', async (req, res) => {
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
      return res.status(404).json({ 
        success: false, 
        error: 'Response not found' 
      });
    }
    
    res.json({
      success: true,
      response: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch response',
      message: error.message 
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});