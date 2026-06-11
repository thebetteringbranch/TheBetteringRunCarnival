function updateProgressDisplay(codes) {
    const progressDiv = document.getElementById("progress");
    const codesListDiv = document.getElementById("codesList");
    const prizeDiv = document.getElementById("prize");

    // If already redeemed, show congrats state
    if (sessionStorage.getItem("pointsRedeemed") === "true") {
        progressDiv.textContent = "🎉 You've completed The Bettering Run!";
        codesListDiv.innerHTML = `
            <p style="font-size: 1.5rem;">🏆</p>
            <p style="font-weight: 700; color: var(--dark-green);">Congratulations!</p>
            <p>You've completed both stations and redeemed your lucky draw ticket.</p>
            <p style="font-size: 0.85rem; color: #555;">
                ✅ Sustainability Game — Completed<br/>
                ✅ Health Game — Completed<br/>
                🎟️ Lucky Draw Ticket — Redeemed
            </p>
        `;
        prizeDiv.innerHTML = "";

        // Grey out both booths
        document.querySelectorAll(".booths .station").forEach(s => {
            s.classList.add("complete");
        });
        return;
    }

    if (codes.length === 0) {
        progressDiv.textContent = `You have yet to complete any stations.`;
    } else if (codes.length === 1) {
        progressDiv.textContent = `You have completed ${codes.length} station out of ${TOTAL_CODES} stations:`;
    } else {
        progressDiv.textContent = `You have completed ${codes.length} stations out of ${TOTAL_CODES} stations:`;
    }

    codesListDiv.innerHTML = "";
    codes.forEach((code) => {
        const p = document.createElement("p");
        p.innerHTML = `<b>${station_names[code - 1]}</b>`;
        codesListDiv.appendChild(p);
        const station = document.getElementById(code);
        station.classList.add("complete");
    });

    if (codes.length >= TOTAL_CODES) {
        prizeDiv.innerHTML = "";
        const claimButton = document.createElement("button");
        claimButton.textContent = "Claim Your Prize 🎉";
        claimButton.onclick = () => {
            window.location.replace("point_redemption_confirmation.html");
        };
        prizeDiv.appendChild(claimButton);
    } else {
        prizeDiv.innerHTML =
            "<p>Complete both stations to win a LUCKY DRAW TICKET (an extra one if you're a runner!) — be sure to verify this at the redemption/info counter!</p>";
    }
}

// How many QR codes they need to scan to claim the prize
const TOTAL_CODES = 2;

let codes = [
    "c6d9bdfc493eb3948e5ac2e51c3c65f6db3c26a0d702d42e255b6a79fe4ed07d", // Hash of 'one'
    "6e7552e8fe51972c90ef7c6f2d423249836937a1be4980f7359f8d5c8d735a7a", // Hash of 'two'
  
];

let station_names = [
    "What does it cost the Earth?",
    "How good is it for me>",
   
];

// Function to get progress from localStorage
function getScannedCodes() {
    const saved = localStorage.getItem("scannedQRCodes");
    return saved ? JSON.parse(saved) : [];
}

// Function to save progress to localStorage
function saveScannedCodes(codes) {
    localStorage.setItem("scannedQRCodes", JSON.stringify(codes));
}

// Function to update the progress display on the page
function updateProgressDisplay(codes) {
    const progressDiv = document.getElementById("progress");
    const codesListDiv = document.getElementById("codesList");
    const prizeDiv = document.getElementById("prize");
    if (codes.length === 0) {
        progressDiv.textContent = `You have yet to complete any stations.`;
    } else if (codes.length === 1) {
        progressDiv.textContent = `You have completed ${codes.length} station out of ${TOTAL_CODES} stations:`;
    } else {
        progressDiv.textContent = `You have completed ${codes.length} stations out of ${TOTAL_CODES} stations:`;
    }

    // Show scanned codes
    codesListDiv.innerHTML = "";
    codes.forEach((code, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<b>${station_names[code - 1]}</b>`;
        codesListDiv.appendChild(p);
        const station = document.getElementById(code);
        station.classList.add("complete");
    });

    // Show claim prize button if they scanned all codes
    if (codes.length >= TOTAL_CODES) {
        prizeDiv.innerHTML = "";
        const claimButton = document.createElement("button");
        claimButton.textContent = "Claim Your Prize 🎉";
        claimButton.onclick = () => {
            window.location.replace("completion.html");
        };
        prizeDiv.appendChild(claimButton);
    } else {
        prizeDiv.innerHTML =
            "<p>Complete both stations to win a LUCKY DRAW TICKET (an extra one if you're a runner!) — be sure to verify this at the redemption/info counter!</p>";
    }
}

// Main logic to check for query params and update progress
function main() {
    // Check if points have already been redeemed

    console.log("Hello");
    const scannedCodes = getScannedCodes();

    // Get the 'qrcode' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);

    const qrCode = urlParams.get("qrcode");

    console.log(scannedCodes);

    if (
        codes.includes(qrCode) &&
        !scannedCodes.includes(codes.indexOf(qrCode) + 1) &&
        scannedCodes.length < TOTAL_CODES
    ) {
        scannedCodes.push(codes.indexOf(qrCode) + 1);
        saveScannedCodes(scannedCodes);
    }

    updateProgressDisplay(scannedCodes);

    for (const e of document.getElementsByClassName("complete")) {
        if ("disabled" in e) {
            e.disabled = true; // Disable if the element supports the 'disabled' attribute
            e.ariaDisabled = true;
        } else {
            e.style.pointerEvents = "none"; // Prevent interactions for non-form elements
        }
    }
}

const urlParams = new URLSearchParams(window.location.search);

const goodieBag = urlParams.get("goodieBag");

if (goodieBag == "false") {
    alert(
        "Unfortunately, Goodie Bag Redemption is only available for Registered Runners"
    );
}

const foodVoucher = urlParams.get("foodVoucher");

if (foodVoucher == "false") {
    alert(
        "Unfortunately, This Voucher is only available for Registered Runners"
    );
}

const photoBooth = urlParams.get("photoBooth");

if (photoBooth == "false") {
    alert(
        "Unfortunately, This Voucher is only available for Registered Runners"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    // Run the main function when the page loads
    main();
});
