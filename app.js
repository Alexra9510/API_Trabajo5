    // app.js
    // API de Ciudades de Colombia con Node.js y Express.js

    // Importar el módulo Express para crear el servidor web
    const express = require('express'); // ¡SOLO UNA VEZ!
    // Importar el módulo 'fs' (File System) de Node.js para leer archivos
    const fs = require('fs');
    // Importar el módulo 'path' para trabajar con rutas de archivos y directorios
    const path = require('path');

    // Añadimos esta línea para depuración, puedes mantenerla o quitarla después
    console.log('¡El script app.js se está ejecutando!'); 

    // Crear una instancia de la aplicación Express
    const app = express();
    // Definir el puerto en el que la API escuchará las solicitudes
    const PORT = 3000;

    // Middleware para parsear el cuerpo de las solicitudes JSON
    app.use(express.json());

    // Ruta al archivo JSON de ciudades
    const citiesFilePath = path.join(__dirname, 'cities.json');

    // Middleware para cargar los datos de las ciudades una vez al inicio
    let citiesData = [];
    fs.readFile(citiesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de ciudades:', err);
            process.exit(1);
        }
        try {
            citiesData = JSON.parse(data);
            console.log(`Datos de ${citiesData.length} ciudades cargados exitosamente.`);
        } catch (parseError) {
            console.error('Error al parsear el archivo JSON de ciudades:', parseError);
            process.exit(1);
        }
    });

    // ENDPOINT 1: Obtener todas las ciudades
    app.get('/api/cities', (req, res) => {
        res.json(citiesData);
    });

    // ENDPOINT 2: Obtener una ciudad por su ID
    app.get('/api/cities/:id', (req, res) => {
        const cityId = parseInt(req.params.id);
        const city = citiesData.find(c => c.id === cityId);

        if (city) {
            res.json(city);
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada.' });
        }
    });

    // Iniciar el servidor Express
    app.listen(PORT, () => {
        console.log(`Servidor de la API escuchando en http://localhost:${PORT}`);
        console.log('Endpoints disponibles:');
        console.log(`- GET http://localhost:${PORT}/api/cities`);
        console.log(`- GET http://localhost:${PORT}/api/cities/:id`);
    });