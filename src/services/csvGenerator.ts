export function generateCSV(data: any[]): any[] {
  // comparar las filas donde el valor de la columna "N_orden" se repite, y si se repite, mantener solo la primera ocurrencia y eliminar las demás
  const uniqueData = data.filter(
    (item, index, self) => index === self.findIndex((t) => t.N_orden === item.N_orden),
  );
  if (uniqueData.length > 0) {
    return uniqueData;
  }
  return [];
}
