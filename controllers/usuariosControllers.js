const db = require('../database/postgresql.pool');
const bcrypt = require('bcryptjs');
const { validarCedula } = require('../util/validadorCedula');

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
                    req.datosDocentes = [];
                    return next();
                } else {
                    req.datosDocentes = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const consultarSecretaria = async (req, res, next) => {
    try {
        let sql = `SELECT * FROM USUARIOS WHERE id_rol=3 ORDER BY id_usuario DESC`;

        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosDocentes = [];
                    return next();
                } else {
                    req.datosDocentes = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const consultarDocentes = async (req, res, next) => {
    try {
        let sql = `SELECT * FROM USUARIOS WHERE id_rol=4 ORDER BY id_usuario DESC`;

        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosDocentes = [];
                    return next();
                } else {
                    req.datosDocentes = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const consultarEstudiantes = async (req, res, next) => {
    try {
        let sql = `SELECT * FROM USUARIOS WHERE id_rol=5 ORDER BY id_usuario DESC`;

        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosDocentes = [];
                    return next();
                } else {
                    req.datosDocentes = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const accionesUsuarios = async (req, res) => {
    try {
        let { accion, idUsuario, cedulaUsuario, nombresUsuario, apellidosUsuario, fechaNacimientoUsuario, direccionUsuario, telfMovilUsuario, telfFijoUsuario, emailUsuario, profesionUsuario, sexoUsuario, idRolUsuarios } = req.body;

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
                datosDocentes: req.datosDocentes,
            });
        } else {
            if (validarCedula(cedulaUsuario)) {
                if (!idRolUsuarios) {
                    idRolUsuarios = 5;
                }

                if (sexoUsuario == 0) {
                    sexoUsuario = 'O';
                }

                let contrasenaHash = await bcrypt.hash(cedulaUsuario, 8);

                if (accion === 'insertar') {
                    const sql = `INSERT INTO USUARIOS (cedula, contrasena, id_rol, nombres, apellidos, fecha_nacimiento, direccion_domicilio, telefono_movil, telefono_fijo, email, sexo, profesion, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
                    const valores = [cedulaUsuario, contrasenaHash, idRolUsuarios, nombresUsuario.trim().toUpperCase(), apellidosUsuario.trim().toUpperCase(), fechaNacimientoUsuario, direccionUsuario.trim().toUpperCase(), telfMovilUsuario, telfFijoUsuario, emailUsuario, sexoUsuario.trim().toUpperCase(), profesionUsuario.trim().toUpperCase(), 'S'];
                    console.log(`CREACION++++>>> ${cedulaUsuario}, ${contrasenaHash}, ${nombresUsuario},  ${apellidosUsuario},  ${fechaNacimientoUsuario},  ${direccionUsuario},  ${telfMovilUsuario},  ${telfFijoUsuario},  ${emailUsuario},  ${sexoUsuario},  ${profesionUsuario}`);

                    db.query(sql, valores)
                        .then((results) => {
                            res.render('usuarios', {
                                esAlerta: true,
                                esAlertaSinRecarga: false,
                                alertaTitulo: 'Registro exitoso',
                                alertaMensaje: 'El usuarios se agrego correctamente',
                                alertaIcono: 'success',
                                mostrarBotonConfirmacion: false,
                                timer: 2000,
                                rutaRedireccion: 'usuarios',
                                usuarioLogin: req.usuarioLogin,
                                datosDocentes: req.datosDocentes,
                            });
                        })
                        .catch((error) => {
                            if (error.code === '23505') {
                                console.log(`La cédula ${cedulaUsuario} ya se encuentra en uso`);

                                res.render('usuarios', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error',
                                    alertaMensaje: `La cédula ${cedulaUsuario} ya se encuentra en uso`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosDocentes: req.datosDocentes,
                                });
                            } else {
                                res.render('usuarios', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error inesperado',
                                    alertaMensaje: `Mensaje: ${error.message}`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosDocentes: req.datosDocentes,
                                });
                            }
                        });
                } else {
                    const sql = `UPDATE USUARIOS set id_rol=$1, nombres=$2, apellidos=$3, direccion_domicilio=$4, telefono_movil=$5, telefono_fijo=$6, email=$7, sexo=$8, profesion=$9, fecha_nacimiento=$10 where id_usuario=$11`;
                    const valores = [idRolUsuarios, nombresUsuario.trim().toUpperCase(), apellidosUsuario.trim().toUpperCase(), direccionUsuario.trim().toUpperCase(), telfMovilUsuario, telfFijoUsuario, emailUsuario, sexoUsuario.trim().toUpperCase(), profesionUsuario.trim().toUpperCase(), fechaNacimientoUsuario, idUsuario];

                    console.log(`MODIFICACION++++>>>${cedulaUsuario}, ${idRolUsuarios}, ${nombresUsuario},  ${apellidosUsuario},  ${direccionUsuario},  ${telfMovilUsuario},  ${telfFijoUsuario},  ${emailUsuario},  ${sexoUsuario},  ${profesionUsuario}, ${fechaNacimientoUsuario}, ${idUsuario}`);
                    db.query(sql, valores)
                        .then((results) => {
                            res.render('usuarios', {
                                esAlerta: true,
                                esAlertaSinRecarga: false,
                                alertaTitulo: 'Modificación exitosa',
                                alertaMensaje: 'El usuario se modifico correctamente',
                                alertaIcono: 'success',
                                mostrarBotonConfirmacion: false,
                                timer: 2000,
                                rutaRedireccion: 'usuarios',
                                usuarioLogin: req.usuarioLogin,
                                datosDocentes: req.datosDocentes,
                            });
                        })
                        .catch((error) => {
                            if (error.code === '23505') {
                                console.log(`La cédula ${cedulaUsuario} ya se encuentra en uso`);

                                res.render('usuarios', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error',
                                    alertaMensaje: `La cédula ${cedulaUsuario} ya se encuentra en uso`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosDocentes: req.datosDocentes,
                                });
                            } else {
                                res.render('usuarios', {
                                    esAlerta: false,
                                    esAlertaSinRecarga: true,
                                    alertaTitulo: 'Error inesperado',
                                    alertaMensaje: `Mensaje: ${error.message}`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    usuarioLogin: req.usuarioLogin,
                                    datosDocentes: req.datosDocentes,
                                });
                            }
                        });
                }
            } else {
                res.render('usuarios', {
                    esAlerta: false,
                    esAlertaSinRecarga: true,
                    alertaTitulo: 'Error',
                    alertaMensaje: `La cédula ${cedulaUsuario} es incorrecta`,
                    alertaIcono: 'error',
                    mostrarBotonConfirmacion: true,
                    timer: false,
                    usuarioLogin: req.usuarioLogin,
                    datosDocentes: req.datosDocentes,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const inactivacionUsuario = async (req, res) => {
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
            res.redirect(`/docentes`);
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
                rutaRedireccion: 'docentes',
                usuarioLogin: req.usuarioLogin,
                datosDocentes: req.datosDocentes,
            });
        });
};

module.exports = {
    consultarUsuarios,
    consultarSecretaria,
    consultarDocentes,
    consultarEstudiantes,
    accionesUsuarios,
    inactivacionUsuario,
};
