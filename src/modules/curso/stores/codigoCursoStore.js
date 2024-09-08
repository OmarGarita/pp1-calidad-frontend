import { defineStore } from "pinia"
import { ref } from "vue"

export const useCodigoStore = defineStore("codigo", ()=>{
  const codigo = ref("");
  
  const guardarCodigo = (pCodigo) =>{
    codigo.value = pCodigo;
  }

  return {codigo, guardarCodigo}
})