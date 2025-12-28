// To implement logging at a production level using **Winston**, we will need to configure Winston for various log levels (info, error, debug) and output logs to different places, like console or files. This allows us to have detailed logs in a file for production while still showing important logs in the console during development.

// ### Step 1: Install `winston`

// First, you'll need to install the `winston` package:

// ```bash
// npm install winston
// ```

// ### Step 2: Set up Winston Configuration

// Create a new file `logger.js` in a `utils` or `config` folder for managing Winston's logging configuration.

// **`utils/logger.js`**:

// ```js
// const winston = require('winston');
// const path = require('path');

// // Define log formats
// const logFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(({ timestamp, level, message, stack }) => {
//     return `${timestamp} ${level}: ${stack || message}`;
//   })
// );

// // Define the transports (where logs should go)
// const transports = [
//   new winston.transports.Console({
//     format: winston.format.combine(
//       winston.format.colorize(),
//       logFormat
//     ),
//     level: 'info'  // Change this to 'debug' in development if needed
//   }),
//   new winston.transports.File({
//     filename: path.join(__dirname, '../logs/error.log'),
//     level: 'error',
//     format: logFormat
//   }),
//   new winston.transports.File({
//     filename: path.join(__dirname, '../logs/combined.log'),
//     level: 'info',
//     format: logFormat
//   })
// ];

// // Create logger instance
// const logger = winston.createLogger({
//   level: 'info',  // Change this to 'debug' in development
//   transports: transports
// });

// module.exports = logger;
// ```

// ### Step 3: Use Logger in Your App

// Now that we have configured the logger, we can use it in the routes and controllers to log important events and errors.

// ### Example Usage of the Logger

// **In your `controllers/formController.js`:**

// 1. **Log important operations**: Whenever something important happens (like form creation, updates, or submissions), log the event.
// 2. **Log errors**: Use the logger to capture errors.

// ```js
// const pool = require('../db');
// const logger = require('../utils/logger');

// // GET all forms
// const getAllForms = async (req, res) => {
//   try {
//     const { limit = 10, offset = 0, user_id } = req.query;

//     let query = `
//       SELECT f.*, u.name AS user_name, u.email AS user_email,
//              COUNT(fr.id) AS response_count
//       FROM forms f
//       LEFT JOIN users u ON f.user_id = u.id
//       LEFT JOIN form_responses fr ON f.id = fr.form_id
//     `;

//     const queryParams = [];
//     if (user_id) {
//       query += ' WHERE f.user_id = $1';
//       queryParams.push(user_id);
//     }

//     query += `
//       GROUP BY f.id, u.name, u.email
//       ORDER BY f.created_at DESC
//       LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
//     `;

//     queryParams.push(limit, offset);

//     const result = await pool.query(query, queryParams);

//     logger.info(`Fetched ${result.rows.length} forms successfully.`);
//     res.json({ success: true, forms: result.rows, count: result.rows.length });
//   } catch (err) {
//     logger.error(`Error fetching forms: ${err.message}`);
//     res.status(500).json({ success: false, error: 'Failed to fetch forms', message: err.message });
//   }
// };

// // POST create new form
// const createForm = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const { title, description, user_id = 1, fields = [] } = req.body;

//     if (!title || !title.trim()) {
//       logger.error('Form creation failed: Title is required');
//       return res.status(400).json({
//         success: false,
//         error: 'Form title is required',
//       });
//     }

//     await client.query('BEGIN');
//     const formResult = await client.query(
//       `INSERT INTO forms (user_id, title, description)
//        VALUES ($1, $2, $3)
//        RETURNING id, title, description, user_id, created_at`,
//       [user_id, title, description || '']
//     );

//     const formId = formResult.rows[0].id;

//     if (fields.length > 0) {
//       for (let i = 0; i < fields.length; i++) {
//         const field = fields[i];
//         const optionsString = Array.isArray(field.options)
//           ? field.options.join(',')
//           : field.options || '';

//         await client.query(
//           `INSERT INTO form_fields (form_id, label, type, options, required, field_order)
//            VALUES ($1, $2, $3, $4, $5, $6)`,
//           [formId, field.label, field.type, optionsString, field.required || false, i]
//         );
//       }
//     }

//     await client.query('COMMIT');

//     logger.info(`Form created successfully: ${title} (ID: ${formId})`);
//     res.status(201).json({
//       success: true,
//       message: 'Form created successfully',
//       formId,
//       form: formResult.rows[0],
//     });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     logger.error(`Error creating form: ${error.message}`);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to create form',
//       message: error.message,
//     });
//   } finally {
//     client.release();
//   }
// };

// // POST submit form response
// const submitFormResponse = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const { id } = req.params;
//     const { user_id = 1, responses = {} } = req.body;

//     const formCheck = await client.query(
//       'SELECT id FROM forms WHERE id = $1',
//       [id]
//     );

//     if (formCheck.rows.length === 0) {
//       logger.error(`Form ID ${id} not found.`);
//       return res.status(404).json({
//         success: false,
//         error: 'Form not found',
//       });
//     }

//     await client.query('BEGIN');
//     const responseResult = await client.query(
//       `INSERT INTO form_responses (form_id, user_id)
//        VALUES ($1, $2)
//        RETURNING id, form_id, user_id, submitted_at`,
//       [id, user_id]
//     );

//     const responseId = responseResult.rows[0].id;

//     for (const [fieldLabel, fieldValue] of Object.entries(responses)) {
//       const valueString = typeof fieldValue === 'boolean'
//         ? fieldValue.toString()
//         : fieldValue;

//       await client.query(
//         `INSERT INTO response_data (response_id, field_label, field_value)
//          VALUES ($1, $2, $3)`,
//         [responseId, fieldLabel, valueString]
//       );
//     }

//     await client.query('COMMIT');

//     logger.info(`Form response submitted successfully: Form ID ${id}, Response ID ${responseId}`);
//     res.status(201).json({
//       success: true,
//       message: 'Response submitted successfully',
//       responseId,
//       response: responseResult.rows[0],
//     });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     logger.error(`Error submitting response for Form ID ${id}: ${error.message}`);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to submit response',
//       message: error.message,
//     });
//   } finally {
//     client.release();
//   }
// };

// module.exports = {
//   getAllForms,
//   createForm,
//   submitFormResponse,
// };
// ```

// ### Step 4: Add Logging to Other Controllers

// You can now follow the same pattern to add logging to other controller methods. Here are a few guidelines:

// * **Info Logs**: Use for successful operations, such as creating forms or submitting responses.
// * **Error Logs**: Use for catching errors, such as failed form submissions or database errors.
// * **Debug Logs**: If needed, you can use `logger.debug()` for debugging purposes. For example, if you want to log the request body or headers in development, you could do:

//   ```js
//   logger.debug(`Request body: ${JSON.stringify(req.body)}`);
//   ```

// ### Step 5: Create Log Files and Directories

// Make sure the logs directory exists, as Winston will write logs to these files. You can manually create the `logs` folder in your project root, or ensure it's created programmatically.

// If you want to create the directory programmatically before logging to files, you can do something like this in your `logger.js`:

// ```js
// const fs = require('fs');
// const logDir = path.join(__dirname, '../logs');

// // Ensure logs directory exists
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }
// ```

// ### Conclusion

// Now, you have a production-ready logging solution with **Winston** that handles:

// * Logging to the console with colorized output for easy development debugging.
// * Writing detailed logs (info, error) to files for persistence.
// * Structured log output with timestamps, log levels, and stack traces.
// * Error handling in your routes and controllers.

// This logging structure is flexible and can be adjusted to meet specific needs, such as logging to external services like **Loggly**, **AWS CloudWatch**, or **
