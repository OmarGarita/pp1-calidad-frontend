import { defineStore } from "pinia"
import { ref } from "vue"

export const useCitaStore = defineStore("carne", ()=>{
  const carne = ref("");
  
  const guardarCarne = (pCarne) =>{
    carne.value = pCarne;
  }

  return {carne, guardarCarne}
})