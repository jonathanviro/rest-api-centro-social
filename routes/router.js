const express = require('express');
const router = express.Router();
const multer = require('multer');
const { vistaIndex, vistaLogin, vistaRegistroUsuarios, vistaUsuarios, vistaRoles, vistaCursos, vistaSyllabus, vistaHorarios, vistaCapacitaciones, vistaBecas, vistaMatriculas, vistaOtorgarBecas, vistaGraficos } = require('../controllers/PageControllers');
const { createUser, login, logout, estaAutenticado } = require('../controllers/authControllers');
const { consultarUsuarios, consultarSecretaria, consultarDocentes, consultarEstudiantes, accionesUsuarios, inactivacionUsuario } = require('../controllers/usuariosControllers');
const { consultarRoles, inactivacionRol } = require('../controllers/rolesControllers');
const { consultarCursos, accionesCursos, inactivacionCurso } = require('../controllers/cursosControllers');
const { consultarSyllabus, accionesSyllabus, inactivacionSyllabu } = require('../controllers/syllabusControllers');
const { consultarHorarios, accionesHorarios, inactivacionHorario } = require('../controllers/horariosControllers');
const { consultarCapacitaciones, accionesCapacitaciones, inactivacionCapacitacion } = require('../controllers/capacitacionesControllers');
const { consultarBecas, accionesBecas, inactivacionBeca } = require('../controllers/becasControllers');
const { consultarMatriculas, accionesMatriculas, inactivacionMatricula } = require('../controllers/matriculasControllers');
const { consultarBecasOtorgadas, accionesOtorgarBecas, inactivarBeca, eliminarBeca } = require('../controllers/otorgarBecasControllers');
const { consultarEstudiantesBecados, consultarEstudiantesFinanciamiento, consultarEstudiantesInscritos, consultarCapacitacionesDemandadas } = require('../controllers/graficosControllers');
const { reporteEstudiantesBecados } = require('../controllers/reportesControllers');
const cargarPdfController = require('../controllers/cargarPdfControllers');

//Definimos las rutas para las vistas

router.get('/', estaAutenticado, vistaGraficos);
router.get('/login', vistaLogin);
router.get('/registro-usuarios', vistaRegistroUsuarios);
router.get('/secretaria', estaAutenticado, consultarSecretaria, vistaUsuarios);
router.get('/usuarios', estaAutenticado, consultarUsuarios, vistaUsuarios);
router.get('/docentes', estaAutenticado, consultarDocentes, vistaUsuarios);
router.get('/estudiantes', estaAutenticado, consultarEstudiantes, vistaUsuarios);
router.get('/usuarios/:accion', estaAutenticado, consultarEstudiantes, vistaUsuarios);
router.get('/roles', estaAutenticado, consultarRoles, vistaRoles);
router.get('/cursos', estaAutenticado, consultarCursos, vistaCursos);
router.get('/syllabus', estaAutenticado, consultarCursos, consultarSyllabus, vistaSyllabus);
router.get('/horarios', estaAutenticado, consultarHorarios, vistaHorarios);
router.get('/capacitaciones', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, vistaCapacitaciones);
router.get('/becas', estaAutenticado, consultarCursos, consultarBecas, vistaBecas);
router.get('/matriculas', estaAutenticado, consultarCapacitaciones, consultarEstudiantes, consultarMatriculas, vistaMatriculas);
router.get('/otorgar-becas', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, vistaOtorgarBecas);
router.get('/graficos', estaAutenticado, reporteEstudiantesBecados, vistaGraficos);
router.get('/estudiantes-becados', consultarEstudiantesBecados);
router.get('/estudiantes-inscriptos', consultarEstudiantesInscritos);
router.get('/capacitaciones-demandadas', consultarCapacitacionesDemandadas);
router.get('/estudiantes-porcentajes-becas', consultarEstudiantesFinanciamiento);
// router.get('/reporte-estudiantes-becados', reporteEstudiantesBecados);

//Definimos las rutas para los metodos de los controller de autenticacion
router.post('/registro-usuarios', createUser);
router.post('/login', login);
router.get('/logout', logout);

//Definimos las rutas para los metodos de los controller de roles
router.get('/inactivar-rol/', estaAutenticado, consultarRoles, inactivacionRol);

//Definimos las rutas para los metodos de los controller de usuarios
router.post('/usuarios', estaAutenticado, consultarUsuarios, accionesUsuarios);
router.get('/inactivar-usuario/', estaAutenticado, consultarUsuarios, inactivacionUsuario);

//Definimos las rutas para los metodos de los controller de cursos
router.post('/cursos', estaAutenticado, consultarCursos, accionesCursos);
router.get('/inactivar-curso/:id', estaAutenticado, consultarCursos, inactivacionCurso);

//Definimos las rutas para los metodos de los controller de syllabus
router.post('/syllabus', estaAutenticado, consultarCursos, consultarSyllabus, accionesSyllabus);
router.get('/inactivar-syllabu/:id', estaAutenticado, consultarSyllabus, inactivacionSyllabu);

//Definimos las rutas para los metodos de los controller de horarios
router.post('/horarios', estaAutenticado, consultarHorarios, accionesHorarios);
router.get('/inactivar-horario/:id', estaAutenticado, consultarHorarios, inactivacionHorario);

//Definimos las rutas para los metodos de los controller de horarios
router.post('/capacitaciones', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, accionesCapacitaciones);
router.get('/inactivar-capacitacion/', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, inactivacionCapacitacion);

//Definimos las rutas para los metodos de los controller de becas
router.post('/becas', estaAutenticado, consultarCursos, consultarBecas, accionesBecas);
router.get('/inactivar-beca/', estaAutenticado, consultarCursos, consultarBecas, inactivacionBeca);

//Definimos las rutas para los metodos de los controller de matriculas
router.post('/matriculas', estaAutenticado, consultarCapacitaciones, consultarEstudiantes, consultarMatriculas, accionesMatriculas);
router.get('/inactivar-matricula/', estaAutenticado, consultarCapacitaciones, consultarEstudiantes, consultarMatriculas, inactivacionMatricula);

//Definimos las rutas para los metodos de los controller de otorgar becas
router.post('/otorgar-becas', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, accionesOtorgarBecas);
router.get('/eliminar-beca-otorgada/', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, eliminarBeca);
router.get('/inactivar-beca-otorgada/', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, inactivarBeca);
router.post('/cargar-pdf', cargarPdfController.upload, estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, cargarPdfController.uploadFile);

//Definimos las rutas para los metodos de los controller de graficos

module.exports = {
    routes: router,
};
