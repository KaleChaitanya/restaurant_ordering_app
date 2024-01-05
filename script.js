import { menuArray } from './data.js'

function getMenuArray() {
    let getHtml = ''
    for (let menu of menuArray) {
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
                            <button class="add" id="add" data-id="${menu.id}">+</button>
                        </div>
                    </div>
                    `
    }
    return getHtml;
}

document.addEventListener("click", function (e) {
    if (e.target.dataset.id) {
        handleItemBtnClick(e.target.dataset.id)
    }
})

function handleItemBtnClick(itemId) {
    const targetMenuObj = menuArray.filter(function (item) {
        return item.id == itemId
    })[0]
    console.log(targetMenuObj.name, targetMenuObj.price)
}

function render() {
    document.querySelector('.container').innerHTML = getMenuArray()
}

render()