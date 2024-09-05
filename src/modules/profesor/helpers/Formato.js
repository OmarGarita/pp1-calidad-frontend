

export const compararHoras = (hora1,hora2) =>{
  
  const [h1, m1] = hora1.split(':').map(Number);
  const [h2, m2] = hora2.split(':').map(Number);

  if (h1 > h2) {
    return true;
  } else if (h1 < h2) {
    return false;
  } else {
    return m1 > m2;
  }
}

