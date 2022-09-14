const db = require('../database/postgresql.pool');

const consultarBecas = async (req, res, next) => {
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

const accionesBecas = async (req, res) => {
    try {
        let { accion, idBeca, nombreBeca, descripcionBeca, porcentajeBeca, cuposBeca, fechaInicioBeca, fechaFinBeca, requisitosBeca, idCurso } = req.body;
        if (!nombreBeca || !descripcionBeca || !porcentajeBeca || !cuposBeca || !fechaInicioBeca || !fechaFinBeca || !requisitosBeca || !idCurso) {
            res.render('becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosBecas: req.datosBecas,
                datosCursos: req.datosCursos,
            });
        } else {
            if (accion === 'insertar') {
                const sql = `INSERT INTO becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
                const valores = [idCurso, nombreBeca.trim().toUpperCase(), descripcionBeca.trim().toUpperCase(), porcentajeBeca, cuposBeca, fechaInicioBeca, fechaFinBeca, requisitosBeca.trim().toUpperCase(), 'S'];
                console.log(`CREACION++++>>>${nombreBeca}, ${descripcionBeca}, ${porcentajeBeca}, ${cuposBeca}, ${fechaInicioBeca}, ${fechaFinBeca}, ${idCurso}, ${requisitosBeca}, ${idCurso} `);

                db.query(sql, valores)
                    .then((results) => {
                        res.render('becas', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'La beca se agrego correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'becas',
                            usuarioLogin: req.usuarioLogin,
                            datosBecas: req.datosBecas,
                            datosCursos: req.datosCursos,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreBeca.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreBeca.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosBecas: req.datosBecas,
                                datosCursos: req.datosCursos,
                            });
                        } else {
                            res.render('becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosBecas: req.datosBecas,
                                datosCursos: req.datosCursos,
                            });
                        }
                    });
            } else {
                const sql = `UPDATE BECAS set nombre=$1, descripcion=$2, porcentaje=$3, cupos=$4, fecha_inicio=$5, fecha_fin=$6, requisitos=$7, id_curso=$8 WHERE id_beca=$9`;
                const valores = [nombreBeca.trim().toUpperCase(), descripcionBeca.trim().toUpperCase(), porcentajeBeca, cuposBeca, fechaInicioBeca, fechaFinBeca, requisitosBeca, idCurso, idBeca];
                console.log(`MODIFICACION++++>>>${idBeca}, ${nombreBeca}, ${descripcionBeca}, ${porcentajeBeca}, ${cuposBeca}, ${fechaInicioBeca}, ${fechaFinBeca}, ${idCurso}, ${requisitosBeca}, ${idCurso} `);

                db.query(sql, valores)
                    .then((results) => {
                        res.render('becas', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Modificación exitosa',
                            alertaMensaje: 'La beca se actualizo correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'becas',
                            usuarioLogin: req.usuarioLogin,
                            datosBecas: req.datosBecas,
                            datosCursos: req.datosCursos,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreBeca.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreBeca.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosBecas: req.datosBecas,
                                datosCursos: req.datosCursos,
                            });
                        } else {
                            res.render('becas', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosBecas: req.datosBecas,
                                datosCursos: req.datosCursos,
                            });
                        }
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionBeca = async (req, res) => {
    let sql = ``;
    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE BECAS set estado='N' WHERE id_beca=$1`;
    } else {
        sql = `UPDATE BECAS set estado='S' WHERE id_beca=$1`;
    }
    db.query(sql, [id])
        .then((results) => {
            res.redirect('/becas');
        })
        .catch((error) => {
            res.render('becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'becas',
                usuarioLogin: req.usuarioLogin,
                datosBecas: req.datosBecas,
                datosCursos: req.datosCursos,
            });
        });
};

const eliminarBeca = async (req, res) => {
    let sql = `DELETE FROM BECAS WHERE id_beca=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/becas');
        })
        .catch((error) => {
            res.render('becas', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosBecas: req.datosBecas,
                datosCursos: req.datosCursos,
            });
        });
};

module.exports = {
    consultarBecas,
    accionesBecas,
    inactivacionBeca,
    eliminarBeca,
};
