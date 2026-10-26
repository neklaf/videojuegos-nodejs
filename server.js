const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta 1: Obtener la lista de estudios para el filtro
app.get('/api/estudios', async (req, res) => {
    try {
        const estudios = await db('estudios').select('*');
        res.json(estudios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta 2: Obtener videojuegos con JOIN a la tabla estudios y filtro opcional
app.get('/api/videojuegos', async (req, res) => {
    try {
        const { estudio_id } = req.query;

        // Consulta usando el Query Builder de Knex
        let query = db('videojuegos')
            .join('estudios', 'videojuegos.estudio_id', '=', 'estudios.id')
            .select(
                'videojuegos.id',
                'videojuegos.titulo',
                'videojuegos.fecha_lanzamiento',
                'estudios.nombre as estudio',
                'estudios.pais'
            );

        // Si se envió un estudio_id en la URL, aplicamos WHERE
        if (estudio_id) {
            query = query.where('videojuegos.estudio_id', estudio_id);
        }

        const resultados = await query;
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);
});
