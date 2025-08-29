
        // DOM elements
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const copyBtn = document.getElementById('copyBtn');
        const clearBtn = document.getElementById('clearBtn');
        const convertBtn = document.getElementById('convertBtn');
        const notification = document.getElementById('notification');
        const inputCount = document.getElementById('inputCount');
        const outputCount = document.getElementById('outputCount');
        const autoConvert = document.getElementById('autoConvert');
        const themeToggle = document.getElementById('themeToggle');
        const heightButtons = document.querySelectorAll('.height-btn');

        // Mape za transliteraciju
        const latinToCyrillicMap = {
            'a': 'а', 'b': 'б', 'c': 'ц', 'č': 'ч', 'ć': 'ћ', 'd': 'д', 'đ': 'ђ',
            'e': 'е', 'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 'j': 'ј', 'k': 'к',
            'l': 'л', 'lj': 'љ', 'm': 'м', 'n': 'н', 'nj': 'њ', 'o': 'о', 'p': 'п',
            'r': 'р', 's': 'с', 'š': 'ш', 't': 'т', 'u': 'у', 'v': 'в', 'z': 'з', 'ž': 'ж',
            'A': 'А', 'B': 'Б', 'C': 'Ц', 'Č': 'Ч', 'Ć': 'Ћ', 'D': 'Д', 'Đ': 'Ђ',
            'E': 'Е', 'F': 'Ф', 'G': 'Г', 'H': 'Х', 'I': 'И', 'J': 'Ј', 'K': 'К',
            'L': 'Л', 'LJ': 'Љ', 'Lj': 'Љ', 'M': 'М', 'N': 'Н', 'NJ': 'Њ', 'Nj': 'Њ',
            'O': 'О', 'P': 'П', 'R': 'Р', 'S': 'С', 'Š': 'Ш', 'T': 'Т', 'U': 'У',
            'V': 'В', 'Z': 'З', 'Ž': 'Ж'
        };

        const cyrillicToLatinMap = {
            'а': 'a', 'б': 'b', 'ц': 'c', 'ч': 'č', 'ћ': 'ć', 'д': 'd', 'ђ': 'đ',
            'е': 'e', 'ф': 'f', 'г': 'g', 'х': 'h', 'и': 'i', 'ј': 'j', 'к': 'k',
            'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n', 'њ': 'nj', 'о': 'o', 'п': 'p',
            'р': 'r', 'с': 's', 'ш': 'š', 'т': 't', 'у': 'u', 'в': 'v', 'з': 'z', 'ж': 'ž',
            'А': 'A', 'Б': 'B', 'Ц': 'C', 'Ч': 'Č', 'Ћ': 'Ć', 'Д': 'D', 'Ђ': 'Đ',
            'Е': 'E', 'Ф': 'F', 'Г': 'G', 'Х': 'H', 'И': 'I', 'Ј': 'J', 'К': 'K',
            'Л': 'L', 'Љ': 'Lj', 'М': 'M', 'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P',
            'Р': 'R', 'С': 'S', 'Ш': 'Š', 'Т': 'T', 'У': 'U', 'В': 'V', 'З': 'Z', 'Ж': 'Ž'
        };

        // Funkcija za konverziju teksta
        function convertText(text, direction) {
            if (!text) return '';

            if (direction === 'toLatin') {
                // Ćirilica u latinicu
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const nextChar = text[i + 1];

                    // Provera za lj, nj, LJ, Lj, NJ, Nj
                    if ((char === 'л' || char === 'Л') && (nextChar === 'ј' || nextChar === 'Ј')) {
                        result += cyrillicToLatinMap[char + nextChar] || char;
                        i++; // Preskoči sledeći karakter
                    } else if ((char === 'н' || char === 'Н') && (nextChar === 'ј' || nextChar === 'Ј')) {
                        result += cyrillicToLatinMap[char + nextChar] || char;
                        i++; // Preskoči sledeći karakter
                    } else {
                        result += cyrillicToLatinMap[char] || char;
                    }
                }
                return result;
            } else {
                // Latinica u ćirilicu
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const nextChar = text[i + 1];

                    // Provera za lj, nj, LJ, Lj, NJ, Nj
                    if ((char === 'l' || char === 'L') && (nextChar === 'j' || nextChar === 'J')) {
                        result += latinToCyrillicMap[char + nextChar] || char;
                        i++; // Preskoči sledeći karakter
                    } else if ((char === 'n' || char === 'N') && (nextChar === 'j' || nextChar === 'J')) {
                        result += latinToCyrillicMap[char + nextChar] || char;
                        i++; // Preskoči sledeći karakter
                    } else {
                        result += latinToCyrillicMap[char] || char;
                    }
                }
                return result;
            }
        }

        // Funkcija za konverziju i prikaz rezultata
        function convertAndDisplay() {
            const conversionType = document.querySelector('input[name="textConversionType"]:checked').value;
            const convertedText = convertText(inputText.value, conversionType);
            outputText.value = convertedText;

            // Ažuriraj brojače karaktera
            updateCharCount();
        }

        // Ažuriraj brojače karaktera
        function updateCharCount() {
            inputCount.textContent = `${inputText.value.length} karaktera`;
            outputCount.textContent = `${outputText.value.length} karaktera`;
        }

        // Automatska konverzija pri unosu teksta
        inputText.addEventListener('input', function () {
            updateCharCount();
            if (autoConvert.checked) {
                convertAndDisplay();
            }
        });

        // Ručna konverzija na klik
        convertBtn.addEventListener('click', convertAndDisplay);

        // Promena tipa konverzije
        document.querySelectorAll('input[name="textConversionType"]').forEach(radio => {
            radio.addEventListener('change', function () {
                if (autoConvert.checked && inputText.value) {
                    convertAndDisplay();
                }
            });
        });

        // Kopiranje teksta
        copyBtn.addEventListener('click', () => {
            if (outputText.value) {
                outputText.select();
                navigator.clipboard.writeText(outputText.value)
                    .then(() => {
                        showNotification('Tekst je kopiran u clipboard!');
                    })
                    .catch(err => {
                        console.error('Greška pri kopiranju: ', err);
                        showNotification('Greška pri kopiranju teksta!');
                    });
            }
        });

        // Brisanje teksta
        clearBtn.addEventListener('click', () => {
            inputText.value = '';
            outputText.value = '';
            updateCharCount();
            inputText.focus();
        });

        // Prikaz notifikacije
        function showNotification(message) {
            notification.querySelector('span').textContent = message;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Promena teme
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }

      themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem('theme', 'dark');
        } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem('theme', 'light');
        }
      });


        // Promena visine textarea
        heightButtons.forEach(button => {
            button.addEventListener('click', function () {
                const rows = this.getAttribute('data-rows');

                // Ukloni aktivnu klasu sa svih dugmadi
                heightButtons.forEach(btn => btn.classList.remove('active'));
                // Dodaj aktivnu klasu na kliknuto dugme
                this.classList.add('active');

                // Postavi broj redova za oba textarea
                inputText.setAttribute('rows', rows);
                outputText.setAttribute('rows', rows);
            });
        });



        
        // Fokusiraj na input polje prilikom učitavanja stranice
        inputText.focus();

        // Inicijalno ažuriranje brojača
        updateCharCount();
