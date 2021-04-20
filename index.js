let burgerContainerDiv = document.querySelector("#burgersContainer")
let mainContainerDiv = document.querySelector("#mainContainer")
currentBurger = {}

function burgerTnButtonMaker(burgerObj) {
    let burgerTnContainer = document.createElement("button")
    let testImage = document.createElement ("img")
    testImage.src = "data:image/jpeg;base64,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"
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
    burgerImage.src = "https://static.turbosquid.com/Preview/2019/08/29__12_56_07/burger.png8C9311AB-65CC-4CFA-84AE-532A435B3787Large.jpg"
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
      console.log(updatedBurgerObj)
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


fetch("http://localhost:3000/burgers")
  .then((r) => r.json())
  .then((burgersArray) => {
      console.log(burgersArray)
      burgersArray.forEach(burgerTnButtonMaker)

    });