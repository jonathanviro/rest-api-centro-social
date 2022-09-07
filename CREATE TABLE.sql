CREATE TABLE IF NOT EXISTS USUARIOS
(
    ID_USUARIO serial NOT NULL,
    CEDULA character varying(10) NOT NULL unique,
    CONTRASENA character varying,
    ID_ROL integer,
    NOMBRES character varying(50) NOT NULL,
    APELLIDOS character varying(50) NOT NULL,
    FECHA_NACIMIENTO date,
    DIRECCION_DOMICILIO character varying(200),
    TELEFONO_MOVIL character varying(20),
    TELEFONO_FIJO character varying(20),
    EMAIL character varying(50),
    SEXO character varying(10),
    PROFESION character varying(50),
    ESTADO character varying(1),
    PRIMARY KEY (ID_USUARIO)
);

CREATE TABLE IF NOT EXISTS ROLES
(
    ID_ROL serial NOT NULL,
    DESCRIPCION character varying(200),
    ESTADO character varying(1),
    PRIMARY KEY (ID_ROL)
);

CREATE TABLE IF NOT EXISTS SYLLABUS
(
    ID_SYLLABU serial NOT NULL,
    ID_CURSO integer NOT NULL,
    DESCRIPCION character varying(500),
    ESTADO character varying(1),
    PRIMARY KEY (ID_SYLLABU)
);

CREATE TABLE IF NOT EXISTS CURSOS
(
    ID_CURSO serial NOT NULL,
    ID_SYLLABU integer,
    NOMBRE character varying NOT NULL,
    DESCRIPCION character varying(500),
    VALOR_MATRICULA numeric(10, 2),
    NUMERO_AULA character varying,
    INCLUYE_MATERIALES character varying(1),
    ESTADO character varying(1),
    PRIMARY KEY (ID_CURSO)
);

CREATE TABLE IF NOT EXISTS HORARIOS
(
    ID_HORARIO serial NOT NULL,
    DESCRIPCION character varying(500) NOT NULL unique,
    LUNES_HORA_INICIO time,
    LUNES_HORA_FIN time,
    MARTES_HORA_INICIO time,
    MARTES_HORA_FIN time,
    MIERCOLES_HORA_INICIO time,
    MIERCOLES_HORA_FIN time,
    JUEVES_HORA_INICIO time,
    JUEVES_HORA_FIN time,
    VIERNES_HORA_INICIO time,
    VIERNES_HORA_FIN time,
    SABADO_HORA_INICIO time,
    SABADO_HORA_FIN time,
    DOMINGO_HORA_INICIO time,
    DOMINGO_HORA_FIN time,
    ESTADO character varying(1),
    PRIMARY KEY (ID_HORARIO)
);


CREATE TABLE IF NOT EXISTS CAPACITACIONES
(
    ID_CAPACITACION serial NOT NULL,
	ID_CURSO integer,
    ID_HORARIO integer,
	ID_USUARIO_DOCENTE integer,
    NOMBRE character varying NOT NULL unique,
    DESCRIPCION character varying,
    CUPOS integer,
    DURACION_HORAS integer,
    FECHA_INICIO character varying,
    FECHA_FIN character varying,
    ESTADO character varying(1),
    PRIMARY KEY (ID_CAPACITACION)
);

CREATE TABLE IF NOT EXISTS MATRICULAS
(
    ID_MATRICULA serial NOT NULL,
    ID_USUARIO integer,
    ID_CAPACITACION integer,
    ESTADO character varying(1),
    PRIMARY KEY (ID_MATRICULA)
);

CREATE TABLE IF NOT EXISTS BECAS
(
    ID_BECA serial NOT NULL,
    ID_CURSO integer,
    NOMBRE character varying unique,
    DESCRIPCION character varying,
    PORCENTAJE integer,
    CUPOS integer,
    FECHA_INICIO character varying,
    FECHA_FIN character varying,
    REQUISITOS character varying,
    ESTADO character varying(1),
    PRIMARY KEY (ID_BECA)
);

CREATE TABLE IF NOT EXISTS BECAS_OTORGADAS
(
    ID_BECA_OTORGADA serial NOT NULL,
    ID_BECA integer,
    ID_USUARIO_ESTUDIANTE integer,
    ESTADO_BECA character varying,
    PATH_PDF_CEDULA character varying,
    PATH_PDF_PAPELETA_VOTACION character varying,
    PATH_PDF_SOLICITUD_BECA character varying,
    PATH_PDF_CROQUIS character varying,
    PATH_PDF_PLANILLA character varying,
    ESTADO character varying(1),
    PRIMARY KEY (ID_BECA_OTORGADA)
);

alter table CURSOS
 add constraint NOMBRE_CURSO_UNIQUE
 unique (NOMBRE);

 alter table ROLES
 add constraint DESCRIPCION_ROL_UNIQUE
 unique (DESCRIPCION





















-- INSERTS HORAIRO CABECERA
INSERT INTO public.horarios_cabecera( descripcion, estado) VALUES ('MATUTINO', 'S');
INSERT INTO public.horarios_cabecera( descripcion, estado) VALUES ('VESPERTINO', 'S');
INSERT INTO public.horarios_cabecera( descripcion, estado) VALUES ('NOCTURNO', 'S');

-- INSERTS HORARIO DETALLE
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'LUNES', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'MARTES', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'MIERCOLES', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'JUEVES', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'VIERNES', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'SABADO', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('1', 'DOMINGO', '6:00:00', '8:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('2', 'LUNES', '12:00:00', '14:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('2', 'MARTES', '12:00:00', '14:00:00', 'S');
INSERT INTO public.horarios_detalle(id_horario_cabecera, dia, hora_inicio, hora_fin, estado) VALUES ('3', 'LUNES', '20:00:00', '22:00:00', 'S');


-- INSERTS BECAS
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (1, 'BECA PARA ENFERMEROS', 'DECRIPCION CUALQUIERA' , 20, 100, '2022-08-28', '2022-08-29', 'Ser mayor de edad', 'S');	
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (16, 'BECA PARA PROGRAMADORES', 'DECRIPCION POO' , 10, 120, '2022-09-01', '2022-09-02', 'Ser mayor de edad', 'S');
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (21, 'BECA PARA PELUQUEROS', 'DECRIPCION CUALQUIERA CABELLO' , 5, 130, '2022-10-01', '2022-10-02', 'Ser mayor de edad', 'S');
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (1, 'BECA PARA ENFERMEROS PROFESIONALES', 'DECRIPCION CUALQUIERA PROFES' , 10, 140, '2022-10-11', '2022-10-12', 'Ser mayor de edad', 'S');
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (1, 'BECA PARA ENFERMEROS NOVATOS', 'DECRIPCION CUALQUIERA ENF NOV' , 80, 150, '2022-11-05', '2022-11-07', 'Ser mayor de edad', 'S');
INSERT INTO public.becas(id_curso, nombre, descripcion, porcentaje, cupos, fecha_inicio, fecha_fin, requisitos, estado) VALUES (16, 'BECA PARA INGENIEROS', 'DECRIPCION CUALQUIERA ING' , 50, 180, '2022-12-24', '2022-12-31', 'Ser mayor de edad', 'S');


--INSERTS MATRICULAS
INSERT INTO public.matriculas(id_usuario_estudiante, id_capacitacion, estado) VALUES (21, 6, 'S');
INSERT INTO public.matriculas(id_usuario_estudiante, id_capacitacion, estado) VALUES (23, 6, 'S');
INSERT INTO public.matriculas(id_usuario_estudiante, id_capacitacion, estado) VALUES (24, 7, 'S');
INSERT INTO public.matriculas(id_usuario_estudiante, id_capacitacion, estado) VALUES (27, 8, 'S');


--INSERT BECAS_OTORGADAS
INSERT INTO public.becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES (14, 21, 'APROBADA', 'S');
INSERT INTO public.becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES (15, 22, 'APROBADA', 'S');
INSERT INTO public.becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES (16, 23, 'APROBADA', 'S');
INSERT INTO public.becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES (17, 24, 'APROBADA', 'S');
INSERT INTO public.becas_otorgadas(id_beca, id_usuario_estudiante, estado_beca, estado) VALUES (18, 27, 'APROBADA', 'S');