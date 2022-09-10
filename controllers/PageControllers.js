const db = require('../database/postgresql.pool');
const { consultarCursos } = require('../controllers/cursosControllers');

const vistaIndex = async (req, res) => {
    //const query = `SELECT * FROM "USUARIOS"`;
    // const responseBD = await pool.query(query, async (error, results) => {
    //     if (!error && error.code === '42P01') {
    //         console.log(`${error}`);
    //     } else {
    //         console.log(results.rows);
    //     }
    // });

    // pool.query(query)
    //     .then((res) => {
    //         if (res.rowCount > 0) {
    //             console.log(res.rows[0]['CONTRASENA']);
    //         } else {
    //             console.log('No hay datos');
    //         }
    //     })
    //     .catch((err) => {
    //         if (err.code === '42P01') {
    //             console.log(`La tabla no existe --- ${err}`);
    //         }
    //     });

    // console.log('==========================================================================================================================================');
    // console.log(req);
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    res.render('index', { usuarioLogin: req.usuarioLogin });
};

const vistaLogin = (req, res) => {
    res.render('login', { esAlerta: false });
};

const vistaRegistroUsuarios = (req, res) => {
    res.render('registro-usuarios', { esAlerta: false });
};

const vistaUsuarios = (req, res) => {
    res.render('usuarios', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosUsuarios: req.datosUsuarios });
};

const vistaRoles = (req, res) => {
    res.render('roles', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosRoles: req.datosRoles });
};

const vistaCursos = (req, res) => {
    res.render('cursos', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCursos: req.datosCursos });
};

const vistaSyllabus = (req, res) => {
    res.render('syllabus', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCursos: req.datosCursos, datosSyllabus: req.datosSyllabus });
};

const vistaHorarios = (req, res) => {
    res.render('horarios', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosHorarios: req.datosHorarios });
};

const vistaCapacitaciones = (req, res) => {
    res.render('capacitaciones', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCursos: req.datosCursos, datosHorarios: req.datosHorarios, datosDocentes: req.datosDocentes, datosCapacitaciones: req.datosCapacitaciones });
};

const vistaBecas = (req, res) => {
    res.render('becas', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCursos: req.datosCursos, datosBecas: req.datosBecas });
};

const vistaMatriculas = (req, res) => {
    res.render('matriculas', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCapacitaciones: req.datosCapacitaciones, datosUsuarios: req.datosUsuarios, datosMatriculas: req.datosMatriculas });
};

const vistaOtorgarBecas = (req, res) => {
    res.render('otorgar-becas', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosBecas: req.datosBecas, datosUsuarios: req.datosUsuarios, datosOtorgarBecas: req.datosOtorgarBecas });
};
const vistaGraficos = (req, res) => {
    res.render('graficos', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosEstudiantesBecados: req.datosEstudiantesBecados });
};

module.exports = {
    vistaIndex,
    vistaLogin,
    vistaRegistroUsuarios,
    vistaUsuarios,
    vistaRoles,
    vistaCursos,
    vistaSyllabus,
    vistaHorarios,
    vistaCapacitaciones,
    vistaBecas,
    vistaMatriculas,
    vistaOtorgarBecas,
    vistaGraficos,
};
