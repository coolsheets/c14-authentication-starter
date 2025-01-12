
async function getCurrentUser() {
    const userResultTextArea = document.getElementById('userResult')
    userResultTextArea.textContent = ""
    const response = await fetch('/cookie/currentUser')
    if (!response.ok) {
        alert('Fetch failed')
        return
    }
    const currentUser = await response.text()
    userResultTextArea.textContent = currentUser || "not logged in"
}

async function cookieLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch('/cookie/login', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
    })

    if (!response.ok) {
        alert('Login failed!')
        return
    }
    
    alert('Login succeeded!')
}

async function getBalance() {
    showResult("")
    const response = await fetch('/cookie/balance')
    if (!response.ok) {
        alert('Fetch failed')
        return
    }
    const balance = await response.json()
    showResult(JSON.stringify(balance))
    return balance
}

function showResult(result) {
    const resultTextArea = document.getElementById('result')
    resultTextArea.textContent = result.replaceAll(",",",\n ")
}

async function cookieLogout() {
    const response = await fetch('/cookie/logout')
    showResult("")
    alert("Logged out!")
}

