function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Obtener todos los elementos HTML en el documento: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /* Buscar elementos con un atributo específico llamado "include-html": */
      file = elmnt.getAttribute("include-html");
      if (file) {
        /* Realizar una solicitud HTTP utilizando el valor del atributo como nombre de archivo: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) { // Si la solicitud fue exitosa (estado 200), establecer el contenido del elemento HTML con la respuesta del servidor.
              elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) { // Si la página no se encontró (estado 404), mostrar un mensaje de error.
              elmnt.innerHTML = "Página no encontrada.";
            }
            /* Eliminar el atributo "include-html" y llamar a esta función nuevamente: */
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send(); // Enviar la solicitud HTTP al servidor.
        /* Salir de la función para procesar un solo elemento a la vez: */
        return;
      }
    }
  };
  includeHTML(); // Llamar a la función para iniciar la inclusión de HTML.
