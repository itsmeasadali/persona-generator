document.getElementById('personaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePersona();
});

function generatePersona() {
    const ageRange = document.getElementById('ageRange').value;
    const occupation = document.getElementById('occupation').value;
    const goals = Array.from(document.getElementById('goals').selectedOptions)
        .map(option => option.value);

    // Randomly select gender and name
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const name = personaData.names[gender][Math.floor(Math.random() * personaData.names[gender].length)];
    
    // Get random avatar based on occupation and gender
    const avatarIndex = gender === 'male' ? 0 : 1;
    const avatar = personaData.avatars[occupation][avatarIndex];

    // Get random traits and challenges
    const traits = getRandomElements(personaData.traits[occupation], 3);
    const challenges = getRandomElements(personaData.challenges[occupation], 2);

    displayPersona({
        name,
        avatar,
        ageRange,
        occupation,
        goals,
        traits,
        challenges
    });
}

function getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayPersona(persona) {
    const personaOutput = document.getElementById('personaOutput');
    const exportButtons = document.querySelector('.export-buttons');

    personaOutput.innerHTML = `
        <img src="${persona.avatar}" alt="Persona Avatar" class="avatar">
        <h2>${persona.name}</h2>
        <div class="persona-details">
            <div>
                <h3>Basic Info</h3>
                <p>Age: ${persona.ageRange}</p>
                <p>Occupation: ${capitalizeFirst(persona.occupation)}</p>
            </div>
            <div>
                <h3>Goals</h3>
                <ul>
                    ${persona.goals.map(goal => `<li>${formatGoal(goal)}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3>Key Traits</h3>
                <ul>
                    ${persona.traits.map(trait => `<li>${trait}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3>Challenges</h3>
                <ul>
                    ${persona.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    personaOutput.classList.remove('hidden');
    exportButtons.classList.remove('hidden');
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatGoal(goal) {
    return goal.split(/(?=[A-Z])/).join(' ');
}

// Export functionality
document.getElementById('exportPDF').addEventListener('click', exportToPDF);
document.getElementById('exportImage').addEventListener('click', exportToImage);

function exportToPDF() {
    const element = document.getElementById('personaOutput');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('persona.pdf');
    });
}

function exportToImage() {
    const element = document.getElementById('personaOutput');
    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'persona.png';
        link.href = canvas.toDataURL();
        link.click();
    });
} 