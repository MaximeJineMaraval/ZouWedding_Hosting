// Helpers
const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// API calls info
const apiUrl = 'https://api.baserow.io/api/database/rows/table/302843/'

// Views
let loginButton = document.getElementById("loginButton")
let nameField = document.getElementById("guestname")

// on nameField input
nameField.addEventListener("input", function() {
    loginButton.disabled = nameField.value === ""
})

// on loginButton click
loginButton.addEventListener("click", async function(){
    showLoader(true)
    const treatedName = removeAccents(nameField.value)
    const names = treatedName.split(' ')

    const params = new URLSearchParams()
    params.append('user_field_names', true)
    if(names.length == 1) {
        params.append('filter__search__contains', names[0])
    } else {
        params.append('filter__search__contains', names[0]+names[1])
        params.append('filter__search__contains', names[1]+names[0])
    }
    params.append('filter_type', 'OR')

    const finalApiUrl = apiUrl + '?' + params.toString()


    const token = await getToken()
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
          }
    }

    fetch(finalApiUrl, requestOptions)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            showLoader(false)
            const suffixErrorLabel = "Vérifie que ton nom est complet et correctement écrit, et si le problème persiste, contacte directement Maxime ou Justine 🙂"
            if(data.count === 0) {
                showSnackbar(`Nous n'avons trouvé aucun invité à ce nom.\r\n${suffixErrorLabel}`)
            } else if (data.count > 1) {
                showSnackbar(`Trop d'invités correspondent à ce nom.\n${suffixErrorLabel}`)
            } else {
                const user = data.results[0]
                sessionStorage.user = user.id
                window.location.href = "main.html"
            }
        })
        .catch(error => {
            showLoader(false)
            showSnackbar(error)
        })
})

async function getToken() {
    const url = "https://europe-west9-zouwedding-424315.cloudfunctions.net/logJsVersion"
    const requestOptions = {
        method: 'GET'
    }
    const response = await fetch(url, requestOptions)
    const result = await response.text()
    return result
}

// Show snackBar at the screen's bottom
function showSnackbar(text) {
    let snackbar = document.getElementById("snackbar")
    snackbar.textContent = text
    snackbar.className = "show"
    setTimeout(function() { 
        snackbar.className = snackbar.className.replace("show", "")
    }, 5000)
}

function showLoader(show) {
    document.getElementById("loaderContainer").hidden = !show
}

showLoader(false)