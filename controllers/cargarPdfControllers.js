const multer = require('multer');
const path = require('path');
const db = require('../database/postgresql.pool');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp/uploads');
    },
    filename: function (req, file, cb) {
        // console.log(req.body);
        let { idBecaOtorgada, tipoDocumento } = req.body;
        cb(null, `${tipoDocumento}-${idBecaOtorgada}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // console.log(req.body);
        let { idBecaOtorgada, tipoDocumento } = req.body;

        // Set the filetypes, it is optional
        var filetypes = /pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        req.hayErrorCargaPdf = { errorCarga: true };
        if (mimetype && extname) {
            req.hayErrorCargaPdf = { errorCarga: false, tipoDocumento: tipoDocumento, idBecaOtorgada: idBecaOtorgada, nombreArchivo: file.originalname };
            return cb(null, true);
        }
        // cb('Error: La carga de archivos solo admite los siguientes tipos de archivo: ' + filetypes);
        return cb(null, false);
        // req.hayErrorCargaPdf = { error: true };
    },
});

exports.upload = upload.single('myFile');

exports.uploadFile = (req, res) => {
    console.log(req.hayErrorCargaPdf);
    let { errorCarga, tipoDocumento, idBecaOtorgada, nombreArchivo } = req.hayErrorCargaPdf;
    if (errorCarga == false) {
        let sql = ``;
        switch (tipoDocumento) {
            case 'CEDULA':
                sql = `UPDATE becas_otorgadas set path_pdf_cedula=$1 WHERE id_beca_otorgada=$2`;
                break;
            case 'VOTACION':
                sql = `UPDATE becas_otorgadas set path_pdf_papeleta_votacion=$1 WHERE id_beca_otorgada=$2`;
                break;
            case 'SOLICITUD':
                sql = `UPDATE becas_otorgadas set path_pdf_solicitud_beca=$1 WHERE id_beca_otorgada=$2`;
                break;
            case 'CROQUIS':
                sql = `UPDATE becas_otorgadas set path_pdf_croquis=$1 WHERE id_beca_otorgada=$2`;
                break;
            case 'PLANILLA':
                sql = `UPDATE becas_otorgadas set path_pdf_planilla=$1 WHERE id_beca_otorgada=$2`;
                break;
        }

        let pathArchivo = `${tipoDocumento}-${idBecaOtorgada}-${nombreArchivo}`;

        const valores = [pathArchivo, idBecaOtorgada];
        console.log(`PDF GUARDADO++++>>>${idBecaOtorgada}, ${pathArchivo}`);

        db.query(sql, valores)
            .then((results) => {
                res.render('otorgar-becas', {
                    esAlerta: true,
                    esAlertaSinRecarga: false,
                    alertaTitulo: 'Carga exitosa',
                    alertaMensaje: 'El documento ha sido cargado',
                    alertaIcono: 'success',
                    mostrarBotonConfirmacion: false,
                    timer: 2000,
                    rutaRedireccion: 'otorgar-becas',
                    usuarioLogin: req.usuarioLogin,
                    datosOtorgarBecas: req.datosOtorgarBecas,
                    datosBecas: req.datosBecas,
                    datosEstudiantes: req.datosEstudiantes,
                });
            })
            .catch((error) => {
                res.render('otorgar-becas', {
                    esAlerta: true,
                    esAlertaSinRecarga: false,
                    alertaTitulo: 'Error inesperado',
                    alertaMensaje: `Mensaje: ${error.message}`,
                    alertaIcono: 'error',
                    mostrarBotonConfirmacion: true,
                    timer: 2000,
                    rutaRedireccion: 'otorgar-becas',
                    usuarioLogin: req.usuarioLogin,
                    datosOtorgarBecas: req.datosOtorgarBecas,
                    datosBecas: req.datosBecas,
                    datosEstudiantes: req.datosEstudiantes,
                });
            });
    } else if (errorCarga == true) {
        res.render('otorgar-becas', {
            esAlerta: true,
            esAlertaSinRecarga: false,
            alertaTitulo: 'Carga Fallida',
            alertaMensaje: 'No se ha podido cargar el archivo. Solo se permiten Archivos con extension PDF',
            alertaIcono: 'error',
            mostrarBotonConfirmacion: false,
            timer: 2000,
            rutaRedireccion: 'otorgar-becas',
            usuarioLogin: req.usuarioLogin,
            datosOtorgarBecas: req.datosOtorgarBecas,
            datosBecas: req.datosBecas,
            datosEstudiantes: req.datosEstudiantes,
        });
    }
};
