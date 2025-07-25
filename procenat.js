function IzracKolicine(Kukupno, KProcenat) {
  var Kukupno = document.getElementById('KolUkupno').value;
  var KProcenat = document.getElementById('KolProcenat').value;
  var Kracun = (Kukupno * KProcenat) / 100;
  var KracunToFixed = Kracun.toFixed(2);
  document.getElementById('KolKolicina').value = parseFloat(KracunToFixed);
}

const pu = document.getElementById('ProcUkupno');
const pk = document.getElementById('ProcKolicina');
const pp = document.getElementById('ProcProcenat');
const procIzracun = document.getElementById('procIzracun');

function IzracunProcenta() {
  if (pu.value == '' || pk.value == '') {
    Swal.fire({
      icon: 'info',
      text: 'Upišite vrijednosti',
    });
  } else if (pu.value <= pk.value) {
    Swal.fire({
      icon: 'info',
      text: 'Ukupna vrijednost mora biti veća',
    });
  } else {
    let Pracun = (pk.value * 100) / pu.value;

    pp.value = Number(Pracun).toFixed(2);
  }
}

procIzracun.addEventListener('click', function (e) {
  e.preventDefault();
  IzracunProcenta();
});

function IzracunZaposlenih() {
  var zap_manje30 = parseInt(document.getElementById('zap_manje30').value);
  var zap_31_40 = parseInt(document.getElementById('zap_31_40').value);
  var zap_41_50 = parseInt(document.getElementById('zap_41_50').value);
  var zap_51_60 = parseInt(document.getElementById('zap_51_60').value);
  var zap_vece60 = parseInt(document.getElementById('zap_vece60').value);

  var IBZ = zap_manje30 + zap_31_40 + zap_41_50 + zap_51_60 + zap_vece60;

  document.getElementById('zap_ukupno').value = IBZ;
}

function PostotakZaposlenih() {
  var txtprvi = parseInt(document.getElementById('zap_manje30').value);
  var txtdrugi = parseInt(document.getElementById('zap_31_40').value);
  var txttreci = parseInt(document.getElementById('zap_41_50').value);
  var txtcetvrti = parseInt(document.getElementById('zap_51_60').value);
  var txtpeti = parseInt(document.getElementById('zap_vece60').value);

  var totalZaposleni = parseInt(document.getElementById('zap_ukupno').value);

  var prvi = (txtprvi * 100) / totalZaposleni;
  var drugi = (txtdrugi * 100) / totalZaposleni;
  var treci = (txttreci * 100) / totalZaposleni;
  var cetvrti = (txtcetvrti * 100) / totalZaposleni;
  var peti = (txtpeti * 100) / totalZaposleni;
  var ukupnoje = prvi + drugi + treci + cetvrti + peti;
  document.getElementById('post_manje30').value = prvi.toFixed(2);
  document.getElementById('post_31_40').value = drugi.toFixed(2);
  document.getElementById('post_41_50').value = treci.toFixed(2);
  document.getElementById('post_51_60').value = cetvrti.toFixed(2);
  document.getElementById('post_vece60').value = peti.toFixed(2);
  document.getElementById('post_ukupno').value = ukupnoje.toFixed(2);
}

function KamataPoDanima() {
  var txtDospijece = document.getElementById('dospijece').value;
  var txtKasnjenje = document.getElementById('kasnjenje').value;
  var txtDug = document.getElementById('dug').value;
  var txtKamata = document.getElementById('kamata').value;

  var date1 = new Date(txtDospijece);
  var date2 = new Date(txtKasnjenje);
  if (date1 > date2) {
    document.getElementById('ukupnodana').value = 0;
    document.getElementById('rezultatKamate').value = 0;
    // alert('Kašnjenje mora biti veći datum');
    Swal.fire('Greška', 'Kašnjenje mora biti veći datum');
    return;
  } else {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  }

  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  var Rezult = (diffDays * txtDug * txtKamata) / 100;
  var Rez = Rezult.toFixed(2);
  document.getElementById('rezultatKamate').value = Rez + ' KM';
  //alert("Dana: "+ diffDays);
  document.getElementById('ukupnodana').value = diffDays;
  //alert(diffDays);
  document.getElementById('ukupnodana').disabled = true;
}

function check(Sender, e) {
  var key = e.which ? e.which : e.keyCode;
  if (key == 44) {
    Sender.value += '.';
    return false;
  }
}
