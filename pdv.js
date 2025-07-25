const inpOduzmipdvVrijednost = document.getElementById(
  'inpOduzmipdvVrijednost'
);
const inpDodajpdvVrijednost = document.getElementById('inpDodajpdvVrijednost');
const btnOduzmipdv = document.getElementById('btnOduzmipdv');
const btnDodajpdv = document.getElementById('btnDodajpdv');
const minusPdvPostotak = document.getElementById('minusPdvPostotak');
const plusPdvPostotak = document.getElementById('plusPdvPostotak');
const tdBezPdv = document.getElementById('tdBezPdv');
const tdIznosBezpdv = document.getElementById('tdIznosBezpdv');
const tdSaPdv = document.getElementById('tdSaPdv');
const tdIznosSaPdv = document.getElementById('tdIznosSaPdv');

function oduzmiPdv() {
  const vrijednost = parseFloat(inpOduzmipdvVrijednost.value);
  const procenat = parseFloat(minusPdvPostotak.value);

  if (isNaN(vrijednost) || isNaN(procenat)) {
    Swal.fire({
      icon: 'error',
      title: 'Pogrešan unos!!',
      text: 'Molim unesite brojčane vrijednosti!',
    });
    inpOduzmipdvVrijednost.value = '';
    minusPdvPostotak.value = '17';
    return;
  }

  const pdv = vrijednost / (1 + procenat / 100);
  tdBezPdv.textContent = pdv.toFixed(2);
  tdIznosBezpdv.textContent = (vrijednost - pdv).toFixed(2);
}

btnOduzmipdv.addEventListener('click', oduzmiPdv);

function dodajPdv() {
  const vrijednost = parseFloat(inpDodajpdvVrijednost.value);
  const procenat = parseFloat(plusPdvPostotak.value);
  const pdv = vrijednost * (procenat / 100);
  if (isNaN(vrijednost) || isNaN(procenat)) {
    Swal.fire({
      icon: 'error',
      title: 'Pogrešan unos!!',
      text: 'Molim unesite brojčane vrijednosti!',
    });

    tdIznosSaPdv.textContent = pdv.toFixed(2);
    inpDodajpdvVrijednost.value = '';
    plusPdvPostotak.value = '17';
    return;
  }

  tdSaPdv.textContent = +inpDodajpdvVrijednost.value + +pdv.toFixed(2);
  tdIznosSaPdv.textContent = pdv.toFixed(2);
}

btnDodajpdv.addEventListener('click', dodajPdv);
