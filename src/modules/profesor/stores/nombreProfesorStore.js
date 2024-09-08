import { defineStore } from "pinia"
import { ref } from "vue"

export const useNombreStore = defineStore("nombre-profesor", ()=>{
  const nombre = ref("");
  
  const guardarNombre = (pNombre) =>{
    nombre.value = pNombre;
  }

  return {nombre, guardarNombre}
})