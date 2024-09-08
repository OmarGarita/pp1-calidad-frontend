// Función para formatear la fecha a 'dd/mm/yyyy'
export const formatearFecha = (fecha) => {
  if (!fecha) return null;
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};