const express = require('express');
const router = express.Router();
const multer = require('multer');
const { vistaIndex, vistaLogin, vistaRegistroUsuarios, vistaUsuarios, vistaSecretarias, vistaDocentes, vistaEstudiantes, vistaRoles, vistaCursos, vistaSyllabus, vistaHorarios, vistaCapacitaciones, vistaBecas, vistaMatriculas, vistaOtorgarBecas, vistaGraficos } = require('../controllers/PageControllers');
const { createUser, login, logout, estaAutenticado } = require('../controllers/authControllers');
const { consultarUsuarios, accionesUsuarios, inactivacionUsuario } = require('../controllers/usuariosControllers');
const { consultarSecretarias, accionesSecretarias, inactivacionSecretaria, eliminarSecretaria } = require('../controllers/secretariasControllers');
const { consultarDocentes, accionesDocentes, inactivacionDocente, eliminarDocente } = require('../controllers/docentesControllers');
const { consultarEstudiantes, accionesEstudiantes, inactivacionEstudiante, eliminarEstudiante } = require('../controllers/estudiantesControllers');
const { consultarRoles, inactivacionRol } = require('../controllers/rolesControllers');
const { consultarCursos, accionesCursos, inactivacionCurso, eliminarCurso } = require('../controllers/cursosControllers');
const { consultarSyllabus, accionesSyllabus, inactivacionSyllabu, eliminarSyllabu } = require('../controllers/syllabusControllers');
const { consultarHorarios, accionesHorarios, inactivacionHorario, eliminarHorario } = require('../controllers/horariosControllers');
const { consultarCapacitaciones, accionesCapacitaciones, inactivacionCapacitacion, eliminarCapacitacion } = require('../controllers/capacitacionesControllers');
const { consultarBecas, accionesBecas, inactivacionBeca, eliminarBeca } = require('../controllers/becasControllers');
const { consultarMatriculas, accionesMatriculas, inactivacionMatricula, eliminarMatricula } = require('../controllers/matriculasControllers');
const { consultarBecasOtorgadas, accionesOtorgarBecas, eliminarBecaOtorgada } = require('../controllers/otorgarBecasControllers');
const { consultarEstudiantesBecados, consultarEstudiantesFinanciamiento, consultarEstudiantesInscritos, consultarCapacitacionesDemandadas } = require('../controllers/graficosControllers');
const { reporteEstudiantesBecados } = require('../controllers/reportesControllers');
const cargarPdfController = require('../controllers/cargarPdfControllers');

//Definimos las rutas para las vistas

router.get('/', estaAutenticado, vistaGraficos);
router.get('/login', vistaLogin);
router.get('/registro-usuarios', vistaRegistroUsuarios);
router.get('/secretarias', estaAutenticado, consultarSecretarias, vistaSecretarias);
router.get('/docentes', estaAutenticado, consultarDocentes, vistaDocentes);
router.get('/estudiantes', estaAutenticado, consultarEstudiantes, vistaEstudiantes);
router.get('/roles', estaAutenticado, consultarRoles, vistaRoles);
router.get('/cursos', estaAutenticado, consultarCursos, vistaCursos);
router.get('/syllabus', estaAutenticado, consultarCursos, consultarSyllabus, vistaSyllabus);
router.get('/horarios', estaAutenticado, consultarHorarios, vistaHorarios);
router.get('/capacitaciones', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, vistaCapacitaciones);
router.get('/becas', estaAutenticado, consultarCursos, consultarBecas, vistaBecas);
router.get('/matriculas', estaAutenticado, consultarCapacitaciones, consultarHorarios, consultarEstudiantes, consultarMatriculas, vistaMatriculas);
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

//Definimos las rutas para los metodos de los controller de docentes
router.post('/secretarias', estaAutenticado, consultarSecretarias, accionesSecretarias);
router.get('/eliminar-secretaria/', estaAutenticado, consultarSecretarias, eliminarSecretaria);
router.get('/inactivar-secretaria/', estaAutenticado, consultarSecretarias, inactivacionSecretaria);

//Definimos las rutas para los metodos de los controller de docentes
router.post('/docentes', estaAutenticado, consultarDocentes, accionesDocentes);
router.get('/eliminar-docente/', estaAutenticado, consultarDocentes, eliminarDocente);
router.get('/inactivar-docente/', estaAutenticado, consultarDocentes, inactivacionDocente);

//Definimos las rutas para los metodos de los controller de estudiantes
router.post('/estudiantes', estaAutenticado, consultarEstudiantes, accionesEstudiantes);
router.get('/eliminar-estudiante/', estaAutenticado, consultarEstudiantes, eliminarEstudiante);
router.get('/inactivar-estudiante/', estaAutenticado, consultarEstudiantes, inactivacionEstudiante);

//Definimos las rutas para los metodos de los controller de cursos
router.post('/cursos', estaAutenticado, consultarCursos, accionesCursos);
router.get('/eliminar-curso/', estaAutenticado, consultarCursos, eliminarCurso);
router.get('/inactivar-curso/', estaAutenticado, consultarCursos, inactivacionCurso);

//Definimos las rutas para los metodos de los controller de syllabus
router.post('/syllabus', estaAutenticado, consultarCursos, consultarSyllabus, accionesSyllabus);
router.get('/eliminar-syllabu/', estaAutenticado, consultarSyllabus, eliminarSyllabu);
router.get('/inactivar-syllabu/', estaAutenticado, consultarSyllabus, inactivacionSyllabu);

//Definimos las rutas para los metodos de los controller de horarios
router.post('/horarios', estaAutenticado, consultarHorarios, accionesHorarios);
router.get('/eliminar-horario/', estaAutenticado, consultarHorarios, eliminarHorario);
router.get('/inactivar-horario/', estaAutenticado, consultarHorarios, inactivacionHorario);

//Definimos las rutas para los metodos de los controller de horarios
router.post('/capacitaciones', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, accionesCapacitaciones);
router.get('/eliminar-capacitacion/', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, eliminarCapacitacion);
router.get('/inactivar-capacitacion/', estaAutenticado, consultarCursos, consultarHorarios, consultarDocentes, consultarCapacitaciones, inactivacionCapacitacion);

//Definimos las rutas para los metodos de los controller de becas
router.post('/becas', estaAutenticado, consultarCursos, consultarBecas, accionesBecas);
router.get('/eliminar-beca/', estaAutenticado, consultarCursos, consultarBecas, eliminarBeca);
router.get('/inactivar-beca/', estaAutenticado, consultarCursos, consultarBecas, inactivacionBeca);

//Definimos las rutas para los metodos de los controller de matriculas
router.post('/matriculas', estaAutenticado, consultarCapacitaciones, consultarHorarios, consultarEstudiantes, consultarMatriculas, accionesMatriculas);
router.get('/eliminar-matricula/', estaAutenticado, consultarCapacitaciones, consultarHorarios, consultarEstudiantes, consultarMatriculas, eliminarMatricula);
router.get('/inactivar-matricula/', estaAutenticado, consultarCapacitaciones, consultarHorarios, consultarEstudiantes, consultarMatriculas, inactivacionMatricula);

//Definimos las rutas para los metodos de los controller de otorgar becas
router.post('/otorgar-becas', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, accionesOtorgarBecas);
router.get('/eliminar-beca-otorgada/', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, eliminarBecaOtorgada);
router.get('/inactivar-beca-otorgada/', estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, eliminarBecaOtorgada);
router.post('/cargar-pdf', cargarPdfController.upload, estaAutenticado, consultarBecas, consultarEstudiantes, consultarBecasOtorgadas, cargarPdfController.uploadFile);

//Definimos las rutas para los metodos de los controller de graficos

module.exports = {
    routes: router,
};
