const db = require('../database/postgresql.pool');

const consultarRoles = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM ROLES ORDER BY id_rol ASC;`;
        db.query(sql, async (error, results) => {
            if (!error) {
                if (results.rowCount == 0) {
                    req.datosRoles = [];
                    return next();
                } else {
                    req.datosRoles = results.rows;
                    return next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return next();
    }
};

const inactivacionRol = async (req, res) => {
    let sql = ``;
    const { id, estado } = req.query;
    console.log(`INACTIVACION++++>>>${id} , ${estado}`);
    if (estado == 'S') {
        sql = `UPDATE ROLES set estado='N' WHERE id_rol=$1`;
    } else {
        sql = `UPDATE ROLES set estado='S' WHERE id_rol=$1`;
    }

    db.query(sql, [id])
        .then((results) => {
            res.redirect('/roles');
        })
        .catch((error) => {
            res.render('roles', {
                esAlerta: false,
                esAlertaSinRecarga: true,
                alertaTitulo: 'Error inesperado',
                alertaMensaje: `Mensaje: ${error.message}`,
                alertaIcono: 'error',
                mostrarBotonConfirmacion: true,
                timer: false,
                rutaRedireccion: 'roles',
                usuarioLogin: req.usuarioLogin,
                datosRoles: req.datosRoles,
            });
        });
};

module.exports = {
    consultarRoles,
    inactivacionRol,
};
