-- 1. Habilitar el soporte para claves foráneas (por defecto viene deshabilitado)
PRAGMA foreign_keys = ON;

-- 2. Crear tabla de Estudios (Padre)
CREATE TABLE estudios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    pais TEXT NOT NULL
);

-- 3. Crear tabla de Videojuegos (Hija con FK)
CREATE TABLE videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    fecha_lanzamiento INTEGER NOT NULL,
    estudio_id INTEGER NOT NULL,
    FOREIGN KEY (estudio_id) REFERENCES estudios(id) ON DELETE CASCADE
);
-- Insertar datos en "estudios"
INSERT INTO estudios (nombre, pais) VALUES ('Nintendo', 'Japón');
INSERT INTO estudios (nombre, pais) VALUES ('FromSoftware', 'Japón');
INSERT INTO estudios (nombre, pais) VALUES ('CD Projekt Red', 'Polonia');
INSERT INTO estudios (nombre, pais) VALUES ('Ubisoft', 'Francia');

-- Insertar datos en "videojuegos" asociados a los estudios
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('The Legend of Zelda: Tears of the Kingdom', 2023, 1);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('Super Mario Odyssey', 2017, 1);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('Elden Ring', 2022, 2);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('Dark Souls 3', 2016, 2);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('Cyberpunk 2077', 2020, 3);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('The Witcher 3', 2015, 3);
INSERT INTO videojuegos (titulo, fecha_lanzamiento, estudio_id) VALUES ('Assassin''s Creed Valhalla', 2020, 4);
