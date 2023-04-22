/**
 * @author Alessandra Bayot
 * IDE Visual Studio Code 1.77.1
 */

//Comprobar que este soportado con el navegador que se maneja
if(window.File && window.FileReader && window.FileList ){
  alert("Todas las API soportadas"); //se muestra si es compatible
  function handleFileSelect(evt) {
    let file = evt.target.files[0];
    //para solo indicar videos
    if(!file.type.match('video.*')){
      return;
    }
    //creamos un obj para leer datos
    let reader = new FileReader();
    //si el archivo se lee coreectamente, se activa el evt de carga onload
    reader.onload = (function (theFile) {
      return function(e){
        /**
         * Generamos un div para poner el video en una sección 
         * Mediante un try-catch controlamos los errores
         */
        try{
          let divvideo = document.createElement('div');
          divvideo.id = "videodiv";
          divvideo.innerHTML = '<video controls id="video" class="thumb" src="' + e.target.result + '" title="'+ escape(theFile.name) + '"/>';
            
          //ponemos el video en la etiqueta output
          document.getElementById('outputvideo').insertBefore(divvideo, null);
          //creamos el mensaje de cargando cuando se sube el video
          alert("Se esta cargando el video");
  
          //instanciamos los elementos
          let playbtn = document.getElementById('play');
          let pausebtn = document.getElementById('pause');
          let subirbtn = document.getElementById('subir');
          let bajarbtn = document.getElementById('bajar');
          let video = document.getElementById('video');
          //agregamos la funcionalidad a los botones
          playbtn.addEventListener('click', () => {
            video.play();
          });
        
          pausebtn.addEventListener('click', () => {
            video.pause();
          });
  
          subirbtn.addEventListener('click', () => {
            video.volume += 0.1;
          });
  
          bajarbtn.addEventListener('click', () => {
            video.volume -= 0.1;
          });
  
          /**
          * Si el video se puede reproducir entonces haremos visible los elementos
          * @source https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
          */
          video.addEventListener('canplay', () => {
            try{
              //alert("se mostrara el video");
            //hacemos visible tanto el video como los botones
            video.style.visibility = "visible";
            playbtn.style.visibility = "visible";
            pausebtn.style.visibility = "visible";
            subirbtn.style.visibility = "visible";
            bajarbtn.style.visibility = "visible";
            }catch(err){
              alert("Error");
            }    
          });
        }catch(err){
          alert("ERROR"+"\n No se puede cargar el viddeo correctamente");
        }
      }
    })(file);
    reader.readAsDataURL(file);
  }
  document.getElementById('file').addEventListener('change', handleFileSelect, false); 
}else{
  alert("Error"+"\n La API de FILE no es soportada en este navegador");
}

