const upisGodine = document.getElementById('upisGodine');
const upisMjeseci = document.getElementById('upisMjeseci');
const rezGodineMjes = document.getElementById('rezGodineMjes');
const rezMjes = document.getElementById('rezMjes');
const btnIzracGodMjes = document.getElementById('btnIzracGodMjes');

function godinaMjeseci() {
  if (upisGodine.value === '') upisGodine.value = 0;
  let TotalMjeseci = Number(upisGodine.value) * 12 + Number(upisMjeseci.value);
  rezMjes.value = Number(TotalMjeseci);
  var GodMjes = Math.floor(TotalMjeseci / 12);
  var Ostatak = TotalMjeseci % 12;
  rezGodineMjes.value = GodMjes + ' Godine(a) i ' + Ostatak + ' Mjeseca(i).';
}

btnIzracGodMjes.addEventListener('click', function (e) {
  e.preventDefault();

  godinaMjeseci();
});
//Razlike između datuma

const dateInput = document.querySelector('.date-input');
const resultInput = document.querySelector('.result-input');

dateInput.addEventListener('click', function (event) {
  if (event.target.hasAttribute('type')) {
    if (event.target.getAttribute('type') === 'button') {
      const valueOne =
        event.target.parentElement.parentElement.children[0].children[1]
          .children[0].value;
      const valueTwo =
        event.target.parentElement.parentElement.children[1].children[1]
          .children[0].value;

      const dateValueOne = new Date(valueOne);
      const dateValueTwo = new Date(valueTwo);
      const subtractionDate =
        dateValueTwo.getTime() / 1000 - dateValueOne.getTime() / 1000;

      if (subtractionDate < 0) {
        alert('Pocetni datum mora biti manji od krajnjeg datuma');
        return false;
      }

      let year = subtractionDate * 0.000000031688;
      const yearFinal = Math.floor(year);

      let months = (year - yearFinal) * 12;
      let monthsFinal = Math.floor(months);

      let days = (months - monthsFinal) * 30.4375;
      let daysFinal = Math.floor(days);

      const yearInner = resultInput.children[0].children[0].children[0];
      const monthsInner = resultInput.children[0].children[1].children[0];
      const daysInner = resultInput.children[0].children[2].children[0];

      yearInner.innerText = `${yearFinal}`;
      monthsInner.innerText = `${monthsFinal}`;
      daysInner.innerText = `${daysFinal}`;
    }
  }
});

const scrolIzracun = document.querySelector('.scroller');
const lblIzracun = document.querySelector('.izracun');
