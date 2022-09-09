const db = require('../database/postgresql.pool');

const consultarEstudiantesBecados = async (req, res) => {
    //Contar todos los estudiantes existentes
    //total de estudiantes becados
    let sqlTotalEstudiantes = `SELECT * FROM usuarios WHERE id_rol=5 ORDER BY id_usuario DESC`;
    let sqlTotalEstudiantesBecados = `SELECT * FROM becas_otorgadas WHERE estado_beca = 'A' AND estado = 'S' ORDER BY id_beca_otorgada DESC;`;
    let totalEstudiantes = 0;
    let totalEstudiantesBecados = 0;

    db.query(sqlTotalEstudiantes, async (error, results) => {
        if (!error) {
            totalEstudiantes = results.rowCount;

            db.query(sqlTotalEstudiantesBecados, async (error, results) => {
                if (!error) {
                    totalEstudiantesBecados = results.rowCount;

                    let miArray = [
                        { nombre: 'NO BECADOS', valor: totalEstudiantes - totalEstudiantesBecados },
                        { nombre: 'BECADOS', valor: totalEstudiantesBecados },
                    ];
                    res.send(miArray);
                }
            });
        }
    });
};

const consultarEstudiantesFinanciamiento = async (req, res) => {
    let sqlBecasAprobadas = `SELECT b.porcentaje || '%' AS nombre ,count(*) AS cantidad FROM becas_otorgadas bo, becas b
                                WHERE bo.id_beca = b.id_beca 
                                AND bo.estado_beca = 'A'
                                AND b.estado = 'S'
                                GROUP BY b.porcentaje`;

    let resultadoBecasAprobadas;
    db.query(sqlBecasAprobadas, async (error, results) => {
        if (!error) {
            resultadoBecasAprobadas = results.rows;

            res.send(resultadoBecasAprobadas);
        }
    });
};

const consultarEstudiantesInscritos = async (req, res) => {
    //Contar todos los estudiantes existentes
    //total de estudiantes becados
    let sqlCursos = `select cu.nombre, count(*) as cantidad from matriculas m, capacitaciones ca, cursos cu
                            where m.id_capacitacion = ca.id_capacitacion
                            and ca.id_curso = cu.id_curso
                            group by cu.nombre`;

    let totalInscripciones;
    db.query(sqlCursos, async (error, results) => {
        if (!error) {
            totalInscripciones = results.rows;

            res.send(totalInscripciones);
        }
    });
};

const consultarCapacitacionesDemandadas = async (req, res) => {
    //Contar todos los estudiantes existentes
    //total de estudiantes becados
    let sqlCapacitaciones = `select ca.nombre, count(*) as cantidad from matriculas m, capacitaciones ca
                                where m.id_capacitacion = ca.id_capacitacion
                                group by ca.nombre`;

    let capacitaciones;
    db.query(sqlCapacitaciones, async (error, results) => {
        if (!error) {
            capacitaciones = results.rows;

            const resultadosOrdenados = capacitaciones.sort((a, b) => {
                return Number.parseInt(b.cantidad) - Number.parseInt(a.cantidad);
            });

            res.send(resultadosOrdenados);
        }
    });
};

module.exports = {
    consultarEstudiantesBecados,
    consultarEstudiantesFinanciamiento,
    consultarEstudiantesInscritos,
    consultarCapacitacionesDemandadas,
};
