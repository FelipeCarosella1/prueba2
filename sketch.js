let video; // variable que contendra el video
let porcentaje = " "; // pariable para almacenar valro de confidence
let nombre = " "; // variable para almacenar el valor de Label
let clasificador; // variable donde se guarda la clasificacion usando el modelo pre entrenado

// PRIMER PASO se carga el modelo pre entrenado 
function preload() {
  console.clear(); // limpio el area de trabajo herramientas para desarrolladores
  // cargamos el link donde se encuentra nuestro modelo pre entrehado por Teachable Machine 
  // model.json contiene la arquitectura del modelo utilizada por la biblioteca TensorFlow.js  
  clasificador = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y8n73XnCI/'+ 'model.json');
  }

function setup() {
  createCanvas(320, 260); // se crea el lienzo de trabajo de 320x260
  // se crea el video capturado y se lo guarda en la avriable video
  video = createCapture(VIDEO);
  video.hide(); // se oculta el video 
  // SEGUNDO PASO  comienza la clasificacion
  classifyVideo();  // funcion de clsificacion 
}

function classifyVideo() {
// se comienza con la clasificacion del video  y se obtinen una salida de datos con los resultados obtenidos
  clasificador.classify(video, gotResults); // se guardan los resultados de la clasificacion en gotResults
}


// TERCER PASO  se obtienen los resultados de la clsificaion en dos variables
function gotResults(error, results) {
    if (error) {
    console.error(error); // muestra el error encontrado 
    return; // retorna 
  }
  console.log(results); // muestra los resultados en formato ARRAY 
  console.table(results); // muestra resultados en formato de tabla 
  

  // se almacenan los resultados obtenidos en las variables 
   nombre = results[0].label; // nombre de la clasificacion
   porcentaje = results[0].confidence; // % de asierto en la clasificacion
  classifyVideo();  // se vuelve a clasificar 
}

function draw() {
  background(0); // se pinta el lienzo del color pre fijado
  image(video, 0, 0);  // se meustra el video obtenido

  // PASO CUATRO  se ven los resultados 
  textSize(32); // se fija un tamaño de texto en pixeles
  textAlign(CENTER, CENTER); // se centra un texto 
  fill(255); // se define color blanco para el texto 
  // recibe una cadena de caracteres en la posicion x y que se le asigne 
  text(porcentaje, width / 2, height - 16); // muestra el % de asierto
  text(nombre, width / 2, height - 50); // muestra el nombre obtenido
}


