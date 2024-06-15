const buttons = document.querySelectorAll(".button");

function toggleColor(event) {
    if (event.target.style.backgroundColor === "lightblue") {
        event.target.style.backgroundColor = "white"; // Original color
    } else {
        event.target.style.backgroundColor = "lightblue"; // New color
    }
}

buttons.forEach(button => {
    button.addEventListener("click", toggleColor);
});

var imageMap = {
    Iron: "/images/Season_2023_-_Iron.png",
    Bronze: "/images/Season_2023_-_Bronze.png",
    Gold: "/images/Season_2023_-_Gold.png",
    Platinum: "/images/Season_2023_-_Platinum.png",
    Emerald: "/images/Season_2023_-_Emerald.png",
    Diamond: "/images/Season_2023_-_Diamond.png"
};

var priceMap = {
    Iron: { perDivision: 2 },
    Bronze: { perDivision: 3 },
    Gold: { perDivision: 5 },
    Platinum: { perDivision: 6 },
    Emerald: { perDivision: 6 },
    Diamond: { perDivision: 7 }
};

var region = '';

function setRegion(selectedRegion) {
    region = selectedRegion;
}

function changeRankImage() {
    var rankSelect = document.getElementById("rank");
    var image = document.getElementById("rankImage");
    var selectedRank = rankSelect.value;

    if (imageMap[selectedRank]) {
        image.src = imageMap[selectedRank];
        image.style.opacity = 1; 
    } else {
        image.style.opacity = 0; 
    }
}

function changeRankImage1() {
    var rankSelect = document.getElementById("rank1");
    var image = document.getElementById("rankImage1");
    var selectedRank = rankSelect.value;

    if (imageMap[selectedRank]) {
        image.src = imageMap[selectedRank];
        image.style.opacity = 1; 
    } else {
        image.style.opacity = 0; 
    }
}

function calculatePrice() {
    var currentRank = document.getElementById("rank").value;
    var desiredRank = document.getElementById("rank1").value;
    var currentDiv = parseInt(document.getElementById("division").value);
    var desiredDiv = parseInt(document.getElementById("desdiv").value);

    var priority = document.getElementById("priority").checked;
    var champions = document.getElementById("champions").checked;
    var role = document.getElementById("role").checked;
    var offline = document.getElementById("offline").checked;
    var flash = document.getElementById("flash").checked;

    var price = 0;
    var rankOrder = ["Iron", "Bronze", "Gold", "Platinum", "Emerald", "Diamond"];
    var currentRankIndex = rankOrder.indexOf(currentRank);
    var desiredRankIndex = rankOrder.indexOf(desiredRank);

    for (var i = currentRankIndex; i <= desiredRankIndex; i++) {
        var divisions = 4;
        if (i === currentRankIndex) {
            divisions = (i === desiredRankIndex) ? (currentDiv - desiredDiv) : (currentDiv - 1);
        } else if (i === desiredRankIndex) {
            divisions = (4 - desiredDiv);
        }
        if (i === currentRankIndex && i === desiredRankIndex) {
            divisions = Math.abs(currentDiv - desiredDiv);
        }
        price += divisions * priceMap[rankOrder[i]].perDivision;
    }

    if (priority) {
        price *= 1.25;
    }
    if (champions) {
        price *= 1.10;
    }
    if (role) {
        price *= 1.10;
    }

    document.getElementById("priceButton").innerText = "Price: $" + price.toFixed(2);
}

function generateOrder() {
    var currentRank = document.getElementById("rank").value;
    var desiredRank = document.getElementById("rank1").value;
    var currentDiv = document.getElementById("division").value;
    var desiredDiv = document.getElementById("desdiv").value;
    var priority = document.getElementById("priority").checked ? "Yes" : "No";
    var champions = document.getElementById("champions").checked ? "Yes" : "No";
    var role = document.getElementById("role").checked ? "Yes" : "No";
    var offline = document.getElementById("offline").checked ? "Yes" : "No";
    var flash = document.getElementById("flash").checked ? "Yes" : "No";

    var orderId = Math.floor(100000 + Math.random() * 900000);

    var orderDetails = {
        region: region,
        currentRank: currentRank,
        currentDiv: currentDiv,
        desiredRank: desiredRank,
        desiredDiv: desiredDiv,
        priority: priority,
        champions: champions,
        role: role,
        offline: offline,
        flash: flash,
        orderId: orderId
    };

    var queryString = Object.keys(orderDetails).map(key => key + '=' + orderDetails[key]).join('&');

    window.location.href = "order.html?" + queryString;
}

// Event listeners for rank selection changes
document.getElementById("rank").addEventListener("change", function() {
    changeRankImage();
    calculatePrice();
});

document.getElementById("rank1").addEventListener("change", function() {
    changeRankImage1();
    calculatePrice();
});

// Initialize price calculation on page load
calculatePrice();
