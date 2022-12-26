// Realizo la lógica primero
let semanaAhorro = [];
let ahorro = 0;
let dia = 0;
for (i = 1; i <= 7; i++) {
  switch (i) {
    case 1:
      dia = Number(prompt("Ingrese lo que ahorro el día lunes por favor", "0"));
      semanaAhorro.push(dia);

      break;
    case 2:
      dia = Number(
        prompt("Ingrese lo que ahorro el día martes por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
    case 3:
      dia = Number(
        prompt("Ingrese lo que ahorro el día miercoles por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
    case 4:
      dia = Number(
        prompt("Ingrese lo que ahorro el día jueves por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
    case 5:
      dia = Number(
        prompt("Ingrese lo que ahorro el día viernes por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
    case 6:
      dia = Number(
        prompt("Ingrese lo que ahorro el día sabado por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
    case 7:
      dia = Number(
        prompt("Ingrese lo que ahorro el día domingo por favor", "0")
      );
      semanaAhorro.push(dia);

      break;
  }
}
// Si no queremos realizar esto por porpmts descomentar la siguiente linea y comentar la otra
// semanaAhorro.push(1000, 2000, 3000, 5000, 4000, 3000, 4000);

for (let i = 0; i < semanaAhorro.length; i++) {
  ahorro += semanaAhorro[i];
}

let id1 = document.getElementById("1");
let id2 = document.getElementById("2");
let id3 = document.getElementById("3");
let id4 = document.getElementById("4");
let id5 = document.getElementById("5");
let id6 = document.getElementById("6");
let id7 = document.getElementById("7");

id1.innerHTML = `$${semanaAhorro[0]}`;
id2.innerHTML = `$${semanaAhorro[1]}`;
id3.innerHTML = `$${semanaAhorro[2]}`;
id4.innerHTML = `$${semanaAhorro[3]}`;
id5.innerHTML = `$${semanaAhorro[4]}`;
id6.innerHTML = `$${semanaAhorro[5]}`;
id7.innerHTML = `$${semanaAhorro[6]}`;

console.log(ahorro);
// Obtenemos las etiquetas

let tituloWeek = document.getElementById("tituloWeek");
tituloWeek.innerHTML = `$${ahorro}`;
