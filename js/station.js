if (sessionStorage.getItem("pointsRedeemed") === "true") {
    window.location.href = "redeemed.html";
}

let codes = [
    "c6d9bdfc493eb3948e5ac2e51c3c65f6db3c26a0d702d42e255b6a79fe4ed07d",
    "6e7552e8fe51972c90ef7c6f2d423249836937a1be4980f7359f8d5c8d735a7a",
];

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText.includes("thebetteringbranchandbytepenguinarethegoatsweareup")) {
        let params = new URLSearchParams(window.location.search);
        let receivedStation = decodedText.substring(decodedText.length - 2, decodedText.length - 1);
        if (receivedStation == params.get("station")) {
            alert(`Valid QR Code Scanned for Station ${receivedStation}`);
            let queryParam = decodedText.substring(decodedText.length - 2, decodedText.length - 1);
            window.location.replace("stampcard.html?qrcode=" + codes[queryParam - 1]);
        } else {
            alert("Wrong Station QR Code Scanned");
        }
    } else {
        alert("Invalid QR Code Scanned");
    }
}

function onScanFailure(error) {
    console.warn("Scan error: ", error);
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pageTitle = document.getElementById("pageTitle");
    const station = params.get("station");
    const titles = [
        "What does it cost the Earth?",
        "How good is it for me?",
    ];

    if (["1", "2"].includes(station)) {
        pageTitle.innerHTML = titles[Number(station) - 1];
        const desc = document.getElementById(`pageDescription${station}`);
        desc.classList.remove("hidden");
    } else {
        window.location.href = "index.html";
    }

    // No double request — start scanner directly
    let html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: function (viewfinderWidth, viewfinderHeight) {
                let minSize = Math.min(viewfinderWidth, viewfinderHeight) * 0.75;
                return { width: minSize, height: minSize };
            },
        },
        onScanSuccess,
        onScanFailure
    ).catch((error) => {
        console.error("Camera error:", error);
        alert("Camera access was denied. Please allow it in your browser settings.");
    });
});
