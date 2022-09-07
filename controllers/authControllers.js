const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/postgresql.pool');
const { promisify } = require('util');
const { Console } = require('console');
const { validarCedula } = require('../util/validadorCedula');

const createUser = async (req, res) => {
    try {
        const { cedula, contrasena, nombres, apellidos } = req.body;
        if (!cedula || !contrasena || !nombres || !apellidos) {
            res.render('registro-usuarios', {
                esAlerta: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'registro-usuarios',
            });
        } else {
            if (validarCedula(cedula)) {
                let contrasenaHash = await bcrypt.hash(contrasena, 8);

                // console.log(`cedula: ${cedula} - contrasena: ${contrasena} - contrasenaHash: ${contrasenaHash}`);

                const sql = `INSERT INTO USUARIOS (cedula, contrasena, nombres, apellidos) VALUES ($1, $2, $3, $4)`;

                db.query(sql, [cedula, contrasenaHash, nombres, apellidos])
                    .then((results) => {
                        res.render('registro-usuarios', {
                            esAlerta: true,
                            alertaTitulo: 'Registro exitosa',
                            alertaMensaje: 'Inicie Sesión para continuar!',
                            alertaIcono: 'success',
                            mostrarBotonConfirmacion: false,
                            timer: 2000,
                            rutaRedireccion: 'login',
                        });
                    })
                    .catch((error) => {
                        if (error.code === '23505') {
                            //console.log(`La cédula ${cedula} ya se encuentra registrada`);
                            res.render('registro-usuarios', {
                                esAlerta: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: `La cédula ${cedula} ya se encuentra registrada`,
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                rutaRedireccion: 'registro-usuarios',
                            });
                        }
                    });
            } else {
                res.render('registro-usuarios', {
                    esAlerta: true,
                    alertaTitulo: 'Error',
                    alertaMensaje: `La cédula ${cedula} es incorrecta`,
                    alertaIcono: 'error',
                    mostrarBotonConfirmacion: true,
                    timer: false,
                    rutaRedireccion: 'registro-usuarios',
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { cedula, contrasena } = req.body;
        // console.log(`cedula: ${cedula} - contrasena: ${contrasena}`);

        if (!cedula || !contrasena) {
            res.render('login', {
                esAlerta: true,
                alertaTitulo: 'Error',
                alertaMensaje: 'No ha llenado todos los campos',
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'login',
            });
        } else {
            if (validarCedula(cedula)) {
                const sql = `SELECT * FROM USUARIOS WHERE cedula = $1`;

                db.query(sql, [cedula], async (error, results) => {
                    if (!error) {
                        if (results.rowCount == 0 || !(await bcrypt.compare(contrasena, results.rows[0]['contrasena']))) {
                            res.render('login', {
                                esAlerta: true,
                                alertaTitulo: 'Error',
                                alertaMensaje: 'Usuarios y/o Contraseña incorrecta',
                                alertaIcono: 'error',
                                mostrarBotonConfirmacion: true,
                                timer: false,
                                rutaRedireccion: 'login',
                            });
                        } else {
                            //inicio de session OK
                            const idUsuarioDB = results.rows[0]['id_usuario'];
                            const idRolUsuario = results.rows[0]['id_rol'];
                            if (idRolUsuario == 5) {
                                res.render('login', {
                                    esAlerta: true,
                                    alertaTitulo: 'Error',
                                    alertaMensaje: `No tiene los permisos para ingresar`,
                                    alertaIcono: 'error',
                                    mostrarBotonConfirmacion: true,
                                    timer: false,
                                    rutaRedireccion: 'login',
                                });
                            } else {
                                const token = jwt.sign({ idUsuarioDB: idUsuarioDB }, process.env.JWT_SECRETO, { expiresIn: process.env.JWT_TIEMPO_EXPIRA_TOKEN });
                                // console.log(`TOKEN:  ${token} para el usuario ${idUsuarioDB}`);

                                const cookiesOptions = {
                                    expires: new Date(Date.now() + process.env.JWT_TIEMPO_EXPIRA_COOKIE * 24 * 60 * 60 * 1000),
                                    httpOnly: true,
                                };

                                res.cookie('jwt', token, cookiesOptions);
                                res.render('login', {
                                    esAlerta: true,
                                    alertaTitulo: 'Conexión exitosa',
                                    alertaMensaje: 'Loggin Correcto!',
                                    alertaIcono: 'success',
                                    mostrarBotonConfirmacion: false,
                                    timer: 800,
                                    rutaRedireccion: '',
                                });
                            }
                        }
                    }
                });
            } else {
                res.render('login', {
                    esAlerta: true,
                    alertaTitulo: 'Error',
                    alertaMensaje: `La cédula ${cedula} es incorrecta`,
                    alertaIcono: 'error',
                    mostrarBotonConfirmacion: true,
                    timer: false,
                    rutaRedireccion: 'login',
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const estaAutenticado = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const cookieDecodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            // console.log(`cookieDECODIFICADA=========>`);
            console.log(cookieDecodificada);
            const sql = `SELECT * FROM USUARIOS WHERE id_usuario = $1`;
            db.query(sql, [cookieDecodificada.idUsuarioDB], async (error, results) => {
                if (!error) {
                    if (results.rowCount == 0) {
                        return next();
                    } else {
                        req.usuarioLogin = results.rows[0];
                        return next();
                    }
                }
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        res.redirect('/login');
    }
};

const logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/login');
};

module.exports = {
    createUser,
    login,
    logout,
    estaAutenticado,
};
