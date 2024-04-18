var url = "https://jsonplaceholder.typicode.com/todos";

fetch(url)
  .then(response => response.json())
  .then(response => {
    console.log("\nLista de todos los pendientes (IDs) ");
    response.forEach(element => {
      console.log(element.id);
    });

    console.log("\nLita de todos los pendientes (IDs y Titles)");
    response.forEach(element => {
      console.log(element.id + " - " + element.title);
    });

    console.log("\nLista de todos los pendientes sin resolver (IDs y Titles)");
    response.forEach(element => {
      if (element.completed === false) {
        console.log(element.id + " - " + element.title + " - " + element.completed);
      }
    });

    console.log("\nLista de todos los pendientes resueltos (IDs y Titles)");
    response.forEach(element => {
      if (element.completed === true) {
        console.log(element.id + " - " + element.title + " - " + element.completed);
      }
    });

    console.log("\nLita de todos los pendientes (IDs y userID)");
    response.forEach(element => {
      console.log(element.id + " - " + element.userId);
    });

    console.log("\nLista de todos los pendientes resueltos (IDs y userId)");
    response.forEach(element => {
      if (element.completed === true) {
        console.log(element.id + " - " + element.userId + " - " + element.completed);
      }
    });

    console.log("\nLista de todos los pendientes sin resolver (IDs y userId)");
    response.forEach(element => {
      if (element.completed === false) {
        console.log(element.id + " - " + element.userId + " - " + element.completed);
      }
    });

  })
  .catch(error => {
    console.error('Error:', error);
  });
