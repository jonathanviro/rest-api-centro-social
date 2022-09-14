const db = require('../database/postgresql.pool');
const { consultarCursos } = require('../controllers/cursosControllers');

const vistaIndex = async (req, res) => {
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

const vistaSecretarias = (req, res) => {
    res.render('secretarias', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosSecretarias: req.datosSecretarias });
};

const vistaDocentes = (req, res) => {
    res.render('docentes', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosDocentes: req.datosDocentes });
};

const vistaEstudiantes = (req, res) => {
    res.render('estudiantes', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosEstudiantes: req.datosEstudiantes });
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
    res.render('matriculas', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosCapacitaciones: req.datosCapacitaciones, datosHorarios: req.datosHorarios, datosEstudiantes: req.datosEstudiantes, datosMatriculas: req.datosMatriculas });
};

const vistaOtorgarBecas = (req, res) => {
    res.render('otorgar-becas', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosBecas: req.datosBecas, datosEstudiantes: req.datosEstudiantes, datosOtorgarBecas: req.datosOtorgarBecas });
};
const vistaGraficos = (req, res) => {
    res.render('graficos', { usuarioLogin: req.usuarioLogin, esAlerta: false, esAlertaSinRecarga: false, datosEstudiantesBecados: req.datosEstudiantesBecados });
};

module.exports = {
    vistaIndex,
    vistaLogin,
    vistaRegistroUsuarios,
    vistaUsuarios,
    vistaSecretarias,
    vistaDocentes,
    vistaEstudiantes,
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
