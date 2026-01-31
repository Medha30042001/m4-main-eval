CREATE TABLE userss(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
    CHECK(role IN ('customer', 'owner', 'driver')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)