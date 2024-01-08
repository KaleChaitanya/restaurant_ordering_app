import { menuArray } from './data.js'

const paymentModal = document.querySelector('.payment-modal')
const totalPriceNumber = document.querySelector('.total-price-number')
const buyItems = document.querySelector('.buy-items')
const userDetailsModal = document.querySelector('.user-details-modal')

document.addEventListener("click", function (e) {
  // add items
  if (e.target.dataset.addPizza) {
    displayBuyObjects(e.target.dataset.addPizza)
  }
  else if (e.target.dataset.addHamburger) {
    displayBuyObjects(e.target.dataset.addHamburger)
  }
  else if (e.target.dataset.addBeer) {
    displayBuyObjects(e.target.dataset.addBeer)
  }
  // remove items
  else if (e.target.dataset.removePizza) {
    removeItem(e.target.dataset.removePizza)
  }
  else if (e.target.dataset.removeHamburger) {
    removeItem(e.target.dataset.removeHamburger)
  }
  else if (e.target.dataset.removeBeer) {
    removeItem(e.target.dataset.removeBeer)
  }
})

const submitOrderBtn = document.querySelector('.submit-order-btn')
submitOrderBtn.addEventListener("click", function () {
  userDetailsModal.style.display = "flex"
})

let paymentForm = document.querySelector('#payment-form')
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const userName = document.querySelector('#user-name')
  const userCardNumber = document.querySelector('#user-card-number')
  const userCvv = document.querySelector("#user-cvv")
  const userMessage = document.querySelector('.user-message')
  userMessage.textContent = `Thanks,${userName.value}!Your order is on its way`
  userDetailsModal.style.display = 'none'
  paymentModal.style.display = 'none'
  userName.value = ''
  userCardNumber.value = ''
  userCvv.value = ''
})

let getHtml = ''
function getMenuArray() {
  menuArray.map(function (menu) {
    getHtml += `
                    <div class="menu-card">
                        <div class="left">
                            <p class="food-img">${menu.emoji}</p>
                        </div>
                        <div class="center">
                            <h3>${menu.name}</h3>    
                            <p>${menu.ingredients}</p>
                            <h5>$${menu.price}</h5>
                        </div>
                        <div class="right">
                            <button class="add" id="add" data-add-${menu.name}="${menu.id}">+</button>
                        </div>
                    </div>
                    `
  })
  return getHtml;
}

let buyItemsArray = []

function displayBuyObjects(itemId) {
  const targetItem = menuArray.filter(function (item) {
    return item.id == itemId
  })[0]
  buyItemsArray.push(targetItem)
  renderBuyItem(buyItemsArray)
}

function removeItem(itemId) {
  const targetItem = menuArray.filter(function (item) {
    return item.id == itemId;
  })[0]

  if (buyItemsArray.length > 1) {
    buyItemsArray.splice(JSON.parse(itemId), 1)
  } else {
    buyItemsArray.pop();
    paymentModal.style.display = 'none'
    totalPriceNumber.value = ''
  }
  renderBuyItem(buyItemsArray)
}

function renderBuyItem(array) {
  let itemsHTML = []
  let totalPrice = 0;
  let index = 0;

  array.forEach(function (item) {
    totalPrice += item.price
    totalPriceNumber.textContent = `$${totalPrice}`

    itemsHTML.push(`
    <div class="food-items" id="${index}">
      <div class="food-item">
        <h3 class="paid-item-name">${item.name}</h3>
        <button class="remove-btn" data-remove-${item.name}="${item.id}">remove</button>
        <h4 class="paid-item-price">$${item.price}</h4>
      </div>
    </div>
    `)
    index += 1
  })
  buyItems.innerHTML = itemsHTML.join('')
  paymentModal.style.display = 'flex'
}

function render() {
  document.querySelector('.menu-items').innerHTML = getMenuArray()
}
render()