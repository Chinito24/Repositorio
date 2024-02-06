const readline = require("readline");
const fetch = require('node-fetch');

const url = "http://jsonplaceholder.typicode.com/todos";

var resueltos;
var sinResolver;

fetch(url)
  .then(respuesta => respuesta.json())
  .then(respuesta => {
    resueltos = respuesta.filter(todo => todo.completed);
    sinResolver = respuesta.filter(todo => !todo.completed);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("1) Lista de todos los pendientes (ID)");
    console.log("2) Lista de todos los pendientes (IDs, Titule)");
    console.log("3) Lista de todos los pendientes sin resolver (ID, Title)");
    console.log("4) Lista de todos los pendientes resueltos (ID, Title)");
    console.log("5) Lista de todos los pendientes (IDs, userID)");
    console.log("6) Lista de todos los pendientes resueltos (ID y userID)");
    console.log("7) Lista de todos los pendientes sin resolver (ID y userID)");
    console.log("8) salir");

    rl.question("Ingresa un numero:", function (eleccion) {
      switch (eleccion) {
        case "1":
          respuesta.forEach(element => {
            console.log(element.id);
          });
          break;

        case "2":
          respuesta.forEach(element => {
            console.log(element.id, element.title);
          });
          break;

        case "3":
          sinResolver.forEach(element => {
            console.log(element.id, element.title);
          });
          break;

        case "4":
          resueltos.forEach(element => {
            console.log(element.id, element.title);
          });
          break;

        case "5":
          respuesta.forEach(element => {
            console.log(element.id, element.userId);
          });
          break;

        case "6":
          resueltos.forEach(element => {
            console.log(element.id, element.userId);
          });
          break;

        case "7":
          sinResolver.forEach(element => {
            console.log(element.id, element.userId);
          });
          break;

        case "8":
          rl.close();
          break;

        default:
          console.log("Opción no válida");
          break;
      }
    });
  })
