const TOTAL_PREGUNTAS = 1000;
const MAX_GAME_DURATION = 60; // 1 minutos
let preguntasData = [];
fetch("preguntas.json")
  .then((response) => response.json())
  .then((data) => {
    preguntasData = data;
  });

const inputContainer = document.getElementById("input-container");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const welcomeTitle = document.getElementById("welcome-title");
const nameInput = document.getElementById("name");
const edadInput = document.getElementById("edad");
const redSocialInput = document.getElementById("redSocial");
const addUserButton = document.getElementById("add-user-button");
const videoBienal = document.getElementById("video-bienal");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerWrapper = document.getElementById("answer-wrapper");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameContainer = document.getElementById('game-container');
const mainTitle = document.getElementById('main-title');

let users = [];
let name = "";
let edad = 0;
let redSocial = "";
let loading = false;
let preguntas = [];
let number = 0;
let respuestaUsuario = [];
let puntaje = 0;
let gameOver = true;
let showForm = true;
let timeLeft = 0;

addUserButton.addEventListener("click", handleAddUser);
startButton.addEventListener("click", comenzarTrivia);

function handleAddUser() {
  name = nameInput.value;
  edad = parseInt(edadInput.value);
  redSocial = redSocialInput.value;

  if (name && edad && redSocial) {
    const newUser = { name, edad, redSocial };
    users.push(newUser);
    showForm = false;
    welcomeTitle.innerHTML = `Hola ${name}!, Buena suerte!`;
    inputContainer.style.display = "none";
    startButton.style.display = "block";

    // Ocultar el video y detener la reproducción
    videoBienal.pause();
    videoBienal.currentTime = 0;
    videoBienal.src = "";
    videoBienal.style.display = "none";

    // Cambiar justify-content a space-evenly
    gameContainer.classList.add("evenly");
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

function comenzarTrivia() {
  loading = true;
  gameOver = false;
  timeLeft = MAX_GAME_DURATION;

  preguntas = preguntasData.map((pregunta) => ({
    ...pregunta,
    respuestas: shuffleArray([
      ...pregunta.incorrect_answers,
      pregunta.correct_answer,
    ]),
  }));

  puntaje = 0;
  respuestaUsuario = [];
  number = 0;
  loading = false;

  questionContainer.style.display = "block";
  startButton.style.display = "none";
  mostrarPregunta();
  iniciarTemporizador();
}

function mostrarPregunta() {
  const preguntaActual = preguntas[number];
  questionNumber.innerHTML = `Pregunta: ${number + 1}`;
  questionText.innerHTML = preguntaActual.question;

  answerWrapper.innerHTML = "";
  preguntaActual.respuestas.forEach((respuesta) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.innerHTML = respuesta;
    button.addEventListener("click", () => checkRespuesta(respuesta));
    answerWrapper.appendChild(button);
  });

  scoreDisplay.innerHTML = `Puntaje: ${puntaje}`;
  timerDisplay.innerHTML = `Tiempo restante: ${timeLeft} segundos`;
}

function checkRespuesta(respuesta) {
  if (!gameOver) {
    const correcta = preguntas[number].correct_answer === respuesta;
    if (correcta) puntaje++;
    const respuestaObjeto = {
      pregunta: preguntas[number].question,
      respuesta,
      correcta,
      respuestaCorrecta: preguntas[number].correct_answer,
    };
    respuestaUsuario.push(respuestaObjeto);
    setTimeout(() => {
      siguientePregunta();
    }, 3000);
  }
}

function siguientePregunta() {
  number++;
  if (number === preguntas.length || gameOver) {
    finalizarJuego();
  } else {
    mostrarPregunta();
  }
}

function iniciarTemporizador() {
  const timer = setInterval(() => {
    if (timeLeft > 0 && !gameOver) {
      timeLeft--;
      timerDisplay.innerHTML = `Tiempo restante: ${timeLeft} segundos`;
    } else {
      clearInterval(timer);
      gameOver = true;
      finalizarJuego();
    }
  }, 1000);
}

function finalizarJuego() {
  alert(`¡Tu puntaje fue: ${puntaje}. ¿Deseas jugar de nuevo?`);
  gameOver = true;
  questionContainer.style.display = "none";
  startButton.style.display = "block";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

addUserButton.addEventListener("click", () => {
  // Detener la reproducción del video
  videoBienal.pause();
  videoBienal.currentTime = 0; // Reiniciar el video al principio

  // Ocultar el video
  videoBienal.src = ""; // Eliminar la fuente del video
  videoBienal.style.display = "none"; // Ocultar el video
});


// ...

function handleAddUser() {
  name = nameInput.value;
  edad = parseInt(edadInput.value);
  redSocial = redSocialInput.value;

  if (name && edad && redSocial) {
    const newUser = { name, edad, redSocial };
    users.push(newUser);
    showForm = false;
    welcomeTitle.innerHTML = `Hola ${name}! Buena suerte!`;
    inputContainer.style.display = 'none';
    startButton.style.display = 'block';

    // Ocultar el video y detener la reproducción
    videoBienal.pause();
    videoBienal.currentTime = 0;
    videoBienal.src = '';
    videoBienal.style.display = 'none';

    // Cambiar justify-content a space-evenly
    gameContainer.classList.add('evenly');

    // Mostrar el mensaje de bienvenida y ocultar el título principal
    welcomeTitle.style.display = 'block';
    mainTitle.style.display = 'none';
  } else {
    alert('Por favor, completa todos los campos.');
  }
}

function comenzarTrivia() {
  loading = true;
  gameOver = false;
  timeLeft = MAX_GAME_DURATION;

  preguntas = preguntasData.map((pregunta) => ({
    ...pregunta,
    respuestas: shuffleArray([...pregunta.incorrect_answers, pregunta.correct_answer])
  }));

  puntaje = 0;
  respuestaUsuario = [];
  number = 0;
  loading = false;

  questionContainer.style.display = 'block';
  startButton.style.display = 'none';
  mostrarPregunta();
  iniciarTemporizador();

  // Ocultar el mensaje de bienvenida y mostrar el título principal
  welcomeTitle.style.display = 'none';
  mainTitle.style.display = 'block';
}

function comenzarTrivia() {
    loading = true;
    gameOver = false;
    timeLeft = MAX_GAME_DURATION;
  
    preguntas = preguntasData.map((pregunta) => ({
      ...pregunta,
      respuestas: shuffleArray([...pregunta.incorrect_answers, pregunta.correct_answer])
    }));
  
    puntaje = 0;
    respuestaUsuario = [];
    number = 0;
    loading = false;
  
    questionContainer.style.display = 'block';
    startButton.style.display = 'none';
    mostrarPregunta();
    iniciarTemporizador();
  
    // Ocultar el mensaje de bienvenida y mostrar el título principal
    welcomeTitle.style.display = 'none';
    mainTitle.style.display = 'block';
  
    // Cambiar justify-content a flex-start y aplicar el gap de 30px
    gameContainer.classList.remove('evenly');
    gameContainer.classList.add('start');
  
    // Aplicar display flex en column a question-container y añadir gap de 20px
    questionContainer.classList.add('flex-column');
}

function checkRespuesta(respuesta) {
    if (!gameOver) {
      const correcta = preguntas[number].correct_answer === respuesta;
  
      const botones = answerWrapper.querySelectorAll('.answer-button');
      botones.forEach(button => {
        if (button.innerHTML === preguntas[number].correct_answer) {
          button.classList.add('correct');
        } else {
          button.classList.add('incorrect');
        }
        button.disabled = true;
      });
  
      if (correcta) puntaje++;
      const respuestaObjeto = {
        pregunta: preguntas[number].question,
        respuesta,
        correcta,
        respuestaCorrecta: preguntas[number].correct_answer,
      };
      respuestaUsuario.push(respuestaObjeto);
  
      setTimeout(() => {
        siguientePregunta();
      }, 3000);
    }
  }

  function finalizarJuego() {
    alert(`¡Tu puntaje fue: ${puntaje}. ¿Deseas jugar de nuevo?`);
    gameOver = true;
    resetearEstilo(); // Restablecer el estilo al finalizar el juego
    questionContainer.style.display = 'none';
    startButton.style.display = 'block';
  }
  
function resetearEstilo() {
  // Restablecer el estilo del contenedor de preguntas
  questionContainer.style.flexDirection = 'column';
  questionContainer.style.gap = 'initial';
  questionContainer.style.justifyContent = 'space-evenly'; // Cambiar a space-evenly

  // Restablecer el estilo del contenedor de respuestas
  answerWrapper.style.display = 'block';
  answerWrapper.style.gap = 'initial';

  // Restablecer el estilo del mensaje de bienvenida
  welcomeTitle.style.display = 'block';
}

  