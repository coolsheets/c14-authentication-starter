
let authorization = ""

async function formBasicLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const testAuthorization = "Basic " + btoa(`${username}:${password}`)
    const response = await fetch('/formbasic/login', {
        headers: {
            "Authorization": testAuthorization
        }
    })
    if (!response.ok) {
        alert('Login failed!')
        return
    }
    authorization = testAuthorization
    alert('Login succeeded!')
}

async function getBalance() {
    showResult("")
    const response = await fetch('/formbasic/balance', {
        headers: {
            "Authorization": authorization
        }
    })
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

async function formBasicLogout() {
    authorization = ""
    // no endpoint call required
    showResult("")
    alert("Logged out!")
}

