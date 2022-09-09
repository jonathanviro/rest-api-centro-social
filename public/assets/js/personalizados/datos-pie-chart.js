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
    });
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
    });
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
    });

    myChartCapacitaciones.update();
};
