// Helpers
const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// API calls info
const apiUrl = 'https://api.baserow.io/api/database/rows/table/302843/'
const token = 'o0pJ9uzhCRFeCHA3KKCpWAiTw68oAR8C'

// Views
let loginButton = document.getElementById("loginButton")
let nameField = document.getElementById("guestname")
let resultsLabel = document.getElementById("results")

// on nameField input
nameField.addEventListener("input", function() {
    loginButton.disabled = nameField.value === ""
})

// on loginButton click
loginButton.addEventListener("click", function(){
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

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
          }
    }

    resultsLabel.textContent = "chargement..."
    fetch(finalApiUrl, requestOptions)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            if(data.count === 0) {
                resultsLabel.textContent = "Nous n'avons trouvé aucun invité à ce nom. Si le problème persiste, contacte directement Maxime ou Justine 🙂"
            } else if (data.count > 1) {
                resultsLabel.textContent = "Trop d'invités correspondent à ce nom. Si le problème persiste, contacte directement Maxime ou Justine 🙂"
            } else {
                const user = data.results[0]
                sessionStorage.user = JSON.stringify(user)
                window.location.href = "main.html"
            }
        })
        .catch(error => {
            resultsLabel.textContent = error
        })
})