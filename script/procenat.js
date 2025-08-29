// --- Količina ---
function IzracKolicine() {
  const ukupno = parseFloat(document.getElementById('KolUkupno').value) || 0;
  const procenat =
    parseFloat(document.getElementById('KolProcenat').value) || 0;

  document.getElementById('KolKolicina').value = (
    (ukupno * procenat) /
    100
  ).toFixed(2);
}

document.getElementById('kolIzracun')?.addEventListener('click', e => {
  e.preventDefault();
  IzracKolicine();
});

// --- Procenat ---
const pu = document.getElementById('ProcUkupno');
const pk = document.getElementById('ProcKolicina');
const pp = document.getElementById('ProcProcenat');
const procIzracun = document.getElementById('procIzracun');

function IzracunProcenta() {
  const ukupno = parseFloat(pu.value) || 0;
  const kolicina = parseFloat(pk.value) || 0;

  if (!ukupno || !kolicina) {
    Swal.fire({ icon: 'info', text: 'Upišite vrijednosti' });
  } else if (ukupno <= kolicina) {
    Swal.fire({ icon: 'info', text: 'Ukupna vrijednost mora biti veća' });
  } else {
    pp.value = ((kolicina * 100) / ukupno).toFixed(2);
  }
}

procIzracun?.addEventListener('click', e => {
  e.preventDefault();
  IzracunProcenta();
});

// --- Izračun zaposlenih ---
function IzracunZaposlenih() {
  const kategorije = [
    'zap_manje30',
    'zap_31_40',
    'zap_41_50',
    'zap_51_60',
    'zap_vece60',
  ];
  let total = 0;

  kategorije.forEach(id => {
    total += parseInt(document.getElementById(id).value) || 0;
  });

  document.getElementById('zap_ukupno').value = total;
}

function PostotakZaposlenih() {
  const ids = [
    'zap_manje30',
    'zap_31_40',
    'zap_41_50',
    'zap_51_60',
    'zap_vece60',
  ];
  const postIds = [
    'post_manje30',
    'post_31_40',
    'post_41_50',
    'post_51_60',
    'post_vece60',
  ];

  const ukupno = parseInt(document.getElementById('zap_ukupno').value) || 1; // da ne dijeli sa 0
  let ukupnoPosto = 0;

  ids.forEach((id, i) => {
    const val = parseInt(document.getElementById(id).value) || 0;
    const proc = ((val * 100) / ukupno).toFixed(2);
    document.getElementById(postIds[i]).value = proc;
    ukupnoPosto += parseFloat(proc);
  });

  document.getElementById('post_ukupno').value = ukupnoPosto.toFixed(2);
}

// --- Kamata po danima ---
function KamataPoDanima() {
  const date1 =
    document.getElementById('dospijece')._flatpickr?.selectedDates[0];
  const date2 =
    document.getElementById('kasnjenje')._flatpickr?.selectedDates[0];

  if (!date1 || !date2) {
    Swal.fire('Greška', 'Odaberi oba datuma!');
    return;
  }

  if (date1 > date2) {
    document.getElementById('ukupnodana').value = 0;
    document.getElementById('rezultatKamate').value = 0;
    Swal.fire('Greška', 'Kašnjenje mora biti veći datum');
    return;
  }

  const diffDays = Math.ceil((date2 - date1) / (1000 * 3600 * 24));

  const txtDug = parseFloat(document.getElementById('dug').value);
  const txtKamata = parseFloat(document.getElementById('kamata').value);

  if (isNaN(txtDug) || isNaN(txtKamata)) {
    Swal.fire('Greška', 'Dug i kamata moraju biti brojevi!');
    return;
  }

  document.getElementById('rezultatKamate').value =
    (diffDays * txtDug * txtKamata).toFixed(2) + ' KM';
  document.getElementById('ukupnodana').value = diffDays;
  document.getElementById('ukupnodana').disabled = true;
}

// --- Zamjena zareza sa tačkom ---
function check(Sender, e) {
  if (e.key === ',' || e.which === 44) {
    Sender.value += '.';
    return false;
  }
}
