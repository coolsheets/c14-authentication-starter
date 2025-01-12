async function getCurrentUser() {
    const userResultTextArea = document.getElementById('userResult')
    userResultTextArea.textContent = ""
    const response = await fetch('/basic/currentUser')
    if (!response.ok) {
        alert('Fetch failed')
        return
    }
    const currentUser = await response.text()
    userResultTextArea.textContent = currentUser || "not logged in"
}

async function login() {
    const response = await fetch('/basic/login')
    if (!response.ok) {
        alert('Login failed')
        return
    }
    alert('Login successful')
}

async function getBalance() {
    showResult("")
    const response = await fetch('/basic/balance')
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

async function basicLogout() {
    const response = await fetch('/basic/logout')
    if (!response.ok) {
        alert('Logout successful')
        showResult("")
        return
    }
}

