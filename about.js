async function askAI() {
    const queryInput = document.getElementById('ai-query');
    const display = document.getElementById('ai-answer');
    const query = queryInput.value.toLowerCase().trim();

    if (!query) return;

    display.innerHTML = "Thinking...";

    try {
        // Fetch your existing data.json file
        const response = await fetch('data.json');
        const data = await response.json();

        // Simple search logic: check if keywords exist in the text or topic
        const match = data.find(item => 
            item.text.toLowerCase().includes(query) || 
    item.topic.toLowerCase().includes(query) ||
    item.keywords.some(k => k.toLowerCase().includes(query))
        );

        setTimeout(() => {
            if (match) {
                display.innerHTML = `<p class="fade-in">${match.text}</p>`;
            } else {
                display.innerHTML = `<p class="fade-in">I don't have details on that yet. Try asking about "Siliguri", "music", or "coding".</p>`;
            }
        }, 500); // Small delay to feel like the AI is "thinking"

    } catch (error) {
        console.error("Error loading data:", error);
        display.innerHTML = "Error connecting to the database.";
    }
}

// Allow "Enter" key to trigger search
document.getElementById('ai-query').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAI();
});