document.addEventListener("DOMContentLoaded", function () {
    function loadPrayerWidget(cityID) {
        const madhab = 2; // 1 = Hanafi, 2 = Shafi
        const method = 0; // 0 = Default method used in IslamicFinder widget
        const fajrAngle = 19.5;
        const ishaAngle = 17.5;

        // Correct widget structure using city ID
        const widgetSrc = `https://www.islamicfinder.org/prayer-widget/${cityID}/shafi/${madhab}/${method}/${fajrAngle}/${ishaAngle}`;
        
        document.getElementById("prayerWidget").src = widgetSrc;
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    // Convert lat/lon to city ID
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.address && data.address.city) {
                                const city = data.address.city;
                                const country = data.address.country;
                                console.log(`Detected location: ${city}, ${country}`);

                                // Use Lagos, Nigeria ID if unknown
                                const cityID = (city === "Lagos") ? "2343785" : "2343785";
                                loadPrayerWidget(cityID);
                            } else {
                                loadPrayerWidget("2343785"); // Default to Lagos
                            }
                        })
                        .catch(error => {
                            console.error("Error converting location:", error);
                            loadPrayerWidget("2343785"); // Default to Lagos
                        });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    document.getElementById("locationError").classList.remove("hidden");
                    loadPrayerWidget("2343785"); // Default to Lagos
                }
            );
        } else {
            console.error("Geolocation not supported.");
            document.getElementById("locationError").classList.remove("hidden");
            loadPrayerWidget("2343785"); // Default to Lagos
        }
    }

    getLocation();
});
