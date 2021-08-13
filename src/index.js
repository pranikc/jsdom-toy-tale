// let addToy = false;
// const newToyForm = document.querySelector('form.add-toy-form')
// const toyCollectionDiv = document.querySelector('div#toy-collection')


// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });


// function renderOneToy(toy) {
//   const div = document.createElement('div')
//   div.classList.add('card')
//   div.dataset.id = toy.id

//   div.innerHTML = `
//           <h2>${toy.name}</h2>
//           <img src=${toy.image} class="toy-avatar" />
//           <p>${toy.likes} Likes </p>
//           <button class="like-btn" data-id=${toy.id}>Like <3</button>`


//   const toyCollectionDiv = document.querySelector('div#toy-collection')
//   toyCollectionDiv.append(div)
// }


// function renderAllToys() {
//   fetch('http://localhost:3000/toys')
//     .then(response => {
//       // console.log(response)
//       return response.json()
//     })
//     .then(toyArr => toyArr.forEach(renderOneToy))
// }





// newToyForm.addEventListener('submit', e => {
//   e.preventDefault()
//   // console.log(e.target)
//   // debugger

//   const nameInput = e.target.name.value
//   const imageInput = e.target.image.value

//   const configObject = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify({ name: nameInput, image: imageInput, likes: 0 })
//   }

//   fetch('http://localhost:3000/toys', configObject)
//     .then(response => {
//       console.log(response)
//       return response.json()
//     })
//     .then(toy => {
//       renderOneToy(toy)
//     })

// })


// toyCollectionDiv.addEventListener('click', e => {
//   if (e.target.classList.contains('like-btn')) {
//     const pLikesDisplay = e.target.previousElementSibling
//     const oldLikes = parseInt(pLikesDisplay.textContent)
//     const newLikes = oldLikes + 1

//     const configObject = {
//       method: "PATCH",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ likes: newLikes })
//     }

//     fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, configObject)
//       .then(response => response.json())
//       .then(data => {
//         pLikesDisplay.textContent = `${data.likes} Likes`
//       })
//   }
// })




// renderAllToys()

function renderOneToy(toy){
  const divCollection = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  div.classList.add('card')
  div.dataset.id = toy.id
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  divCollection.append(div)
}

function renderAllToys(){
  fetch ('http://localhost:3000/toys')
    .then(r => r.json())
    .then(toysArray => toysArray.forEach(renderOneToy))
}

// Add New Toy
// Add a new toy btn
const newToyBtn = document.querySelector('#new-toy-btn')
const form = document.querySelector('.container')
newToyBtn.addEventListener('click', () => {
  if(form.style.display === 'block'){
    form.style.display = 'none'
  }
  else{
    form.style.display = 'block'
  } 
})
// Submit
const submit = document.querySelector('form.add-toy-form')
submit.addEventListener('submit', evnt => {
  evnt.preventDefault()
  const nameIn = evnt.target.name.value
  const imageIn = evnt.target.image.value
  const toyObj = {
    name: nameIn,
    image: imageIn,
    likes: 0
  }

  submit.reset() 

  fetch('http://localhost:3000/toys'), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  }
    .then(response => response.json())
    .then(renderOneToy)


})

// Increase Likes
const divCollection = document.querySelector('#toy-collection')
divCollection.addEventListener('click', (event) => {
  let card = event.target.closest('div.card')
  let like = card.querySelector('p')
  currentLike = parseInt(like.textContent)
  newLike = currentLike + 1

  like.textContent = newLike + " Likes"

  fetch(`http://localhost:3000/toys/${card.dataset.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: newLike})
  })
      .then(r => r.json())
      .then(data => console.log(data))
})







renderAllToys()