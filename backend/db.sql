-- forms table
CREATE TABLE forms (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- form_fields table
CREATE TABLE form_fields (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,       -- or TEXT[], or TEXT storing comma-separated
  required BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
