const puppeteer = require('puppeteer'); //

//El numero a buscar es 243122
const codigoBuscar = 243122;

(async () => {
    // Launch the browser and open a new blank page
  const browser = await puppeteer.launch(
    {
      headless: false
    }
  );
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('http://comext.aduana.cl:7001/ManifestacionMaritima/');

  // Encuentra el input y escribe el código en él
  const inputSelector = 'input'; // Se escribe el selector del input
  await page.waitForSelector(inputSelector); // Espera a que el input esté disponible
  await page.type(inputSelector, codigoBuscar.toString()); // Convierte codigoBuscar a cadena y lo escribe en el input

  // Encuentra el botón y hace clic en él
  const buttonSelector = 'input[type="submit"]'; // Se hace click en el boton
  await page.waitForSelector(buttonSelector); // Espera a que el botón esté disponible
  await page.click(buttonSelector); // Hace click en el botón

  // Espera a que aparezca la tabla de resultados
  // Espera a que aparezca la tabla de resultados
await page.waitForSelector('tr.tablacabecera');

// Extrae los nombres de las columnas
const nombresColumnas = await page.$$eval('body > table:nth-child(9) > tbody > tr:nth-child(1) > th > a > label', elementos => elementos.map(elemento => elemento.textContent.trim()));

// Extrae los valores debajo de cada nombre de columna
const valoresColumnas = await page.$$eval('body > table:nth-child(9) > tbody > tr:nth-child(3) > td > label', elementos => elementos.map(elemento => elemento.textContent.trim()));

// Almacena los nombres y valores en un objeto
let datosTabla = {};
nombresColumnas.forEach((nombreColumna, index) => {
  datosTabla[nombreColumna] = valoresColumnas[index];
});

// Visualiza el objeto en formato JSON en la consola
console.log(JSON.stringify(datosTabla, null, 2));


})();