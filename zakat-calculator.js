document.addEventListener("DOMContentLoaded", async () => {
    const calculateBtn = document.getElementById("calculateZakat");
    const resultDisplay = document.getElementById("zakatResult");

    async function getNisab() {
        try {
            const response = await fetch("https://www.goldapi.io/api/XAG/USD", {
                headers: {
                    "x-access-token": "goldapi-mtv49sm7snectu-io", 
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            const silverPricePerGram = data.price / 31.1035; // Convert per troy ounce to per gram
            return silverPricePerGram * 612.36; // Nisab in silver
        } catch (error) {
            console.error("Error fetching nisab value:", error);
            return 612.36; // Default fallback
        }
    }

    calculateBtn.addEventListener("click", async () => {
        const cash = parseFloat(document.getElementById("cash").value) || 0;
        const gold = parseFloat(document.getElementById("gold").value) || 0;
        const silver = parseFloat(document.getElementById("silver").value) || 0;
        const investments = parseFloat(document.getElementById("investments").value) || 0;
        const liabilities = parseFloat(document.getElementById("liabilities").value) || 0;

        const totalAssets = cash + gold + silver + investments;
        const zakatableAmount = totalAssets - liabilities;
        const nisab = await getNisab();

        if (zakatableAmount >= nisab) {
            const zakatDue = zakatableAmount * 0.025;
            resultDisplay.innerHTML = `<p class='text-green-500 text-lg'>Your Zakat: $${zakatDue.toFixed(2)}</p>`;
            setTimeout(() => {
                resultDisplay.innerHTML = "";
            }, 5000);
        } else {
                resultDisplay.innerHTML = `<p class='text-red-500 text-lg'>You do not need to pay Zakat.</p>`;
                setTimeout(() => {
                    resultDisplay.innerHTML = "";
                }, 5000);
        }
    });
});
