

export const professorFormRules ={
  nombre: [
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar un nombre'
    },
  ],

  cantCitas: [
    (value) => {
      if (value && value!==0){
        return true
      } 

      return 'Debe ingresar la cantidad de citas'
    },
  ],

}