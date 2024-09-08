

export const courseFormRules = {
  nombre: [
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar un nombre'
    },
  ],
  codigo:[
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar un codigo'
    },
  ],
  
}