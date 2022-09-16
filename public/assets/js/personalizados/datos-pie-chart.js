let arrEstudiantesBecados = [];
let arrEstudiantesFinanciados = [];
let arrEstudiantesInscritos = [];
let arrCapacitacionDemandada = [];

//OBTENER DATOS DE ESTUDIANTES BECADOS
let urlBecados = `http://localhost:3000/estudiantes-becados`;

fetch(urlBecados)
    .then((response) => response.json())
    .then((datos) => mostrarBecados(datos))
    .catch((error) => console.log(error));

let ctxBecados = document.querySelector('#grafico-becados');
let myChartBecados = new Chart(ctxBecados, {
    type: 'pie',
    data: {
        datasets: [
            {
                label: 'Informe 1',
                backgroundColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderWidth: 1.5,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

const mostrarBecados = (datosBD) => {
    datosBD.forEach((element) => {
        myChartBecados.data['labels'].push(element.nombre);
        myChartBecados.data['datasets'][0].data.push(element.valor);

        arrEstudiantesBecados.push(element);
    });
    myChartBecados.update();
};

//OBTENER DATOS DE ESTUDIANTES CON PORCENTAJE DE FINANCIAMIENTO
let urlPorcentajeBeca = `http://localhost:3000/estudiantes-porcentajes-becas`;

fetch(urlPorcentajeBeca)
    .then((response) => response.json())
    .then((datos) => mostrarPorcentajesBecas(datos))
    .catch((error) => console.log(error));

let ctxPorcentajesBecas = document.querySelector('#grafico-financiamiento');
let myChartPorcentajes = new Chart(ctxPorcentajesBecas, {
    type: 'pie',
    data: {
        datasets: [
            {
                label: 'Informe 4',
                backgroundColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderWidth: 1.5,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

const mostrarPorcentajesBecas = (datosBD) => {
    datosBD.forEach((element) => {
        myChartPorcentajes.data['labels'].push(element.nombre);
        myChartPorcentajes.data['datasets'][0].data.push(element.cantidad);

        arrEstudiantesFinanciados.push(element);
    });
    // console.log(arrEstudiantesFinanciados);
    myChartPorcentajes.update();
};

//OBTENER DATOS DE ESTUDIANTES INSCRITOS POR CURSOS
let urlInscripciones = `http://localhost:3000/estudiantes-inscriptos`;

fetch(urlInscripciones)
    .then((response) => response.json())
    .then((datos) => mostrarInscripciones(datos))
    .catch((error) => console.log(error));

let ctxInscripciones = document.querySelector('#grafico-inscripciones');
let myChartInscripciones = new Chart(ctxInscripciones, {
    type: 'pie',
    data: {
        datasets: [
            {
                label: 'Informe 3',
                backgroundColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderWidth: 1.5,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

const mostrarInscripciones = (datosBD) => {
    datosBD.forEach((element) => {
        myChartInscripciones.data['labels'].push(element.nombre);
        myChartInscripciones.data['datasets'][0].data.push(element.cantidad);

        arrEstudiantesInscritos.push(element);
    });
    // console.log(arrEstudiantesInscritos);
    myChartInscripciones.update();
};

//OBTENER DATOS DE CAPACITACIONES DEMANDADAS
let urlCapacitaciones = `http://localhost:3000/capacitaciones-demandadas`;

fetch(urlCapacitaciones)
    .then((response) => response.json())
    .then((datos) => mostrarCapacitaciones(datos))
    .catch((error) => console.log(error));

let ctxCapacitaciones = document.querySelector('#grafico-capacitaciones');
let myChartCapacitaciones = new Chart(ctxCapacitaciones, {
    type: 'pie',
    data: {
        datasets: [
            {
                label: 'Informe 4',
                backgroundColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderColor: ['#F1948A', '#C39BD3', '#5DADE2', '#7DCEA0', '#F7DC6F', '#F39C12', '#909497', '#1A5276', '#9A7D0A', '#873600'],
                borderWidth: 1.5,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

const mostrarCapacitaciones = (datosBD) => {
    let arrayMayorDemanda = [];
    let cursoMayorDemanda;
    let sumCantidades = 0;
    datosBD.forEach((element) => {
        sumCantidades = sumCantidades + Number.parseInt(element.cantidad);
    });

    cursoMayorDemanda = {
        nombre: 'ESTUDIANTES DE OTRAS CAPACITACIONES',
        cantidad: sumCantidades - Number.parseInt(datosBD[0].cantidad),
    };

    arrayMayorDemanda.push(cursoMayorDemanda);
    arrayMayorDemanda.push(datosBD[0]);

    arrayMayorDemanda.forEach((element) => {
        myChartCapacitaciones.data['labels'].push(element.nombre);
        myChartCapacitaciones.data['datasets'][0].data.push(element.cantidad);

        arrCapacitacionDemandada.push(element);
    });
    // console.log(arrCapacitacionDemandada);
    myChartCapacitaciones.update();
};

const descargarPdfEstudiantesBecados = () => {
    //Se crea un nuevo objeto canvas
    let pdfCanvas = $('<canvas />').attr({
        id: 'canvaspdf',
        width: 1000,
        height: 500,
    });

    // keep track canvas position
    let pdfctx = $(pdfCanvas)[0].getContext('2d');
    let pdfctxX = 100;
    let pdfctxY = 150;
    let buffer = 100;

    // get the chart height/width
    let canvasHeight = 156;
    let canvasWidth = 600;

    // draw the chart into the new canvas
    pdfctx.drawImage($('#grafico-becados')[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // create new pdf and add our new canvas as an image
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

    //insertar Texto
    pdf.setFontSize(18);
    pdf.text(45, 25, 'REPORTE DE ESTUDIANTES BECADOS');

    pdf.setFontSize(10);

    let linea = 0;

    arrEstudiantesBecados.forEach((element) => {
        // console.log(`${element.nombre}: ${element.valor}`);
        pdf.text(20, 100 + linea, `- ESTUDIANTES ${element.nombre}: ${element.valor}`);
        linea = linea + 10;
    });

    // download the pdf
    pdf.save('Estudiantes-Becados.pdf');
};

const descargarPdfEstudiantesFinanciados = () => {
    //Se crea un nuevo objeto canvas
    let pdfCanvas = $('<canvas />').attr({
        id: 'canvaspdf',
        width: 1000,
        height: 500,
    });

    // keep track canvas position
    let pdfctx = $(pdfCanvas)[0].getContext('2d');
    let pdfctxX = 100;
    let pdfctxY = 150;
    let buffer = 100;

    // get the chart height/width
    let canvasHeight = 156;
    let canvasWidth = 600;

    // draw the chart into the new canvas
    pdfctx.drawImage($('#grafico-financiamiento')[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // create new pdf and add our new canvas as an image
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

    //insertar Texto
    pdf.setFontSize(18);
    pdf.text(30, 25, 'REPORTE DE ESTUDIANTES CON FINANCIAMIENTO');

    pdf.setFontSize(10);

    let linea = 0;

    arrEstudiantesFinanciados.forEach((element) => {
        pdf.text(20, 100 + linea, `- ESTUDIANTES CON ${element.nombre} DE FINANCIAMIENTO: ${element.cantidad}`);
        linea = linea + 10;
    });

    // download the pdf
    pdf.save('Estudiantes-Financiados.pdf');
};

const descargarPdfEstudiantesInscritos = () => {
    //Se crea un nuevo objeto canvas
    let pdfCanvas = $('<canvas />').attr({
        id: 'canvaspdf',
        width: 1000,
        height: 500,
    });

    // keep track canvas position
    let pdfctx = $(pdfCanvas)[0].getContext('2d');
    let pdfctxX = 100;
    let pdfctxY = 150;
    let buffer = 100;

    // get the chart height/width
    let canvasHeight = 156;
    let canvasWidth = 600;

    // draw the chart into the new canvas
    pdfctx.drawImage($('#grafico-inscripciones')[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // create new pdf and add our new canvas as an image
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

    //insertar Texto
    pdf.setFontSize(17);
    pdf.text(20, 25, 'REPORTE DE ESTUDIANTES INSCRITOS EN LOS CURSOS');

    pdf.setFontSize(10);

    let linea = 0;

    arrEstudiantesInscritos.forEach((element) => {
        pdf.text(20, 100 + linea, `- ESTUDIANTES DEL CURSO DE "${element.nombre}": ${element.cantidad}`);
        linea = linea + 10;
    });

    // download the pdf
    pdf.save('Estudiantes-Inscritos.pdf');
};

const descargarPdfCapacitacionesDemandadas = () => {
    //Se crea un nuevo objeto canvas
    let pdfCanvas = $('<canvas />').attr({
        id: 'canvaspdf',
        width: 1000,
        height: 500,
    });

    // keep track canvas position
    let pdfctx = $(pdfCanvas)[0].getContext('2d');
    let pdfctxX = 100;
    let pdfctxY = 150;
    let buffer = 100;

    // get the chart height/width
    let canvasHeight = 156;
    let canvasWidth = 600;

    // draw the chart into the new canvas
    pdfctx.drawImage($('#grafico-capacitaciones')[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // create new pdf and add our new canvas as an image
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

    //insertar Texto
    pdf.setFontSize(18);
    pdf.text(40, 25, 'REPORTE DE CAPACITACIONES DEMANDAS');

    pdf.setFontSize(10);

    let linea = 0;

    arrCapacitacionDemandada.forEach((element) => {
        pdf.text(20, 100 + linea, `- ${element.nombre}: ${element.cantidad}`);
        linea = linea + 10;
    });

    // download the pdf
    pdf.save('Capacitaciones-Demandadas.pdf');
};
