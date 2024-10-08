// Función para formatear la fecha a 'YYYY-MM-DD'
export const formatearFecha = (fecha) => {
  if (!fecha) return null;
  
  const fechaObj = new Date(fecha);
  const año = fechaObj.getFullYear();
  const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); 
  const día = String(fechaObj.getDate()).padStart(2, '0');

  return `${año}-${mes}-${día}`;
};

export function traducirDia(diaEnIngles) {
  const dias = {
    "MONDAY": "Lunes",
    "TUESDAY": "Martes",
    "WEDNESDAY": "Miércoles",
    "THURSDAY": "Jueves",
    "FRIDAY": "Viernes",
    "SATURDAY": "Sábado",
    "SUNDAY": "Domingo"
  };

  return dias[diaEnIngles] || diaEnIngles;
}