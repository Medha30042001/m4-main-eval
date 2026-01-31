CREATE TABLE vehicles(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  allowed_passengers INTEGER NOT NULL
    CHECK(rate_per_km > 0),
  isAvaiable BOOLEAN DEFAULT TRUE,
  driver_id UUID NULL,
  owner_id UUID NOT NULL,
  rate_per_km NUMERIC NOT NULL
    CHECK (rate_per_km > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_owner
    FOREIGN KEY(owner_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_driver 
    FOREIGN KEY (driver_id)
    REFERENCES users(id)
    ON DELETE SET NULL
)