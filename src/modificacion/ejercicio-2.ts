import * as fs from 'fs';
import path from 'path';

/**
 * Funcion para parsear los argumentos del programa
 * @returns Retorna los argumentos
 */
function ParseArguments() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Uso: node ejercicio-1.js <ruta_del_archivo> <palabra_clave>');
    process.exit(1);
  }
  const [file, output] = args;
  return args;
}

/**
 * Funcion para pasar de formato JSON a formato CSV
 * @param entrada - fichero de entrada
 * @param salida - fichero de salida
 */
function JSONaCSV(entrada : string, salida : string) {
  let filepath = path.resolve('src/modificacion', entrada);
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err.message}`);
      return;
    }
    let dataJSON = JSON.parse(data);
    if (dataJSON.length === 0) {
      console.log("Error. El JSON está vacio.\n");
      return;
    }
    let headers = "";
    for (let key in dataJSON[0]) {
      headers += key + ",";
    }
    headers += "\n";
    //console.log(headers);
    let datos_salida="";
    for (let i = 0; i < dataJSON.length; i++){
      datos_salida += dataJSON[i].fecha + ", ";
      datos_salida += dataJSON[i].ubicacion + ", ";
      datos_salida += dataJSON[i].temperatura + ", ";
      datos_salida += dataJSON[i].humedad + ", ";
      datos_salida += dataJSON[i].precipitacion + ", ";
      datos_salida += dataJSON[i].viento_kmh + ", ";
      datos_salida +="\n";
    }
    let csv = headers + datos_salida;
    let outputpath = path.resolve('src/modificacion', salida);
    fs.writeFile(outputpath, csv, 'utf8', (err) => {
      if (err) {
        console.error(`Error al escribir el archivo: ${err.message}`);
      } else {
        console.log(`Archivo CSV generado en: ${salida}`);
      }
    });
  });
}

const [file, output] = ParseArguments();
JSONaCSV(file, output);