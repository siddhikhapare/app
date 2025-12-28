-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forms Table
CREATE TABLE IF NOT EXISTS forms (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Form Fields
CREATE TABLE IF NOT EXISTS form_fields (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  options TEXT,
  required BOOLEAN DEFAULT false,
  field_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Form Responses
CREATE TABLE IF NOT EXISTS form_responses (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Data
CREATE TABLE IF NOT EXISTS response_data (
  id SERIAL PRIMARY KEY,
  response_id INTEGER REFERENCES form_responses(id) ON DELETE CASCADE,
  field_label VARCHAR(255) NOT NULL,
  field_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_forms_user_id ON forms(user_id);
CREATE INDEX IF NOT EXISTS idx_form_fields_form_id ON form_fields(form_id);
CREATE INDEX IF NOT EXISTS idx_form_responses_form_id ON form_responses(form_id);
CREATE INDEX IF NOT EXISTS idx_response_data_response_id ON response_data(response_id);

-- Seed User
INSERT INTO users (id, name, email)
VALUES (1, 'Default User', 'user@example.com')
ON CONFLICT (email) DO NOTHING;

---create user as loginned check for usrid with form getting
-- register user
INSERT INTO users (name, email, password)
VALUES ($1, $2, $3)
RETURNING id, name, email;


SELECT * FROM users WHERE email = $1;
