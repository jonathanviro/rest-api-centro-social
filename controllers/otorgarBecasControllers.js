const db = require('../database/postgresql.pool');

const consultarBecasOtorgadas = async (req, res, next) => {
    try {
        const sql = `select b.nombre as nombre_beca, cu.descripcion as nombre_curso, CONCAT(u.nombres,' ', u.apellidos) as nombre_estudiante, bo.*
                        from becas_otorgadas bo, becas b, usuarios u, cursos cu
                        where bo.id_beca = b.id_beca
                        and bo.id_usuario_estudiante = u.id_usuario
						and b.id_curso = cu.id_curso order by id_beca_otorgada desc`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosOtorgarBecas = [];
                    return next();
                } else {
                    req.datosOtorgarBecas = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesOtorgarBecas = async (req, res) => {
    try {
        let { accion, idBecaOtorgada, idBeca, idEstudiante, estadoBeca } = req.body;
        console.log(req.body);
        if (!idBeca || !idEstudiante || !estadoBeca || idBeca == '0' || idEstudiante == '0' || estadoBeca == '0') {
            let mensaje = ``;
            if (!idBeca || idBeca == '0') {
                mensaje = `No se ha seleccionado una beca`;
            } else if (!idEstudiante || idEstudiante == '0') {
                mensaje = `No se ha seleccionado un estudiante`;
            } else if (!estadoBeca || estadoBeca == '0') {
                mensaje = `No se ha seleccionado un estado para la beca`;
            }

            res.render('otorgar-becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: mensaje,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosOtorgarBecas: req.datosOtorgarBecas,
                datosBecas: req.datosBecas,
                datosEstudiantes: req.datosEstudiantes,
            });
        } else {
            if (accion == 'modificar') {
                const sql = `UPDATE becas_otorgadas SET estado_beca=$1 WHERE id_beca_otorgada=$2;`;
                const valores = [estadoBeca, idBecaOtorgada];
                console.log(`MODIFICACION++++>>>${idBecaOtorgada}, ${estadoBeca}`);

                const sqlTodosLosPath = `SELECT * from becas_otorgadas where id_beca_otorgada=$1`;

                if (estadoBeca == 'A') {
                    db.query(sqlTodosLosPath, [idBecaOtorgada], async (errorPath, resultsPath) => {
                        const resultadoPath = resultsPath.rows[0];
                        console.log(`Estado ------------> ${resultadoPath.path_pdf_papeleta_votacion}`);
                        if (
                            !resultadoPath.path_pdf_cedula ||
                            !resultadoPath.path_pdf_papeleta_votacion ||
                            !resultadoPath.path_pdf_solicitud_beca ||
                            !resultadoPath.path_pdf_croquis ||
                            !resultadoPath.path_pdf_planilla ||
                            resultadoPath.path_pdf_cedula == '' ||
                            resultadoPath.path_pdf_papeleta_votacion == '' ||
                            resultadoPath.path_pdf_solicitud_beca == '' ||
                            resultadoPath.path_pdf_croquis == '' ||
                            resultadoPath.path_pdf_planilla == ''
                        ) {
                            res.render('otorgar-becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error al Aprobar',
                                alertaMensaje: 'No se puede aprobar la beca ya que no tiene los documentos completos',
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosOtorgarBecas: req.datosOtorgarBecas,
                                datosBecas: req.datosBecas,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                        } else {
                            db.query(sql, valores)
                                .then((results) => {
                                    res.render('otorgar-becas', {
                                        esAlerta: true,
                                        esAlertaSinRecarga: false,
                                        alertaTitulo: 'Modificación exitosa',
                                        alertaMensaje: 'El estado de la beca ha sido modifica correctamente',
                                        alertaIcono: 'success',
                                        mostrarBotonConfirmacion: false,
                                        timer: 2000,
                                        rutaRedireccion: 'otorgar-becas',
                                        usuarioLogin: req.usuarioLogin,
                                        datosOtorgarBecas: req.datosOtorgarBecas,
                                        datosBecas: req.datosBecas,
                                        datosEstudiantes: req.datosEstudiantes,
                                    });
                                })
                                .catch((error) => {
                                    res.render('otorgar-becas', {
                                        esAlerta: false,
                                        esAlertaSinRecarga: true,
                                        alertaTitulo: 'Error inesperado',
                                        alertaMensaje: `Mensaje: ${error.message}`,
                                        alertaIcono: 'error',
                                        mostrarBotonConfirmacion: true,
                                        timer: false,
                                        usuarioLogin: req.usuarioLogin,
                                        datosOtorgarBecas: req.datosOtorgarBecas,
                                        datosBecas: req.datosBecas,
                                        datosEstudiantes: req.datosEstudiantes,
                                    });
                                });
                        }
                    });
                } else {
                    db.query(sql, valores)
                        .then((results) => {
                            res.render('otorgar-becas', {
                                esAlerta: true,
                                esAlertaSinRecarga: false,
                                alertaTitulo: 'Modificación exitosa',
                                alertaMensaje: 'El estado de la beca ha sido modifica correctamente',
                                alertaIcono: 'success',
                                mostrarBotonConfirmacion: false,
                                timer: 2000,
                                rutaRedireccion: 'otorgar-becas',
                                usuarioLogin: req.usuarioLogin,
                                datosOtorgarBecas: req.datosOtorgarBecas,
                                datosBecas: req.datosBecas,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                        })
                        .catch((error) => {
                            res.render('otorgar-becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosOtorgarBecas: req.datosOtorgarBecas,
                                datosBecas: req.datosBecas,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                        });
                }
            } else {
                const sql = `select * from becas_otorgadas where id_usuario_estudiante = $1 and estado = $2`;
                const valores = [idEstudiante, 'S'];

                db.query(sql, valores, async (errorValidacion, resultsValidacion) => {
                    if (!errorValidacion) {
                        if (resultsValidacion.rowCount == 0) {
                            console.log('----------------->No Existe');
                            if (accion === 'insertar') {
                                const sql = `INSERT INTO becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES ($1, $2, $3, $4);`;
                                const valores = [idBeca, idEstudiante, estadoBeca, 'S'];
                                console.log(`CREACION++++>>>${idBeca}, ${idEstudiante}, ${estadoBeca}`);

                                db.query(sql, valores)
                                    .then((results) => {
                                        res.render('otorgar-becas', {
                                            esAlerta: true,
                                            esAlertaSinRecarga: false,
                                            alertaTitulo: 'Registro exitoso',
                                            alertaMensaje: 'La beca ha sido asignado correctamente',
                                            alertaIcono: 'success',
                                            mostrarBotonConfirmacion: false,
                                            timer: 2000,
                                            rutaRedireccion: 'otorgar-becas',
                                            usuarioLogin: req.usuarioLogin,
                                            datosOtorgarBecas: req.datosOtorgarBecas,
                                            datosBecas: req.datosBecas,
                                            datosEstudiantes: req.datosEstudiantes,
                                        });
                                    })
                                    .catch((error) => {
                                        res.render('otorgar-becas', {
                                            esAlerta: false,
                                            esAlertaSinRecarga: true,
                                            alertaTitulo: 'Error inesperado',
                                            alertaMensaje: `Mensaje: ${error.message}`,
                                            alertaIcono: 'error',
                                            mostrarBotonConfirmacion: true,
                                            timer: false,
                                            usuarioLogin: req.usuarioLogin,
                                            datosOtorgarBecas: req.datosOtorgarBecas,
                                            datosBecas: req.datosBecas,
                                            datosEstudiantes: req.datosEstudiantes,
                                        });
                                    });
                            }
                        } else {
                            console.log('----------------->Existe');
                            res.render('otorgar-becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Beca ya existe',
                                alertaMensaje: 'El estudiante ya tiene una beca asignada',
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosOtorgarBecas: req.datosOtorgarBecas,
                                datosBecas: req.datosBecas,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                            return true;
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivarBecaOtorgada = async (req, res) => {
    let sql = ``;
    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE becas_otorgadas set estado='N' WHERE id_beca_otorgada=$1`;
    } else {
        sql = `UPDATE becas_otorgadas set estado='S' WHERE id_beca_otorgada=$1`;
    }
    db.query(sql, [id])
        .then((results) => {
            res.redirect('/otorgar-becas');
        })
        .catch((error) => {
            res.render('otorgar-becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosOtorgarBecas: req.datosOtorgarBecas,
                datosBecas: req.datosBecas,
                datosEstudiantes: req.datosEstudiantes,
            });
        });
};

const eliminarBecaOtorgada = async (req, res) => {
    let sql = `DELETE FROM becas_otorgadas WHERE id_beca_otorgada=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/otorgar-becas');
        })
        .catch((error) => {
            res.render('otorgar-becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosOtorgarBecas: req.datosOtorgarBecas,
                datosBecas: req.datosBecas,
                datosEstudiantes: req.datosEstudiantes,
            });
        });
};

module.exports = {
    consultarBecasOtorgadas,
    accionesOtorgarBecas,
    inactivarBecaOtorgada,
    eliminarBecaOtorgada,
};
