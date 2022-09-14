const db = require('../database/postgresql.pool');

const consultarMatriculas = async (req, res, next) => {
    try {
        const sql = `select ma.*, ca.nombre as nombre_capacitacion, CONCAT(u.nombres,' ', u.apellidos) as nombre_estudiante
                        from matriculas ma, usuarios u, capacitaciones ca
                        where u.id_rol = 5
                        and ma.id_usuario_estudiante = u.id_usuario
                        and ma.id_capacitacion = ca.id_capacitacion
                        ORDER BY ma.id_matricula DESC`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosMatriculas = [];
                    return next();
                } else {
                    req.datosMatriculas = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesMatriculas = async (req, res) => {
    try {
        let { accion, idMatricula, idCapacitacion, idEstudiante } = req.body;
        // console.log(req.body);
        if (!idCapacitacion || !idEstudiante || idCapacitacion == 0 || idEstudiante == 0) {
            res.render('matriculas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosMatriculas: req.datosMatriculas,
                datosCapacitaciones: req.datosCapacitaciones,
                datosHorarios: req.datosHorarios,
                datosEstudiantes: req.datosEstudiantes,
            });
        } else {
            const sqlCuposCapacitaciones = `SELECT ca.cupos FROM capacitaciones ca WHERE ca.id_capacitacion = $1;`;
            const sqlCuposUsadosCapacitaciones = `SELECT count(*) as cupos_usados FROM matriculas ma WHERE ma.id_capacitacion = $1;`;

            const sql = `select * from matriculas where id_usuario_estudiante = $1 and estado = $2`;
            const valores = [idEstudiante, 'S'];

            db.query(sql, valores, async (errorValidacion, resultsValidacion) => {
                if (!errorValidacion) {
                    if (resultsValidacion.rowCount == 0) {
                        console.log('----------------->No Existe');
                        if (accion === 'insertar') {
                            db.query(sqlCuposCapacitaciones, [idCapacitacion], async (errorCupos, resultsCupos) => {
                                let cuposCapacitaciones = resultsCupos.rows[0].cupos;
                                // console.log(cuposCapacitaciones);

                                db.query(sqlCuposUsadosCapacitaciones, [idCapacitacion], async (errorCuposUsados, resultsCuposUsados) => {
                                    let cuposUsadosCapacitaciones = Number.parseInt(resultsCuposUsados.rows[0].cupos_usados);
                                    // console.log(cuposUsadosCapacitaciones);

                                    let cuposRestantes = cuposCapacitaciones - cuposUsadosCapacitaciones;
                                    // console.log(cuposRestantes);

                                    if (cuposRestantes == 0) {
                                        // console.log('No hay cupos');
                                        res.render('matriculas', {
                                            esAlerta: false,
                                            esAlertaSinRecarga: true,
                                            alertaTitulo: 'Cupos Agotados',
                                            alertaMensaje: 'Ya no hay cupos disponibles para esta capacitación',
                                            alertaIcono: 'error',
                                            mostrarBotonConfirmacion: true,
                                            timer: false,
                                            usuarioLogin: req.usuarioLogin,
                                            datosMatriculas: req.datosMatriculas,
                                            datosCapacitaciones: req.datosCapacitaciones,
                                            datosHorarios: req.datosHorarios,
                                            datosEstudiantes: req.datosEstudiantes,
                                        });
                                    } else {
                                        // console.log('Si hay cupos');
                                        const sql = `INSERT INTO matriculas(id_capacitacion, id_usuario_estudiante, estado) VALUES ($1, $2, $3);`;
                                        const valores = [idCapacitacion, idEstudiante, 'S'];
                                        console.log(`CREACION++++>>>${idCapacitacion}, ${idEstudiante}`);

                                        db.query(sql, valores)
                                            .then((results) => {
                                                res.render('matriculas', {
                                                    esAlerta: true,
                                                    esAlertaSinRecarga: false,
                                                    alertaTitulo: 'Registro exitoso',
                                                    alertaMensaje: 'La matrícula se agrego correctamente',
                                                    alertaIcono: 'success',
                                                    mostrarBotonConfirmacion: false,
                                                    timer: 2000,
                                                    rutaRedireccion: 'matriculas',
                                                    usuarioLogin: req.usuarioLogin,
                                                    datosMatriculas: req.datosMatriculas,
                                                    datosCapacitaciones: req.datosCapacitaciones,
                                                    datosHorarios: req.datosHorarios,
                                                    datosEstudiantes: req.datosEstudiantes,
                                                });
                                            })
                                            .catch((error) => {
                                                res.render('matriculas', {
                                                    esAlerta: false,
                                                    esAlertaSinRecarga: true,
                                                    alertaTitulo: 'Error inesperado',
                                                    alertaMensaje: `Mensaje: ${error.message}`,
                                                    alertaIcono: 'error',
                                                    mostrarBotonConfirmacion: true,
                                                    timer: false,
                                                    usuarioLogin: req.usuarioLogin,
                                                    datosMatriculas: req.datosMatriculas,
                                                    datosCapacitaciones: req.datosCapacitaciones,
                                                    datosHorarios: req.datosHorarios,
                                                    datosEstudiantes: req.datosEstudiantes,
                                                });
                                            });
                                    }
                                });
                            });
                        } else {
                            const sql = `UPDATE MATRICULAS set id_usuario_estudiante=$1, id_capacitacion=$2 WHERE id_matricula=$3`;
                            const valores = [idCapacitacion, idEstudiante, idMatricula];
                            console.log(`MODIFICACION++++>>>${idMatricula}, ${idCapacitacion}, ${idEstudiante}`);

                            db.query(sql, valores)
                                .then((results) => {
                                    res.render('matriculas', {
                                        esAlerta: true,
                                        esAlertaSinRecarga: false,
                                        alertaTitulo: 'Modificación exitosa',
                                        alertaMensaje: 'La capacitación se actualizo correctamente',
                                        alertaIcono: 'success',
                                        mostrarBotonConfirmacion: false,
                                        timer: 2000,
                                        rutaRedireccion: 'matriculas',
                                        usuarioLogin: req.usuarioLogin,
                                        datosMatriculas: req.datosMatriculas,
                                        datosCapacitaciones: req.datosCapacitaciones,
                                        datosHorarios: req.datosHorarios,
                                        datosEstudiantes: req.datosEstudiantes,
                                    });
                                })
                                .catch((error) => {
                                    res.render('matriculas', {
                                        esAlerta: false,
                                        esAlertaSinRecarga: true,
                                        alertaTitulo: 'Error inesperado',
                                        alertaMensaje: `Mensaje: ${error.message}`,
                                        alertaIcono: 'error',
                                        mostrarBotonConfirmacion: true,
                                        timer: false,
                                        usuarioLogin: req.usuarioLogin,
                                        datosMatriculas: req.datosMatriculas,
                                        datosCapacitaciones: req.datosCapacitaciones,
                                        datosHorarios: req.datosHorarios,
                                        datosEstudiantes: req.datosEstudiantes,
                                    });
                                });
                        }
                    } else {
                        console.log('----------------->Existe');
                        res.render('matriculas', {
                            esAlerta: false,
                            esAlertaSinRecarga: true,
                            alertaTitulo: 'Matrícula ya existe',
                            alertaMensaje: 'El alumno ya se encuentra matriculado',
                            alertaIcono: 'error',
                            mostrarBotonConfirmacion: true,
                            timer: false,
                            usuarioLogin: req.usuarioLogin,
                            datosMatriculas: req.datosMatriculas,
                            datosCapacitaciones: req.datosCapacitaciones,
                            datosHorarios: req.datosHorarios,
                            datosEstudiantes: req.datosEstudiantes,
                        });
                        return true;
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionMatricula = async (req, res) => {
    let sql = ``;
    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE MATRICULAS set estado='N' WHERE id_matricula=$1`;
    } else {
        sql = `UPDATE MATRICULAS set estado='S' WHERE id_matricula=$1`;
    }
    db.query(sql, [id])
        .then((results) => {
            res.redirect('/matriculas');
        })
        .catch((error) => {
            res.render('matriculas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'matriculas',
                usuarioLogin: req.usuarioLogin,
                datosMatriculas: req.datosMatriculas,
                datosCapacitaciones: req.datosCapacitaciones,
                datosHorarios: req.datosHorarios,
                datosEstudiantes: req.datosEstudiantes,
            });
        });
};

module.exports = {
    consultarMatriculas,
    accionesMatriculas,
    inactivacionMatricula,
};
