const db = require('../database/postgresql.pool');
const bcrypt = require('bcryptjs');
const { validarCedula } = require('../util/validadorCedula');

const consultarEstudiantes = async (req, res, next) => {
    try {
        let sql = `SELECT * FROM USUARIOS WHERE id_rol=5 ORDER BY id_usuario DESC`;

        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosEstudiantes = [];
                    return next();
                } else {
                    req.datosEstudiantes = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesEstudiantes = async (req, res) => {
    try {
        let { accion, idUsuario, cedulaUsuario, nombresUsuario, apellidosUsuario, fechaNacimientoUsuario, direccionUsuario, telfMovilUsuario, telfFijoUsuario, emailUsuario, profesionUsuario, sexoUsuario } = req.body;

        if (!cedulaUsuario || !nombresUsuario || !apellidosUsuario || !fechaNacimientoUsuario || !direccionUsuario || !emailUsuario) {
            res.render('usuarios', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosEstudiantes: req.datosEstudiantes,
            });
        } else {
            if (validarCedula(cedulaUsuario)) {
                if (sexoUsuario == 0) {
                    sexoUsuario = 'O';
                }

                let contrasenaHash = await bcrypt.hash(cedulaUsuario, 8);

                if (accion === 'insertar') {
                    const sql = `INSERT INTO USUARIOS (cedula, contrasena, id_rol, nombres, apellidos, fecha_nacimiento, direccion_domicilio, telefono_movil, telefono_fijo, email, sexo, profesion, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
                    const idRol = 5; //Rol para estudiantes
                    const valores = [cedulaUsuario, contrasenaHash, idRol, nombresUsuario.trim().toUpperCase(), apellidosUsuario.trim().toUpperCase(), fechaNacimientoUsuario, direccionUsuario.trim().toUpperCase(), telfMovilUsuario, telfFijoUsuario, emailUsuario, sexoUsuario.trim().toUpperCase(), profesionUsuario.trim().toUpperCase(), 'S'];
                    console.log(`CREACION++++>>> ${cedulaUsuario}, ${contrasenaHash}, ${idRol}, ${nombresUsuario},  ${apellidosUsuario},  ${fechaNacimientoUsuario},  ${direccionUsuario},  ${telfMovilUsuario},  ${telfFijoUsuario},  ${emailUsuario},  ${sexoUsuario},  ${profesionUsuario}`);

                    db.query(sql, valores)
                        .then((results) => {
                            res.render('estudiantes', {
                                esAlerta: true,
                                esAlertaSinRecarga: false,
                                alertaTitulo: 'Registro exitoso',
                                alertaMensaje: 'El estudiante se agrego correctamente',
                                alertaIcono: 'success',
                                mostrarBotonConfirmacion: false,
                                timer: 2000,
                                rutaRedireccion: 'estudiantes',
                                usuarioLogin: req.usuarioLogin,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                        })
                        .catch((error) => {
                            if (error.code === '23505') {
                                console.log(`La cédula ${cedulaUsuario} ya se encuentra en uso`);

                                res.render('estudiantes', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error',
                                    alertaMensaje: `La cédula ${cedulaUsuario} ya se encuentra en uso`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosEstudiantes: req.datosEstudiantes,
                                });
                            } else {
                                res.render('estudiantes', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error inesperado',
                                    alertaMensaje: `Mensaje: ${error.message}`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosEstudiantes: req.datosEstudiantes,
                                });
                            }
                        });
                } else {
                    const sql = `UPDATE USUARIOS set nombres=$1, apellidos=$2, direccion_domicilio=$3, telefono_movil=$4, telefono_fijo=$5, email=$6, sexo=$7, profesion=$8, fecha_nacimiento=$9 where id_usuario=$10`;
                    const valores = [nombresUsuario.trim().toUpperCase(), apellidosUsuario.trim().toUpperCase(), direccionUsuario.trim().toUpperCase(), telfMovilUsuario, telfFijoUsuario, emailUsuario, sexoUsuario.trim().toUpperCase(), profesionUsuario.trim().toUpperCase(), fechaNacimientoUsuario, idUsuario];

                    console.log(`MODIFICACION++++>>>${cedulaUsuario},  ${nombresUsuario},  ${apellidosUsuario},  ${direccionUsuario},  ${telfMovilUsuario},  ${telfFijoUsuario},  ${emailUsuario},  ${sexoUsuario},  ${profesionUsuario}, ${fechaNacimientoUsuario}, ${idUsuario}`);
                    db.query(sql, valores)
                        .then((results) => {
                            res.render('estudiantes', {
                                esAlerta: true,
                                esAlertaSinRecarga: false,
                                alertaTitulo: 'Modificación exitosa',
                                alertaMensaje: 'El estudiante se modifico correctamente',
                                alertaIcono: 'success',
                                mostrarBotonConfirmacion: false,
                                timer: 2000,
                                rutaRedireccion: 'estudiantes',
                                usuarioLogin: req.usuarioLogin,
                                datosEstudiantes: req.datosEstudiantes,
                            });
                        })
                        .catch((error) => {
                            if (error.code === '23505') {
                                console.log(`La cédula ${cedulaUsuario} ya se encuentra en uso`);

                                res.render('estudiantes', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error',
                                    alertaMensaje: `La cédula ${cedulaUsuario} ya se encuentra en uso`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosEstudiantes: req.datosEstudiantes,
                                });
                            } else {
                                res.render('estudiantes', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error inesperado',
                                    alertaMensaje: `Mensaje: ${error.message}`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosEstudiantes: req.datosEstudiantes,
                                });
                            }
                        });
                }
            } else {
                res.render('estudiantes', {
                    esAlerta: false,
                    esAlertaSinRecarga: true,
                    alertaTitulo: 'Error',
                    alertaMensaje: `La cédula ${cedulaUsuario} es incorrecta`,
                    alertaIcono: 'error',
                    mostrarBotonConfirmacion: true,
                    timer: false,
                    usuarioLogin: req.usuarioLogin,
                    datosEstudiantes: req.datosEstudiantes,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionEstudiante = async (req, res) => {
    let sql = ``;

    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE USUARIOS set estado='N' WHERE id_usuario=$1`;
    } else {
        sql = `UPDATE USUARIOS set estado='S' WHERE id_usuario=$1`;
    }

    db.query(sql, [id])
        .then((results) => {
            res.redirect(`/estudiantes`);
        })
        .catch((error) => {
            res.render('usuarios', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'estudiantes',
                usuarioLogin: req.usuarioLogin,
                datosEstudiantes: req.datosEstudiantes,
            });
        });
};

const eliminarEstudiante = async (req, res) => {
    let sql = `DELETE FROM USUARIOS WHERE id_usuario=$1;`;
    const { id } = req.query;
    console.log(`ELIMINAR++++>>>${id} `);

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/estudiantes');
        })
        .catch((error) => {
            res.render('estudiantes', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                usuarioLogin: req.usuarioLogin,
                datosEstudiantes: req.datosEstudiantes,
            });
        });
};

module.exports = {
    consultarEstudiantes,
    accionesEstudiantes,
    inactivacionEstudiante,
    eliminarEstudiante,
};
