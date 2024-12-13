let username = "";

function registerUser() {
    username = document.getElementById("username").value;
    
    if (username) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-message").innerText = data.message;
            document.getElementById("register-section").style.display = 'none';
            document.getElementById("missions-section").style.display = 'block';
            document.getElementById("inventory-section").style.display = 'block';
            document.getElementById("undici-section").style.display = 'block';
            loadMissions();
            loadInventory();
        });
    } else {
        alert("Please enter a username!");
    }
}

function loadMissions() {
    fetch('/missions')
        .then(response => response.json())
        .then(data => {
            let missionsHtml = '';
            data.forEach((mission, index) => {
                missionsHtml += `<p>${mission.title} - ${mission.completed ? '✔ Completed' : '✘ Not Completed'}</p>`;
            });
            document.getElementById("missions-list").innerHTML = missionsHtml;
        });
}

function completeMission() {
    fetch('/missions/complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "mission_index": 0 // Example: complete the first mission
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadMissions();
    });
}

function loadInventory() {
    fetch(`/inventory?username=${username}`)
        .then(response => response.json())
        .then(data => {
            let inventoryHtml = '';
            data.inventory.forEach(item => {
                inventoryHtml += `<p>${item}</p>`;
            });
            document.getElementById("inventory-list").innerHTML = inventoryHtml;
        });
}

function talkToUndici() {
    let userInput = document.getElementById("undici-input").value;
    fetch('/talk_to_undici', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "input": userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("undici-response").innerText = data.response;
    });
}