
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

  sede: [
    (value) => {
      if (value){
        return true
      } 

      return 'Debe ingresar una sede'
    },
  ],
  repetidos: [
    (value) => {
      if (value >=0){
        return true
      } 

      return 'Debe ingresar un valor válido'
    },
  ],
  
}