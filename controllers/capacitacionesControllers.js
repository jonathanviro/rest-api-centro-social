const db = require('../database/postgresql.pool');

const consultarCapacitaciones = async (req, res, next) => {
    try {
        const sql = `select ca.*, cu.nombre as nombre_curso, CONCAT(u.nombres,' ', u.apellidos) as nombre_docente, h.descripcion as desc_horario
                        from cursos cu, usuarios u, horarios h, capacitaciones ca
                        where ca.id_curso = cu.id_curso 
                        and ca.id_usuario_docente = u.id_usuario
                        and ca.id_horario = h.id_horario`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosCapacitaciones = [];
                    return next();
                } else {
                    req.datosCapacitaciones = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesCapacitaciones = async (req, res) => {
    try {
        let { accion, idCapacitacion, nombreCapacitacion, descripcionCapacitacion, cuposCapacitacion, horasCapacitacion, fechaInicioCapacitacion, fechaFinCapacitacion, idCurso, idHorario, idDocente } = req.body;
        if (!nombreCapacitacion || !descripcionCapacitacion || !cuposCapacitacion || !horasCapacitacion || !fechaInicioCapacitacion || !fechaFinCapacitacion || !idCurso || !idHorario || !idDocente) {
            res.render('capacitaciones', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosCapacitaciones: req.datosCapacitaciones,
                datosCursos: req.datosCursos,
                datosHorarios: req.datosHorarios,
                datosDocentes: req.datosDocentes,
            });
        } else {
            if (accion === 'insertar') {
                const sql = `INSERT INTO capacitaciones(id_curso, id_horario, id_usuario_docente, nombre, descripcion, cupos, duracion_horas, fecha_inicio, fecha_fin, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                const valores = [idCurso, idHorario, idDocente, nombreCapacitacion.trim().toUpperCase(), descripcionCapacitacion.trim().toUpperCase(), cuposCapacitacion, horasCapacitacion, fechaInicioCapacitacion, fechaFinCapacitacion, 'S'];
                console.log(`CREACION++++>>>${idCurso}, ${idHorario}, ${idDocente}, ${nombreCapacitacion}, ${descripcionCapacitacion}, ${cuposCapacitacion}, ${horasCapacitacion}, ${fechaInicioCapacitacion}, ${fechaFinCapacitacion} `);

                db.query(sql, valores)
                    .then((results) => {
                        res.render('capacitaciones', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'La capacitación se agrego correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'capacitaciones',
                            usuarioLogin: req.usuarioLogin,
                            datosCapacitaciones: req.datosCapacitaciones,
                            datosCursos: req.datosCursos,
                            datosHorarios: req.datosHorarios,
                            datosDocentes: req.datosDocentes,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreCapacitacion.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('capacitaciones', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreCapacitacion.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCapacitaciones: req.datosCapacitaciones,
                                datosCursos: req.datosCursos,
                                datosHorarios: req.datosHorarios,
                                datosDocentes: req.datosDocentes,
                            });
                        } else {
                            res.render('capacitaciones', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCapacitaciones: req.datosCapacitaciones,
                                datosCursos: req.datosCursos,
                                datosHorarios: req.datosHorarios,
                                datosDocentes: req.datosDocentes,
                            });
                        }
                    });
            } else {
                const sql = `UPDATE CAPACITACIONES set nombre=$1, descripcion=$2, cupos=$3, duracion_horas=$4, fecha_inicio=$5, fecha_fin=$6, id_curso=$7, id_horario=$8, id_usuario_docente=$9 WHERE id_capacitacion=$10`;
                const valores = [nombreCapacitacion.trim().toUpperCase(), descripcionCapacitacion.trim().toUpperCase(), cuposCapacitacion, horasCapacitacion, fechaInicioCapacitacion, fechaFinCapacitacion, idCurso, idHorario, idDocente, idCapacitacion];
                console.log(`MODIFICACION++++>>>${idCapacitacion}, ${nombreCapacitacion}, ${descripcionCapacitacion}, ${cuposCapacitacion}, ${horasCapacitacion}, ${fechaInicioCapacitacion}, ${fechaFinCapacitacion}, ${idCurso}, ${idHorario}, ${idDocente} `);

                db.query(sql, valores)
                    .then((results) => {
                        res.render('capacitaciones', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Modificación exitosa',
                            alertaMensaje: 'La capacitación se actualizo correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'capacitaciones',
                            usuarioLogin: req.usuarioLogin,
                            datosCapacitaciones: req.datosCapacitaciones,
                            datosCursos: req.datosCursos,
                            datosHorarios: req.datosHorarios,
                            datosDocentes: req.datosDocentes,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreCapacitacion.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('capacitaciones', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreCapacitacion.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCapacitaciones: req.datosCapacitaciones,
                                datosCursos: req.datosCursos,
                                datosHorarios: req.datosHorarios,
                                datosDocentes: req.datosDocentes,
                            });
                        } else {
                            res.render('capacitaciones', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCapacitaciones: req.datosCapacitaciones,
                                datosCursos: req.datosCursos,
                                datosHorarios: req.datosHorarios,
                                datosDocentes: req.datosDocentes,
                            });
                        }
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionCapacitacion = async (req, res) => {
    let sql = ``;
    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE CAPACITACIONES set estado='N' WHERE id_capacitacion=$1`;
    } else {
        sql = `UPDATE CAPACITACIONES set estado='S' WHERE id_capacitacion=$1`;
    }
    db.query(sql, [id])
        .then((results) => {
            res.redirect('/capacitaciones');
        })
        .catch((error) => {
            res.render('capacitaciones', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'capacitaciones',
                usuarioLogin: req.usuarioLogin,
                datosCapacitaciones: req.datosCapacitaciones,
                datosCursos: req.datosCursos,
                datosHorarios: req.datosHorarios,
                datosDocentes: req.datosDocentes,
            });
        });
};

const eliminarCapacitacion = async (req, res) => {
    let sql = `DELETE FROM CAPACITACIONES WHERE id_capacitacion=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/capacitaciones');
        })
        .catch((error) => {
            res.render('capacitaciones', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosCapacitaciones: req.datosCapacitaciones,
                datosCursos: req.datosCursos,
                datosHorarios: req.datosHorarios,
                datosDocentes: req.datosDocentes,
            });
        });
};

module.exports = {
    consultarCapacitaciones,
    accionesCapacitaciones,
    inactivacionCapacitacion,
    eliminarCapacitacion,
};
