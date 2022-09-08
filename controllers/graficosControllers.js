// const db = require('../database/postgresql.pool');
const { Pool } = require('pg');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const db = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const consultarEstudiantesBecados = async (req, res, next) => {
    try {
        const sql = `select be.*, cu.nombre as nombre_curso from cursos cu,  becas be where be.id_curso = cu.id_curso`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosBecas = [];
                    return next();
                } else {
                    req.datosBecas = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const consultarPruebas = async (req, res) => {
    try {
        console.log('Hola servicio');
        const sql = `select be.*, cu.nombre as nombre_curso from cursos cu,  becas be where be.id_curso = cu.id_curso`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosBecas = [];
                } else {
                    req.datosBecas = results.rows;
                    console.log(results.rows);
                    res.send(results.rows);
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const consultarEstudiantesFinanciamiento = () => {};
const consultarEstudiantesInscritos = () => {};
const consultarCapacitacionesDemandadas = () => {};

module.exports = {
    consultarPruebas,
    consultarEstudiantesBecados,
    consultarEstudiantesFinanciamiento,
    consultarEstudiantesInscritos,
    consultarCapacitacionesDemandadas,
};
