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
  const [file, keyword] = args;
  return args;
}

/**
 * Funcion para hacer el conteo de la palabra que debemos buscar
 * @param file Es el fichero que queremos leer 
 * @param keyword es la palabra que queremos buscar
 */
function Conteo(file : string, keyword : string) {
  let filepath = path.resolve('src/modificacion', file);
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err.message}`);
      return;
    }
    const regex = new RegExp(`${keyword}`, 'g');
    const matches = data.match(regex);
    const count = matches ? matches.length : 0;
    if(count === 0){
      console.log(`La palabra clave "${keyword}" no aparece en el fichero`);
    } else {
      console.log(`La palabra clave "${keyword}" aparece ${count} veces en el fichero.`);
    }
  });
}

const [file, keyword] = ParseArguments();
Conteo(file, keyword);
