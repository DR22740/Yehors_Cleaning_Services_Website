// keep in mind this file is a hacky way to export the Data
// in real service it is done from the database like FireBase or SQL stored on a distant server
document.addEventListener('DOMContentLoaded', function() {
    const cleaningData = JSON.parse(localStorage.getItem('cleaningData'));

    if (cleaningData) {
        document.getElementById('houseSizeSummary').textContent = cleaningData.houseSize;
        document.getElementById('specificRequestsSummary').textContent = cleaningData.specificRequests;
        document.getElementById('additionalNotesSummary').textContent = cleaningData.additionalNotes;
        document.getElementById('selectedCleanerSummary').textContent = cleaningData.selectedCleaner;

        const timeSelectionsContainer = document.getElementById('timeSelectionsSummary');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        days.forEach(day => {
            const times = cleaningData.timeSelections[day];
            const dayDiv = document.createElement('div');
            dayDiv.innerHTML = `<strong>${day.charAt(0).toUpperCase() + day.slice(1)}:</strong> ${times.join(', ')}`;
            timeSelectionsContainer.appendChild(dayDiv);
        });
    }
});