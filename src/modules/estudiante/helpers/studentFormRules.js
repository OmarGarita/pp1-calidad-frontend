
export const studentFormRules ={
  nombre: [
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar un nombre'
    },
  ],

  id: [
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar un carné'
    },
  ],

}