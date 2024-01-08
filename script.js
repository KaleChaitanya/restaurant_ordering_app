import { menuArray } from './data.js'

let itemArray = []
let paymentModal = document.querySelector('.payment-modal')
let totalPriceNumber = document.querySelector('.total-price-number')
let buyItems = document.querySelector('.buy-items')
let submitOrderBtn = document.querySelector('.submit-order-btn')
let userDetailsModal = document.querySelector('.user-details-modal')
let paymentForm = document.querySelector('#payment-form')

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

submitOrderBtn.addEventListener("click", function () {
  userDetailsModal.style.display = "flex"
})
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault()
  let userName = document.querySelector('#user-name')
  let userCardNumber = document.querySelector('#user-card-number')
  let userCvv = document.querySelector("#user-cvv")
  let userMessage = document.querySelector('.user-message')

  userMessage.textContent = `Thanks,${userName.value}!Your order is on its way`
  // alert(userName.value)
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



function handleItemBtnClick(itemId) {

  let renderHtml = ``

  const targetMenuObj = menuArray.filter(function (item) {
    return item.id == itemId
  })[0]

  itemArray.push({
    itemId: targetMenuObj.id,
    itemName: targetMenuObj.name,
    itemPrice: targetMenuObj.price
  })
  // console.log(itemArray)
  displayObjects()
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




{/* <h2>Your Oder</h2>
      <div class="order-div">
        <div class="order-name">
          <h4>Pizza</h4>
        </div>
        <div class="remove-order">
          <p>remove</p>
        </div>
        <div class="order-price">
          <h6>$14</h6>
        </div>
      </div>
      <div class="main-total">
        <div class="total">
          <div class="total-price-heading">
            <h3>Total price:</h3>
          </div>
          <div class="total-price">
            <h4>$26</h4>
          </div>
        </div>
        <button class="order-btn">Complete order</button>
      </div> */}