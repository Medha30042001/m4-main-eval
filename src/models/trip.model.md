CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL,
  vehicle_id UUID NOT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL,

  location TEXT NOT NULL,
  distance_km NUMERIC NOT NULL
    CHECK (distance_km > 0),
  passengers INTEGER NOT NULL,
  tripCost NUMERIC DEFAULT 0,
  isCompleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_vehicle
    FOREIGN KEY (vehicle_id)
    REFERENCES vehicles(id)
    ON DELETE CASCADE
)