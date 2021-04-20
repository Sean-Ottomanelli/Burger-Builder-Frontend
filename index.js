let burgerContainerDiv = document.querySelector("#burgersContainer")
let mainContainerDiv = document.querySelector("#mainContainer")
currentBurger = {}
// builtBurger = {}
let buildButton = document.querySelector("#buildButton")

let ingredientsArray = [
  {
    name: "Burger Bun Bottom", 
    image_url: "/Users/jennafritz/Development/Code/Module1/Burger-Builder-Phase-1-Project/Burger Bun Bottom.png"
  },
  {
    name: "Burger Bun Top",
    image_url: "/Users/jennafritz/Development/Code/Module1/Burger-Builder-Phase-1-Project/Burger Bun Top.png"
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
    testImage.src = "/Users/jennafritz/Development/Code/Module1/Burger-Builder-Phase-1-Project/Burger Full 1.png"
    testImage.style.width = "100px"
    let burgerTnTitle =document.createElement("h3")
    burgerTnTitle.innerText = burgerObj.burgerName
    let burgerTnCreator =document.createElement("h4")
    burgerTnCreator.innerText = burgerObj.username;
    burgerTnContainer.append(burgerTnTitle, burgerTnCreator, testImage)
    burgerContainerDiv.append(burgerTnContainer)

    burgerTnContainer.addEventListener("click", function() {
      currentBurger = burgerObj
      mainContainerDiv.innerText = ""
      let burgerTitle = document.createElement("h2")
        burgerTitle.innerText = burgerObj.burgerName
      let burgerCreator = document.createElement("h3")
        burgerCreator.innerText = burgerObj.username
      let burgerImage = document.createElement("img")
        burgerImage.src = "/Users/jennafritz/Development/Code/Module1/Burger-Builder-Phase-1-Project/Burger Full 1.png"
        burgerImage.style.width = "400px"
        let burgerDescr = document.createElement("p")
        burgerDescr.innerText = burgerObj.description
      let burgerIngredientsDiv = document.createElement("div")
      let burgerLikeButton = document.createElement("button")
        burgerLikeButton.innerText = "Like"
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
      })

      mainContainerDiv.append(burgerTitle, burgerCreator, burgerImage, burgerDescr, burgerIngredientsDiv, burgerLikeButton, burgerCommentDiv, burgerCommentForm)

    })
}

buildButton.addEventListener("click", function() {
  mainContainerDiv.innerText = ""
  let createdIngredientsArrayGlobal = createIngredientButton()
  console.log(createdIngredientsArrayGlobal)
})

function buildBurger(){

}

function createIngredientButton(){
  let createdIngredientsArray = []
  ingredientsArray.forEach(function(ingredientObj){
  let ingredientButton = document.createElement("button")
  ingredientButton.innerText = ingredientObj.name
  
  ingredientButton.addEventListener("click", function(){
    let ingredientImage = document.createElement("img")
    ingredientImage.src = ingredientObj["image_url"]
    ingredientImage.classList.add("ingredientImage")
    console.log(ingredientObj.name)
    mainContainerDiv.prepend(ingredientImage)
    createdIngredientsArray = [...createdIngredientsArray, ingredientObj]
    console.log(createdIngredientsArray)
    //
    // CSS z-index
    // push
  })
  mainContainerDiv.append(ingredientButton)
  return createdIngredientsArray
  })
}

// create
