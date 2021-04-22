let currentUserObjArray = {}
let loggedInUser = {}

let userFormDiv = document.querySelector("#userFormDiv")

let loginForm = document.createElement("form")
    loginForm.id = "loginForm"
let usernameInput = document.createElement("input")
    usernameInput.id = "loginUsername"
let loginButton = document.createElement("button")
    loginButton.innerText = "Login"
    loginButton.classList.add("actionButton")
    loginButton.id = "loginButton"
loginForm.append(usernameInput, loginButton)

let registerForm = document.createElement("form")
    registerForm.id = "registerForm"
let registerInput = document.createElement("input")
    registerInput.id = "registerUsername"
let registerButton = document.createElement("button")
    registerButton.innerText = "Register"
    registerButton.classList.add("actionButton")
    registerButton.id = "registerButton"
registerForm.append(registerInput, registerButton)

userFormDiv.append(loginForm, registerForm)

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let enteredUsername = event.target.loginUsername.value
    fetch(`http://localhost:3000/users?_embed=burgers&username=${enteredUsername}`)
    .then(res => res.json())
    .then((userObjArray) => {
        if(userObjArray.length > 0){
            currentUserObjArray = userObjArray
            loggedInUser.username = currentUserObjArray[0].username
            loggedInUser.id = currentUserObjArray[0].id
        } else {
            alert("Username not found. Please register to continue.")
        }        
    })
    event.target.reset()
})

registerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let enteredRegistration = event.target.registerUsername.value
    fetch(`http://localhost:3000/users?_embed=burgers&username=${enteredRegistration}`)
    .then(res => res.json())
    .then((userObjArray) => {
        if(userObjArray.length > 0){
            alert("Username already exists.")
        } else {
            fetch(`http://localhost:3000/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: enteredRegistration
                })
            })
                .then(res => res.json())
                .then(() => {
                    alert("Welcome to Burger Builder! Please login to get started.")
                })    
        }    
    })
    event.target.reset()
})