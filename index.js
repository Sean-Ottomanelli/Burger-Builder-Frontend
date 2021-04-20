let burgerContainerDiv = document.querySelector("#burgersContainer")
let mainContainerDiv = document.querySelector("#mainContainer")
currentBurger = {}
// builtBurger = {}
let buildButton = document.querySelector("#buildButton")
let createdIngredientsArray = []

let ingredientsArray = [
  {
    name: "Burger Bun Bottom", 
    image_url: "Burger Bun Bottom.png"
  },
  {
    name: "Burger Bun Top",
    image_url: "Burger Bun Top.png"
  }
]

fetch("http://localhost:3000/burgers")
  .then((r) => r.json())
  .then((burgersArray) => {
      console.log(burgersArray)
      burgersArray.forEach(burgerTnButtonMaker)
    });


function burgerTnButtonMaker(burgerObj) {
    let burgerTnContainer = document.createElement("button")
    let testImage = document.createElement ("img")
    testImage.src = "Burger Full 1.png"
    testImage.style.width = "100px"
    let burgerTnTitle =document.createElement("h3")
    burgerTnTitle.innerText = burgerObj.burgerName
    let burgerTnCreator =document.createElement("h4")
    burgerTnCreator.innerText = burgerObj.username;
    burgerTnContainer.append(burgerTnTitle, burgerTnCreator, testImage)
    burgerContainerDiv.append(burgerTnContainer)
    burgerTnContainer.addEventListener("click", (evt) => {displayBurger(burgerObj)})
}
    
function displayBurger(burgerObj) {
  currentBurger = burgerObj
  mainContainerDiv.innerText = ""
  let burgerTitle = document.createElement("h2")
    burgerTitle.innerText = burgerObj.burgerName
  let burgerCreator = document.createElement("h3")
    burgerCreator.innerText = "By: " + burgerObj.username
  let burgerImage = document.createElement("img")
      burgerImage.src = "Burger Full 1.png"
      burgerImage.classList.add("displayImage")
    let burgerDescrHeader = document.createElement("h4")
      burgerDescrHeader.innerText = "Description:"
  let burgerDescr = document.createElement("p")
      burgerDescr.innerText = burgerObj.description
  let burgerIngredientsHeader = document.createElement("h4")
      burgerIngredientsHeader.innerText = "Ingredients:"
  let burgerIngredientsDiv = document.createElement("div")
  let numLikes = document.createElement("span")
    numLikes.innerText = burgerObj.likes
  let burgerLikeButton = document.createElement("button")
  burgerLikeButton.innerText = "Likes: "
  burgerLikeButton.append(numLikes)
  let burgerCommentHeader = document.createElement("h4")
      burgerCommentHeader.innerText = "Comments:"
  let burgerCommentDiv = document.createElement("div")
  let burgerCommentForm = document.createElement("form")
    burgerCommentForm.id = "burgerCommentForm"
  let burgerCommentInput = document.createElement("input")
    burgerCommentInput.type = "textarea"
    burgerCommentInput.id = "commentInput"
  let burgerCommentButton = document.createElement("button")
    burgerCommentButton.innerText = "Add Comment"
  burgerCommentForm.append(burgerCommentInput, burgerCommentButton)      

  let commentsArray = burgerObj.comments
    
  commentsArray.forEach(appendComment)
  
  function appendComment(comment){
    let commentP = document.createElement("p")
    commentP.innerText = comment
    burgerCommentDiv.append(commentP)
  }
  
    
  let ingredientsArray = burgerObj.ingredients
  ingredientsArray.forEach(function(ingredientObj){
    let ingredientP = document.createElement("p")
    ingredientP.innerText = ingredientObj.name
    burgerIngredientsDiv.append(ingredientP)
  })

  burgerLikeButton.addEventListener("click", () => {
  fetch(`http://localhost:3000/burgers/${currentBurger.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: burgerObj.likes + 1
    }),
  })
    .then((r) => r.json())
    .then((updatedBurgerObj) => {
      numLikes.innerText = parseInt(numLikes.innerText,10) + 1
      burgerObj.likes = updatedBurgerObj.likes
    })
  });
  

  burgerCommentForm.addEventListener("submit", function(event){
    event.preventDefault()
    let commentInput = event.target.commentInput.value
    fetch(`http://localhost:3000/burgers/${currentBurger.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comments: [...currentBurger.comments, commentInput]
      })
    })
      .then(res => res.json())
      .then(function(updatedBurgerObj){
        currentBurger.comments = updatedBurgerObj.comments

        appendComment(commentInput)
      })
      event.target.reset()
  })

  mainContainerDiv.append(burgerTitle, burgerCreator, burgerImage, burgerDescrHeader, burgerDescr, burgerIngredientsHeader, burgerIngredientsDiv, burgerLikeButton, burgerCommentHeader, burgerCommentDiv, burgerCommentForm)
}


buildButton.addEventListener("click", function() {
  mainContainerDiv.innerText = ""
  buildBurger()
  createIngredientButton()

})

function buildBurger(){
  let newBurgerForm = document.createElement("form")
  let newBurgerTitle = document.createElement("input")
  let newBurgerTitleLabel = document.createElement("label")
      newBurgerTitleLabel.innerText = "Title: "
      newBurgerTitleLabel.append(newBurgerTitle)
      newBurgerTitle.type = "text"
      newBurgerTitle.id = "newBurgerTitle"
  let newBurgerUsername = document.createElement("input")
  let newBurgerUsernameLabel = document.createElement("label")
      newBurgerUsernameLabel.innerText = "Username: "
      newBurgerUsernameLabel.append(newBurgerUsername)
      newBurgerUsername.type = "text"
      newBurgerUsername.id = "newBurgerUsername"
  let newBurgerDescription = document.createElement("input")
  let newBurgerDescriptionLabel = document.createElement("label")
      newBurgerDescriptionLabel.innerText = "Description: "
      newBurgerDescriptionLabel.append(newBurgerDescription)
      newBurgerDescription.type = "textarea"
      newBurgerDescription.id = "newBurgerDescription"
  let newBurgerButton = document.createElement("button")
      newBurgerButton.innerText = "Submit"
  newBurgerForm.append(newBurgerTitleLabel, newBurgerUsernameLabel, newBurgerDescriptionLabel, newBurgerButton)
  mainContainerDiv.append(newBurgerForm)
  
  newBurgerForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let createdBurgerTitle = evt.target.newBurgerTitle.value;
    let createdBurgerUsername = evt.target.newBurgerUsername.value;
    let createdBurgerDescription = evt.target.newBurgerDescription.value;

    fetch("http://localhost:3000/burgers", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: createdBurgerUsername,
    burgerName: createdBurgerTitle,
    ingredients: createdIngredientsArray,
    likes: 0,
    comments: [],
    description: createdBurgerDescription
  }),
})
  .then((r) => r.json())
  .then((newlyCreatedBurgerObj) => {
    console.log(newlyCreatedBurgerObj)
    burgerTnButtonMaker(newlyCreatedBurgerObj)
  });
  mainContainerDiv.innerText = ""
  evt.target.reset()
})
}


function createIngredientButton(){
  // let ingredientNumber = 0
  ingredientsArray.forEach(function(ingredientObj){
  let ingredientButton = document.createElement("button")
  ingredientButton.innerText = ingredientObj.name
  
  ingredientButton.addEventListener("click", function(){
    let ingredientDiv = document.createElement("div")
      ingredientDiv.classList.add("ingredientDiv")
      ingredientDiv.id = "ingredient"
    let ingredientImage = document.createElement("img")
    ingredientImage.src = ingredientObj["image_url"]
    // ingredientImage.style.zIndex = ""
    // ingredientNumber = ingredientNumber + 1
    // ingredientObj.id = `${ingredientObj.name}${ingredientNumber}`
    // ingredientImage.id = `${ingredientObj.name}${ingredientNumber}`
    console.log(ingredientImage.id) //string
    console.log(ingredientObj.id) //number
    ingredientImage.classList.add("ingredientImage")
    ingredientDiv.append(ingredientImage)
    mainContainerDiv.prepend(ingredientDiv)
    createdIngredientsArray = [...createdIngredientsArray, ingredientObj]

    // ingredientImage.addEventListener("click", () => {
    //   let currentImageId = ingredientImage.id
    //   // console.log(currentImageId)
    //   let updatedIngredientsArray = createdIngredientsArray.filter((ingredientObj) => {
    //     return ingredientObj.id !== currentImageId
    //   })
    //   console.log(updatedIngredientsArray)
    //   // ingredientImage.remove()
      

    })
    //
    // CSS z-index
    // push
    mainContainerDiv.append(ingredientButton)
  })
  }


// create
