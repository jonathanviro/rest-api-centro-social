const db = require('../database/postgresql.pool');

const consultarUsuarios = async (req, res, next) => {
    try {
        const id_usuario_actual = req.usuarioLogin.id_rol;
        let { accion } = req.query;
        let sql = ``;
        // console.log(`--------------------------> ${accion}`);
        switch (accion) {
            case 'personal':
                sql = `SELECT * FROM USUARIOS WHERE id_rol=3 ORDER BY id_usuario DESC;`;
                break;

            case 'docentes':
                sql = `SELECT * FROM USUARIOS WHERE id_rol=4 ORDER BY id_usuario DESC;`;
                break;

            case 'estudiantes':
                sql = `SELECT * FROM USUARIOS WHERE id_rol=5 ORDER BY id_usuario DESC;`;
                break;

            default:
                if (id_usuario_actual == 1 || id_usuario_actual == 2) {
                    sql = `SELECT * FROM USUARIOS WHERE id_rol not in (1,2) ORDER BY id_usuario DESC;`;
                }

                if (id_usuario_actual == 3) {
                    sql = `SELECT * FROM USUARIOS WHERE id_rol not in (1,2, 3) ORDER BY id_usuario DESC;`;
                }

                if (id_usuario_actual == 4) {
                    sql = `SELECT * FROM USUARIOS WHERE id_rol = 5 ORDER BY id_usuario DESC;`;
                }
                break;
        }
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosUsuarios = [];
                    return next();
                } else {
                    req.datosUsuarios = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const reporteEstudiantesBecados = async (req, res, next) => {
    //Contar todos los estudiantes existentes
    //total de estudiantes becados
    const sqlEstudiantesBecados = `select b.nombre as nombre_beca, cu.descripcion as nombre_curso, CONCAT(u.nombres,' ', u.apellidos) as nombre_estudiante
                        from becas_otorgadas bo, becas b, usuarios u, cursos cu
                        where bo.id_beca = b.id_beca
                        and bo.id_usuario_estudiante = u.id_usuario
						and b.id_curso = cu.id_curso 
						and bo.estado_beca = 'A' 
						order by id_beca_otorgada desc`;

    // db.query(sqlEstudiantesBecados, async (error, results) => {
    //     if (!error) {
    //         totalEstudiantes = results.rows;

    //         res.send(totalEstudiantes);
    //     }
    // });

    db.query(sqlEstudiantesBecados, async (error, results) => {
        if (!error) {
            if (results.rowCount == 0) {
                req.datosEstudiantesBecados = [];
                return next();
            } else {
                req.datosEstudiantesBecados = results.rows;
                return next();
            }
        }
    });
};

module.exports = {
    reporteEstudiantesBecados,
};
