function showFixedInfo() {
    const fixedInfo = document.getElementById('fixedInfo');
    if (window.innerWidth <= 600) {
        fixedInfo.style.display = 'flex';
    }
}

function hideFixedInfo() {
    const fixedInfo = document.getElementById('fixedInfo');
    if (window.innerWidth <= 600) {
        fixedInfo.style.display = 'none';
    }
}

window.addEventListener('resize', function() {
    const fixedInfo = document.getElementById('fixedInfo');
    if (window.innerWidth > 600) {
        fixedInfo.style.display = 'none';
    }
});

window.addEventListener('load', function() {
    const fixedInfo = document.getElementById('fixedInfo');
    if (window.innerWidth > 600) {
        fixedInfo.style.display = 'none';
    }
});

let characterCounts = {};
let orderOfAppearance = {};

// Funzione per rimuovere gli accenti dalle lettere
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function countCharacters() {
    let textInput = document.getElementById("textInput").value.toLowerCase();
    textInput = removeAccents(textInput); // Rimuovi gli accenti
    characterCounts = {};
    orderOfAppearance = [];

    for (let char of textInput) {
        if (isLetter(char)) {
            if (characterCounts[char]) {
                characterCounts[char]++;
            } else {
                characterCounts[char] = 1;
                orderOfAppearance.push(char);
            }
        }
    }

    const resultDiv = document.getElementById("result");
    if (textInput) {
        resultDiv.classList.remove("empty");
    } else {
        resultDiv.classList.add("empty");
    }

    displayCounts();
    updateCounts(); // Aggiorna i conteggi dinamicamente
    modifyCount();
}

function modifyCount() {
    let modifyInput = document.getElementById("modifyInput").value.toLowerCase();
    modifyInput = removeAccents(modifyInput); // Rimuovi gli accenti
    const modifyResultDiv = document.getElementById("modifyResult");
    const mobileErrorDiv = document.getElementById("mobileError");
    modifyResultDiv.innerHTML = "Anagramma Valido ma Incompleto";
    mobileErrorDiv.innerHTML = "";
    modifyResultDiv.classList.remove('valid', 'invalid');
    mobileErrorDiv.classList.remove('valid', 'invalid');

    let tempCounts = { ...characterCounts };
    let valid = true;
    let unavailableLetters = [];
    let allLettersUsed = true;

    for (let char of modifyInput) {
        if (isLetter(char)) {
            if (tempCounts[char]) {
                tempCounts[char]--;
                if (tempCounts[char] < 0) {
                    valid = false;
                    unavailableLetters.push(char);
                    tempCounts[char] = 0;
                }
            } else {
                valid = false;
                unavailableLetters.push(char);
            }
        }
    }

    for (let char in tempCounts) {
        if (tempCounts[char] > 0) {
            allLettersUsed = false;
            break;
        }
    }

    displayCounts(tempCounts);

    if (valid && allLettersUsed) {
        modifyResultDiv.innerHTML = "Anagramma Valido e Completo 🎉";
        modifyResultDiv.classList.add('valid');
        mobileErrorDiv.classList.add('valid');
    } else if (valid) {
        modifyResultDiv.innerHTML = modifyInput ? "Anagramma Valido ma Incompleto" : "Testo Vuoto";
        modifyResultDiv.classList.add('valid');
        mobileErrorDiv.classList.add('valid');
    } else {
        let errorMessage = unavailableLetters.length === 1 ? `La lettera "${unavailableLetters[0]}" non è disponibile!` : `Le lettere "${unavailableLetters.join('", "')}" non sono disponibili!`;
        modifyResultDiv.innerHTML = `Anagramma Non Valido<br>${errorMessage}`;
        modifyResultDiv.classList.add('invalid');
        mobileErrorDiv.innerHTML = `Anagramma Non Valido<br>${errorMessage}`;
        mobileErrorDiv.classList.add('invalid');
    }

    // Sincronizza i due div
    mobileErrorDiv.innerHTML = modifyResultDiv.innerHTML;
}

// Assicurati di aggiornare anche il mobileErrorDiv quando la pagina si carica
document.addEventListener('DOMContentLoaded', function() {
    const modifyResultDiv = document.getElementById("modifyResult");
    const mobileErrorDiv = document.getElementById("mobileError");
    mobileErrorDiv.innerHTML = modifyResultDiv.innerHTML;
});

function displayCounts(tempCounts = characterCounts) {
    const resultDiv = document.getElementById("result");
    const mobileResultDiv = document.getElementById("mobileResult");
    const orderSelect = document.getElementById("orderSelect").value;
    resultDiv.innerHTML = "";
    mobileResultDiv.innerHTML = "";

    let charsToDisplay;
    if (orderSelect === "alphabetical") {
        charsToDisplay = Object.keys(tempCounts).sort();
    } else if (orderSelect === "vowelsConsonants") {
        const vowels = ["a", "e", "i", "o", "u"];
        const consonants = Object.keys(tempCounts).filter(char => !vowels.includes(char));
        resultDiv.innerHTML += "<div class='separator'><strong>Vocali:</strong></div>";
        mobileResultDiv.innerHTML += "<div class='separator'><strong>Vocali:</strong></div>";
        for (let char of vowels) {
            if (tempCounts[char]) {
                const count = tempCounts[char];
                resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
                mobileResultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
            }
        }
        resultDiv.innerHTML += "<div class='separator'><strong>Consonanti:</strong></div>";
        mobileResultDiv.innerHTML += "<div class='separator'><strong>Consonanti:</strong></div>";
        for (let char of consonants) {
            if (tempCounts[char]) {
                const count = tempCounts[char];
                resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
                mobileResultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
            }
        }
        return;
    } else {
        charsToDisplay = orderOfAppearance;
    }

    for (let char of charsToDisplay) {
        if (tempCounts[char]) {
            const count = tempCounts[char];
            resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
            mobileResultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${wrapGroupsWithSpan(Array(count).fill(char).join(' '))}</p>`;
        }
    }
}

function wrapGroupsWithSpan(text) {
    return `<span>${text}</span>`;
}

function updateCounts() {
    let modifyInput = document.getElementById("modifyInput").value.toLowerCase();
    modifyInput = removeAccents(modifyInput); // Rimuovi gli accenti
    let tempCounts = { ...characterCounts };

    for (let char of modifyInput) {
        if (isLetter(char) && tempCounts[char]) {
            tempCounts[char]--;
        }
    }

    displayCounts(tempCounts);
}

document.getElementById('orderSelect').addEventListener('change', updateCounts);

function isLetter(char) {
    return /^[a-z]$/.test(char);
}

function copyRemainingLetters() {
    let modifyInput = document.getElementById("modifyInput").value.toLowerCase();
    modifyInput = removeAccents(modifyInput); // Rimuovi gli accenti
    let tempCounts = { ...characterCounts };

    for (let char of modifyInput) {
        if (isLetter(char)) {
            if (tempCounts[char]) {
                tempCounts[char]--;
            }
        }
    }

    let remainingLetters = "";
    for (let char in tempCounts) {
        remainingLetters += char.repeat(tempCounts[char]);
    }

    navigator.clipboard.writeText(remainingLetters).then(() => {
        alert("Lettere rimanenti copiate negli appunti: " + remainingLetters);
    });
}

function insertWord(word) {
    const modifyInput = document.getElementById("modifyInput");
    modifyInput.value += word;
    modifyCount();
}