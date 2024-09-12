import { traducirDia } from "@/modules/curso/helpers/formato";
export function formatData(jsonArray) {
  return jsonArray.map(item => {
    // Extraer el nombre del curso
    const curso = item.course?.name || '';

    // Extraer el nombre del profesor
    const profesor = item.professor?.name || '';

    // Extraer el día de la semana y la hora del primer horario (schedule)
    const dia = item.professor?.schedules?.[0]?.dayOfWeek || '';
    
    // Formatear la hora de inicio
    const hora = item?.start || '';


    


    return {
      curso,
      profesor,
      dia: traducirDia(dia),  // Traducción del día
      hora,
    };
  });
}