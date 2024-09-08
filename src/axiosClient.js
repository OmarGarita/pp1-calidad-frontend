import axios from "axios";

// Configuración de Axios
// Exportar Axios configurado
export default axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
