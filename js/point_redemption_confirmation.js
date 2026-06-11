if (sessionStorage.getItem("pointsRedeemed") === "true") {
    window.location.href = "stampcard.html";
}

console.log("Confirmation page script loaded");

function redeemPoints() {
    sessionStorage.setItem("pointsRedeemed", "true");
    window.location.href = "point_redemption.html";
}

document.getElementById("yes-btn").addEventListener("click", () => {
    console.log("Yes button clicked");
    redeemPoints();
});

document.getElementById("no-btn").addEventListener("click", () => {
    console.log("No button clicked");
    window.location.href = "stampcard.html";
});
