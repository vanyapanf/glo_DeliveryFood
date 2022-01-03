const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const body = modalCart.querySelector('.modal-body')
    const buttonSend = modalCart.querySelector('.button-primary')
    const buttonCancel = modalCart.querySelector('.clear-cart')
    const priceTag = modalCart.querySelector('.modal-pricetag')

    const resetCart = () => {
        body.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }

    const getPrice = () => {
        var price = 0
        if (localStorage.getItem('cart')) {
            const cartArray = JSON.parse(localStorage.getItem('cart'))

            price = cartArray.reduce(function(total, item){
                return total + item.price*item.count
            }, 0)
        }

        priceTag.textContent = price + ' ₽'
    }

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
        getPrice()
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id && item.count > 0) {
                item.count--
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
        getPrice()
    }

    const renderItems = (data) => {
        body.innerHTML = ''

        data.forEach(cartItem => {
            const cartElem = document.createElement('div')

            cartElem.classList.add('food-row')

            cartElem.innerHTML = `
                <span class="food-name">${cartItem.name}</span>
                <strong class="food-price">${cartItem.price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${cartItem.id}">-</button>
                    <span class="counter">${cartItem.count}</span>
                    <button class="counter-button btn-inc" data-index="${cartItem.id}">+</button>
                </div>
            `

            body.append(cartElem)
        })
    }

    body.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.classList.contains('btn-inc')) {
            incrementCount(event.target.dataset.index)
        }
        else if (event.target.classList.contains('btn-dec')) {
            decrementCount(event.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart()
            }
        })
        .catch(error => {
            console.error(error)
        })
    })

    buttonCancel.addEventListener('click', () => {
        resetCart()
    })

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }
        getPrice()
        modalCart.classList.add('is-open')
    })

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}

cart()