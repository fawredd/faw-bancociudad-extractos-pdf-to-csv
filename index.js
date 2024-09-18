const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

async function procesarArchivos() {
  try {
    const archivos = await leePDFs();
    let resultados = [];
    for (const archivo of archivos) {
      const dataBuffer = await fs.promises.readFile(archivo);
      const data = await pdf(dataBuffer);
      // PDF text
      const texto = data.text;
      fs.promises.writeFile(
        archivo.slice(0, archivo.length - 4) + ".txt",
        texto,
        (e) => console.log(e)
      );
      resultados.push(
        texto
          .split("\n")
          .map((item) => {
            let fecha = item.match(/\d{2}[-][A-Z]{3}[-]\d{4}/g);
            let movimientos = item.match(/\d*\.?\d*[,]\d{2}/g);
            if (fecha != null) {
              if (item.indexOf(movimientos[0]) < 53) {
                movimientos[0] = "-" + movimientos[0];
              }
              return [
                ...fecha,
                ...movimientos.map((item) =>
                  item.replace(".", "").replace(",", ".")
                ),
              ];
            }
          })
          .filter(Boolean)
      );
    }
    return resultados;
  } catch (error) {
    console.error("Error al leer los archivos PDF:", error);
    return error;
  }
}

async function leePDFs() {
  const directorio = "./pdfs";

  const archivos = await fs.promises.readdir(directorio);
  const archivosPDF = archivos
    .filter((archivo) => {
      const extension = path.extname(archivo);
      return extension.toLowerCase() === ".pdf";
    })
    .map((archivo) => path.join(directorio, archivo));

  console.log(archivosPDF);
  return archivosPDF;
}

procesarArchivos()
  .then((todosLosMovimientos) => {
    let linea = `fecha;movimiento;saldo\n`;
    todosLosMovimientos.forEach((mes) => {
      mes.forEach((fila) => {
        fila[2] += `\n`;
        linea += fila.join(";");
      });
    });
    fs.promises.writeFile("./movimientos.csv", linea, (e) => console.log(e));
    console.log("Finalizado.");
  })
  .catch((error) => {
    console.error(error);
  });
