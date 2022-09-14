const db = require('../database/postgresql.pool');

const consultarSyllabus = async (req, res, next) => {
    try {
        const sql = `SELECT S.*, C.nombre as nombre_curso 
                       FROM SYLLABUS S, CURSOS C  
                      WHERE S.id_curso = C.id_curso 
                      ORDER BY S.id_syllabu DESC;`;

        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosSyllabus = [];
                    return next();
                } else {
                    req.datosSyllabus = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesSyllabus = async (req, res) => {
    try {
        let { accion, idSyllabu, descripcionSyllabu, idCurso, estadoSyllabu } = req.body;
        let mensaje = ``;
        if (!descripcionSyllabu || idCurso === '0') {
            if (idCurso === '0') {
                mensaje = 'No ha seleccionado un curso para el syllabus';
            }

            if (!descripcionSyllabu) {
                mensaje = 'La descripcion del syllabus esta vacia';
            }

            res.render('syllabus', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: mensaje,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosCursos: req.datosCursos,
                datosSyllabus: req.datosSyllabus,
            });
        } else {
            if (accion === 'insertar') {
                const sql = `INSERT INTO SYLLABUS (descripcion, id_curso, estado) VALUES ($1, $2, $3)`;

                console.log(`CREACION++++>>>${descripcionSyllabu}, ${idCurso}`);

                db.query(sql, [descripcionSyllabu.trim().toUpperCase(), idCurso, 'S'])
                    .then((results) => {
                        res.render('syllabus', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'El syllabus se agrego correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'syllabus',
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                            datosSyllabus: req.datosSyllabus,
                        });
                    })
                    .catch((error) => {
                        res.render('syllabus', {
                            esAlerta: false,
                            esAlertaSinRecarga: true,
                            alertaTitulo: 'Error inesperado',
                            alertaMensaje: `Mensaje: ${error.message}`,
                            alertaIcono: 'error',
                            mostrarBotonConfirmacion: true,
                            timer: false,
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                            datosSyllabus: req.datosSyllabus,
                        });
                    });
            } else {
                const sql = `UPDATE SYLLABUS set descripcion=$1, id_curso=$2 WHERE id_syllabu=$3`;

                console.log(`MODIFICACION++++>>>${idSyllabu}, ${descripcionSyllabu}, ${idCurso}`);
                db.query(sql, [descripcionSyllabu.trim().toUpperCase(), idCurso, idSyllabu])
                    .then((results) => {
                        res.render('syllabus', {
                            esAlerta: true,
                            esAlertaSinRecarga: false,
                            alertaTitulo: 'Registro exitoso',
                            alertaMensaje: 'El syllabu se modifico correctamente',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'syllabus',
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                            datosSyllabus: req.datosSyllabus,
                        });
                    })
                    .catch((error) => {
                        res.render('syllabus', {
                            esAlerta: false,
                            esAlertaSinRecarga: true,
                            alertaTitulo: 'Error inesperado',
                            alertaMensaje: `Mensaje: ${error.message}`,
                            alertaIcono: 'error',
                            mostrarBotonConfirmacion: true,
                            timer: false,
                            usuarioLogin: req.usuarioLogin,
                            datosCursos: req.datosCursos,
                            datosSyllabus: req.datosSyllabus,
                        });
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionSyllabu = async (req, res) => {
    let sql = ``;

    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE SYLLABUS set estado='N' WHERE id_syllabu=$1`;
    } else {
        sql = `UPDATE SYLLABUS set estado='S' WHERE id_syllabu=$1`;
    }

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/syllabus');
        })
        .catch((error) => {
            res.render('syllabus', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'syllabus',
                usuarioLogin: req.usuarioLogin,
                datosSyllabus: req.datosSyllabus,
            });
        });
};

const eliminarSyllabu = async (req, res) => {
    let sql = `DELETE FROM SYLLABUS WHERE id_syllabu=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/syllabus');
        })
        .catch((error) => {
            res.render('syllabus', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosSyllabus: req.datosSyllabus,
            });
        });
};

module.exports = {
    consultarSyllabus,
    accionesSyllabus,
    inactivacionSyllabu,
    eliminarSyllabu,
};
