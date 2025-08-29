// ------------------------------
// Godine i mjeseci
// ------------------------------
const upisGodine = document.getElementById('upisGodine');
const upisMjeseci = document.getElementById('upisMjeseci');
const rezGodineMjes = document.getElementById('rezGodineMjes');
const rezMjes = document.getElementById('rezMjes');
const btnIzracGodMjes = document.getElementById('btnIzracGodMjes');

function godinaMjeseci() {
  let godine = Number(upisGodine.value) || 0;
  let mjeseci = Number(upisMjeseci.value) || 0;

  let totalMjeseci = godine * 12 + mjeseci;
  rezMjes.value = totalMjeseci;

  let GodMjes = Math.floor(totalMjeseci / 12);
  let Ostatak = totalMjeseci % 12;

  rezGodineMjes.value = `${GodMjes} Godina(e) i ${Ostatak} Mjesec(a)`;
}

btnIzracGodMjes.addEventListener('click', function (e) {
  e.preventDefault();
  godinaMjeseci();
});

// ------------------------------
// Razlika između dva datuma
// ------------------------------
document.querySelector('.btn button').addEventListener('click', function () {
  const startDate = flatpickr.parseDate(
    document.querySelector('#pocetni').value,
    'd.m.Y'
  );
  const endDate = flatpickr.parseDate(
    document.querySelector('#krajnji').value,
    'd.m.Y'
  );

  if (!startDate || !endDate) {
    alert('Upišite oba datuma!');
    return;
  }

  if (endDate < startDate) {
    alert('Početni datum mora biti manji od krajnjeg datuma!');
    return;
  }

  // Razlika u milisekundama
  let diffMs = endDate - startDate;

  // Pretvaranje u dane
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Godine, mjeseci, dani
  let years = Math.floor(diffDays / 365.25);
  let months = Math.floor((diffDays % 365.25) / 30.4375);
  let days = Math.floor((diffDays % 365.25) % 30.4375);

  // Ispis
  document.querySelector('.year h1').innerText = years;
  document.querySelector('.months h1').innerText = months;
  document.querySelector('.day h1').innerText = days;
});

// ------------------------------
// Scroll efekat na rezultat
// ------------------------------
const scrolIzracun = document.querySelector('.scroller');
const lblIzracun = document.querySelector('.izracun');

// Ako želiš da skroluje automatski do rezultata:
function scrollToRezultat() {
  if (scrolIzracun && lblIzracun) {
    scrolIzracun.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
