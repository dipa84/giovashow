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
                resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</p>`;
                mobileResultDiv.innerHTML += `<span><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</span>`;
            }
        }
        resultDiv.innerHTML += "<div class='separator'><strong>Consonanti:</strong></div>";
        mobileResultDiv.innerHTML += "<div class='separator'><strong>Consonanti:</strong></div>";
        for (let char of consonants) {
            if (tempCounts[char]) {
                const count = tempCounts[char];
                resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</p>`;
                mobileResultDiv.innerHTML += `<span><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</span>`;
            }
        }
        return;
    } else {
        charsToDisplay = orderOfAppearance;
    }

    for (let char of charsToDisplay) {
        if (tempCounts[char]) {
            const count = tempCounts[char];
            resultDiv.innerHTML += `<p><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</p>`;
            mobileResultDiv.innerHTML += `<span><strong>${char.toUpperCase()}</strong>: ${Array(count).fill(char).join(' ')}</span>`;
        }
    }
}
