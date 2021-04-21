let burgerContainerDiv = document.querySelector("#burgersContainer")
let mainContainerDiv = document.querySelector("#mainContainer")
currentBurger = {}
// builtBurger = {}
let buildButton = document.querySelector("#buildButton")
let createdIngredientsArray = []
let displayContainer = document.querySelector("#displayDiv")

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
    burgerTnContainer.addEventListener("click", (evt) => {
      displayContainer.innerText = ""
      displayBurger(burgerObj)
    })
}
    
function displayBurger(burgerObj) {
  console.log(burgerObj)
  currentBurger = burgerObj
  mainContainerDiv.innerText = ""
  mainContainerDiv.append(displayContainer)
  let burgerTitle = document.createElement("h2")
    burgerTitle.innerText = burgerObj.burgerName
  let burgerCreator = document.createElement("h3")
    burgerCreator.innerText = "By: " + burgerObj.username
  let burgerDescrHeader = document.createElement("h4")
      burgerDescrHeader.innerText = "Description:"
  let burgerDescr = document.createElement("p")
      burgerDescr.innerText = burgerObj.description
  let burgerIngredientsHeader = document.createElement("h4")
      burgerIngredientsHeader.innerText = "Ingredients:"
  let burgerIngredientsUl = document.createElement("ul")
  let numLikes = document.createElement("span")
    numLikes.innerText = burgerObj.likes
  let burgerLikeButton = document.createElement("button")
  burgerLikeButton.innerText = "Likes: "
  burgerLikeButton.append(numLikes)
  let burgerCommentHeader = document.createElement("h4")
      burgerCommentHeader.innerText = "Comments:"
  let burgerCommentUl = document.createElement("ul")
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
    let commentLi = document.createElement("li")
    commentLi.innerText = comment
    burgerCommentUl.append(commentLi)
  }
  
    
  let ingredientsArray = burgerObj.ingredients
  ingredientsArray.forEach(function(ingredientObj){
    let ingredientLi = document.createElement("li")
    ingredientLi.innerText = ingredientObj.name
    burgerIngredientsUl.append(ingredientLi)
  })

  currentBurger.ingredients.forEach((ingredientObj) => {
    ingredientDisplayer(ingredientObj)
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

  mainContainerDiv.append(burgerTitle, burgerCreator, burgerDescrHeader, burgerDescr, burgerIngredientsHeader, burgerIngredientsUl, burgerLikeButton, burgerCommentHeader, burgerCommentUl, burgerCommentForm)
}


buildButton.addEventListener("click", function() {
  mainContainerDiv.innerText = ""
  mainContainerDiv.append(displayContainer)
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
    createdIngredientsArray = [...createdIngredientsArray, ingredientObj]
    ingredientDisplayer(ingredientObj)
    })
    //
    // CSS z-index
    // push
    mainContainerDiv.append(ingredientButton)
  })
  }

function ingredientDisplayer(ingredientObj) {
    let ingredientDiv = document.createElement("div")
    ingredientDiv.classList.add("ingredientDiv")
    //ingredientDiv.id = "ingredient"
  let ingredientImage = document.createElement("img")
  ingredientImage.src = ingredientObj["image_url"]
  ingredientImage.classList.add("ingredientImage")
  ingredientDiv.append(ingredientImage)
  displayContainer.prepend(ingredientDiv)
  }

// create
