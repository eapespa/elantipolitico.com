CREATE TABLE registros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT,
  nombre TEXT,
  apellido1 TEXT,
  apellido2 TEXT,
  email TEXT,
  dni TEXT,
  provincia TEXT,
  monto REAL,
  cuota INTEGER,
  estado TEXT DEFAULT 'pendiente',
  created_at DATETIME,        
  confirmed_at DATETIME      
);