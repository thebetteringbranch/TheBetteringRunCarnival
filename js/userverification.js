async function fetchVerifiedNumbers() {
    const response = await fetch("https://shy-unit-e261.gran5g2017.workers.dev/");
    const data = await response.json();
    // Convert everything to strings so comparison works
    return data.values.flat().map(String);
}

async function handleLogin() {
    console.log("User clicked Login");
    const inputNumber = document.getElementById("username").value.trim();
    const allowedNumbers = await fetchVerifiedNumbers();
    if (allowedNumbers.includes(inputNumber)) {
        sessionStorage.setItem("userLoggedIn", "true");
        sessionStorage.setItem("guestUser", "false");
        console.log("userLoggedIn set to true");
        window.location.href = "stampcard.html";
    } else {
        alert("Invalid Registration ID.");
    }
}

function handleGuestLogin() {
    console.log("User logged in as Guest");
    sessionStorage.setItem("guestUser", "true");
    sessionStorage.setItem("userLoggedIn", "true");
    console.log("guestUser set to true");
    window.location.href = "stampcard.html";
}

document.addEventListener("DOMContentLoaded", () => {
    // Clear stale session data
    sessionStorage.removeItem("pointsRedeemed");
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("guestUser");

    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");
    if (redirect !== "false" && sessionStorage.getItem("userLoggedIn") === "true") {
        window.location.href = "stampcard.html";
        return;
    }

    setTimeout(() => {
        const overlay = document.querySelector(".loading-overlay");
        if (overlay) {
            overlay.style.opacity = 0;
            overlay.style.pointerEvents = "none";
        }
    }, 1500);

    const loginButton = document.querySelector(".primary-button");
    const guestLoginButton = document.querySelector(".secondary-button");

    if (loginButton) loginButton.addEventListener("click", handleLogin);
    if (guestLoginButton) guestLoginButton.addEventListener("click", handleGuestLogin);
});
