const db = require('../database/postgresql.pool');

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

const consultarEstudiantesFinanciamiento = () => {};
const consultarEstudiantesInscritos = () => {};
const consultarCapacitacionesDemandadas = () => {};

module.exports = {
    consultarEstudiantesBecados,
    consultarEstudiantesFinanciamiento,
    consultarEstudiantesInscritos,
    consultarCapacitacionesDemandadas,
};
