import Swal from 'sweetalert2'

class Alerta {

  showExitoSimple(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Exito",
      showConfirmButton: false,
      timer: 1500
    })
  }

  showExitoSimple(texto){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Exito",
      text: texto,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showExito(texto){
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: texto
    })
  }

  showError(mensaje){
    Swal.fire({
      title: "Error",
      text: mensaje,
      icon: "error"
    });
  }

  showWarning(titulo, mensaje){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: "warning"
    });
  }
}

export default new Alerta()