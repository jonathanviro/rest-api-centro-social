const db = require('../database/postgresql.pool');

const consultarCursos = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM CURSOS ORDER BY id_curso DESC;`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosCursos = [];
                    return next();
                } else {
                    req.datosCursos = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesCursos = async (req, res) => {
    try {
        let { accion, idCurso, nombreCurso, descripcionCurso, valorCurso, numeroAulaCurso, incluyeMaterialesCurso, estadoCurso } = req.body;
        if (!nombreCurso || !descripcionCurso || !valorCurso || !numeroAulaCurso) {
            res.render('cursos', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosCursos: req.datosCursos,
            });
        } else {
            if (accion === 'insertar') {
                const sql = `INSERT INTO CURSOS (nombre, descripcion, valor_matricula, numero_aula, incluye_materiales, estado) VALUES ($1, $2, $3, $4, $5, $6)`;

                if (!incluyeMaterialesCurso) {
                    incluyeMaterialesCurso = 'N';
                }

                console.log(`CREACION++++>>>${nombreCurso}, ${descripcionCurso}, ${valorCurso}, ${numeroAulaCurso}, ${incluyeMaterialesCurso}`);

                db.query(sql, [nombreCurso.trim().toUpperCase(), descripcionCurso.trim().toUpperCase(), valorCurso.trim(), numeroAulaCurso.trim().toUpperCase(), incluyeMaterialesCurso, 'S'])
                    .then((results) => {
                        res.render('cursos', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'El curso se agrego correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'cursos',
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreCurso.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('cursos', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreCurso.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCursos: req.datosCursos,
                            });
                        } else {
                            res.render('cursos', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCursos: req.datosCursos,
                            });
                        }
                    });
            } else {
                const sql = `UPDATE CURSOS set nombre=$1, descripcion=$2, valor_matricula=$3, numero_aula=$4, incluye_materiales=$5 WHERE id_curso=$6`;

                if (!incluyeMaterialesCurso) {
                    incluyeMaterialesCurso = 'N';
                }

                console.log(`MODIFICACION++++>>>${idCurso}, ${nombreCurso}, ${descripcionCurso}, ${valorCurso}, ${numeroAulaCurso}, ${incluyeMaterialesCurso}, ${estadoCurso}`);
                db.query(sql, [nombreCurso.trim().toUpperCase(), descripcionCurso.trim().toUpperCase(), valorCurso.trim(), numeroAulaCurso.trim().toUpperCase(), incluyeMaterialesCurso, idCurso])
                    .then((results) => {
                        res.render('cursos', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'El curso se modifico correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'cursos',
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            console.log(`El nombre ${nombreCurso.trim().toUpperCase()} ya se encuentra en uso`);

                            res.render('cursos', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `El nombre ${nombreCurso.trim().toUpperCase()} ya se encuentra en uso`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
                                datosCursos: req.datosCursos,
                            });
                        } else {
                            res.render('cursos', {
                                esAlerta: false,
                                esAlertaSinRecarga: true,
                                alertaTitulo: 'Error inesperado',
                                alertaMensaje: `Mensaje: ${error.message}`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                usuarioLogin: req.usuarioLogin,
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

const inactivacionCurso = async (req, res) => {
    let sql = ``;

    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE CURSOS set estado='N' WHERE id_curso=$1`;
    } else {
        sql = `UPDATE CURSOS set estado='S' WHERE id_curso=$1`;
    }

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/cursos');
        })
        .catch((error) => {
            res.render('cursos', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'cursos',
                usuarioLogin: req.usuarioLogin,
                datosCursos: req.datosCursos,
            });
        });
};

const eliminarCurso = async (req, res) => {
    let sql = `DELETE FROM CURSOS WHERE id_curso=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/cursos');
        })
        .catch((error) => {
            res.render('cursos', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosCursos: req.datosCursos,
            });
        });
};

module.exports = {
    consultarCursos,
    accionesCursos,
    inactivacionCurso,
    eliminarCurso,
};
