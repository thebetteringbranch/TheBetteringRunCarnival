async function fetchVerifiedNumbers() {
    const id = document.getElementById("username").value.trim();
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzrYcNX0MWcg0CB6LZQ7WYEtdT_juJN5_Ve-3uQkNiNC2zg7uOgexRO29gUMrQnv565/exec?id=" + id,
        { redirect: "follow" }
    );
    const data = await response.json();
    return data.valid ? [id] : [];
}

// Function for handling normal login
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

// Function for handling guest login
function handleGuestLogin() {
    console.log("User logged in as Guest");
    sessionStorage.setItem("guestUser", "true");
    sessionStorage.setItem("userLoggedIn", "true");
    console.log("guestUser set to true");
    window.location.href = "stampcard.html";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    // Redirect checks
    if (sessionStorage.getItem("pointsRedeemed") === "true") {
        console.log("Redirecting to redeemed.html...");
        window.location.href = "redeemed.html";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");
    if (redirect !== "false" && sessionStorage.getItem("userLoggedIn") === "true") {
        console.log("Redirecting to stampcard.html...");
        window.location.href = "stampcard.html";
        return;
    }

    // Handle loading animation
    setTimeout(() => {
        const overlay = document.querySelector(".loading-overlay");
        if (overlay) {
            overlay.style.opacity = 0;
            overlay.style.pointerEvents = "none";
        }
    }, 1500);

    // Button event listeners
    const loginButton = document.querySelector(".primary-button");
    const guestLoginButton = document.querySelector(".secondary-button");

    if (loginButton) {
        loginButton.addEventListener("click", handleLogin);
    } else {
        console.log("Login button not found");
    }

    if (guestLoginButton) {
        guestLoginButton.addEventListener("click", handleGuestLogin);
    } else {
        console.log("Guest Login button not found");
    }
});
