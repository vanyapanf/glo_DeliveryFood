const auth = () => {
    const buttonAuth = document.querySelector('.button-auth')
    const modalAuth = document.querySelector('.modal-auth')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name') 
    const closeAuth = document.querySelector('.close-auth')
    const logInForm = document.getElementById('logInForm')
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')
    const buttonCart = document.querySelector('.button-cart')

    const openAuth = () => {
        modalAuth.style.display = 'flex'
    }

    const login = (user) => {
        buttonAuth.style.display = 'none'

        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        userName.textContent = user.login
        buttonCart.style.display = 'flex'

        modalAuth.style.display = 'none'
    }

    const loginCancel = () => {
        inputLogin.value = ''
        inputPassword.value = ''
    }

    const logout = () => {
        buttonAuth.style.display = 'flex'

        buttonOut.style.display = 'none'
        userName.style.display = 'none'
        userName.textContent = ''
        buttonCart.style.display = 'none'

        localStorage.removeItem('user')
    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none'
    })

    buttonOut.addEventListener('click', () => {
        logout()
    })

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }

        if (user.login != '') {
            localStorage.setItem('user', JSON.stringify(user))
            login(user)
        }
        else{
            loginCancel()
        }
    })

    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')))
    }
}

auth()