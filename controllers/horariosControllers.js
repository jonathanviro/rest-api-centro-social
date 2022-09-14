const db = require('../database/postgresql.pool');

const consultarHorarios = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM HORARIOS ORDER BY id_horario DESC;`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosHorarios = [];
                    return next();
                } else {
                    req.datosHorarios = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesHorarios = async (req, res) => {
    try {
        let { idHorario, accion, descripcionHorario, lunesHoraInicio, lunesHoraFin, martesHoraInicio, martesHoraFin, miercolesHoraInicio, miercolesHoraFin, juevesHoraInicio, juevesHoraFin, viernesHoraInicio, viernesHoraFin, sabadoHoraInicio, sabadoHoraFin, domingoHoraInicio, domingoHoraFin } = req.body;
        if (!descripcionHorario) {
            res.render('horarios', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'Debe llenar al menos la descripción del horario',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosHorarios: req.datosHorarios,
            });
        } else {
            if (!lunesHoraInicio) {
                lunesHoraInicio = '00:00:00';
            }
            if (!lunesHoraFin) {
                lunesHoraFin = '00:00:00';
            }
            if (!martesHoraInicio) {
                martesHoraInicio = '00:00:00';
            }
            if (!martesHoraFin) {
                martesHoraFin = '00:00:00';
            }
            if (!miercolesHoraInicio) {
                miercolesHoraInicio = '00:00:00';
            }
            if (!miercolesHoraFin) {
                miercolesHoraFin = '00:00:00';
            }
            if (!juevesHoraInicio) {
                juevesHoraInicio = '00:00:00';
            }
            if (!juevesHoraFin) {
                juevesHoraFin = '00:00:00';
            }
            if (!viernesHoraInicio) {
                viernesHoraInicio = '00:00:00';
            }
            if (!viernesHoraFin) {
                viernesHoraFin = '00:00:00';
            }
            if (!sabadoHoraInicio) {
                sabadoHoraInicio = '00:00:00';
            }
            if (!sabadoHoraFin) {
                sabadoHoraFin = '00:00:00';
            }
            if (!domingoHoraInicio) {
                domingoHoraInicio = '00:00:00';
            }
            if (!domingoHoraFin) {
                domingoHoraFin = '00:00:00';
            }

            if (accion === 'insertar') {
                const sql = `INSERT INTO HORARIOS (descripcion, 
                                                   lunes_hora_inicio, lunes_hora_fin,
                                                   martes_hora_inicio, martes_hora_fin,
                                                   miercoles_hora_inicio, miercoles_hora_fin,
                                                   jueves_hora_inicio, jueves_hora_fin,
                                                   viernes_hora_inicio, viernes_hora_fin,
                                                   sabado_hora_inicio, sabado_hora_fin,
                                                   domingo_hora_inicio, domingo_hora_fin,
                                                   estado)
                                           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'S')`;

                const valores = [descripcionHorario.trim().toUpperCase(), lunesHoraInicio, lunesHoraFin, martesHoraInicio, martesHoraFin, miercolesHoraInicio, miercolesHoraFin, juevesHoraInicio, juevesHoraFin, viernesHoraInicio, viernesHoraFin, sabadoHoraInicio, sabadoHoraFin, domingoHoraInicio, domingoHoraFin];

                console.log(`CREACION++++>>>${descripcionHorario}, ${lunesHoraInicio}, ${lunesHoraFin}, ${martesHoraInicio}, ${martesHoraFin}, ${miercolesHoraInicio}, ${miercolesHoraFin}`);

                db.query(sql, valores)
                    .then((results) => {
                        res.render('horarios', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'El horario se agrego correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'horarios',
                            usuarioLogin: req.usuarioLogin,
                            datosHorarios: req.datosHorarios,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`La descripción ${descripcionHorario.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('horarios', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `Descripción ${descripcionHorario.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosHorarios: req.datosHorarios,
                            });
                        } else {
                            res.render('horarios', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosHorarios: req.datosHorarios,
                            });
                        }
                    });
            } else {
                const sql = `UPDATE HORARIOS set descripcion=$1, 
                                                 lunes_hora_inicio=$2, lunes_hora_fin=$3,
                                                 martes_hora_inicio=$4, martes_hora_fin=$5,
                                                 miercoles_hora_inicio=$6, miercoles_hora_fin=$7,
                                                 jueves_hora_inicio=$8, jueves_hora_fin=$9,
                                                 viernes_hora_inicio=$10, viernes_hora_fin=$11,
                                                 sabado_hora_inicio=$12, sabado_hora_fin=$13,
                                                 domingo_hora_inicio=$14, domingo_hora_fin=$15
                                           WHERE id_horario=$16`;

                const valores = [descripcionHorario.trim().toUpperCase(), lunesHoraInicio, lunesHoraFin, martesHoraInicio, martesHoraFin, miercolesHoraInicio, miercolesHoraFin, juevesHoraInicio, juevesHoraFin, viernesHoraInicio, viernesHoraFin, sabadoHoraInicio, sabadoHoraFin, domingoHoraInicio, domingoHoraFin, idHorario];

                console.log(`MODIFICACION++++>>>${idHorario}, ${descripcionHorario}, ${lunesHoraInicio}, ${lunesHoraFin}, ${martesHoraInicio}, ${martesHoraFin}, ${miercolesHoraInicio}, ${miercolesHoraFin}`);
                db.query(sql, valores)
                    .then((results) => {
                        res.render('horarios', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro actualizado',
                            alertaMensaje: 'El horario se modifico correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'horarios',
                            usuarioLogin: req.usuarioLogin,
                            datosHorarios: req.datosHorarios,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`La descripción ${descripcionHorario.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('horarios', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `Descripción ${descripcionHorario.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosHorarios: req.datosHorarios,
                            });
                        } else {
                            res.render('horarios', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosHorarios: req.datosHorarios,
                            });
                        }
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionHorario = async (req, res) => {
    let sql = ``;

    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE HORARIOS set estado='N' WHERE id_horario=$1`;
    } else {
        sql = `UPDATE HORARIOS set estado='S' WHERE id_horario=$1`;
    }

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/horarios');
        })
        .catch((error) => {
            res.render('horarios', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'horarios',
                usuarioLogin: req.usuarioLogin,
                datosHorarios: req.datosHorarios,
            });
        });
};

const eliminarHorario = async (req, res) => {
    let sql = `DELETE FROM HORARIOS WHERE id_horario=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/horarios');
        })
        .catch((error) => {
            res.render('horarios', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosHorarios: req.datosHorarios,
            });
        });
};

module.exports = {
    consultarHorarios,
    accionesHorarios,
    inactivacionHorario,
    eliminarHorario,
};
