const token = 'o0pJ9uzhCRFeCHA3KKCpWAiTw68oAR8C'
const FOOD_CHOICE_CLASSIC = "CLASSIC"
const FOOD_CHOICE_CHEESE = "CHEESE"
const FOOD_CHOICE_VG = "VG"

loadPage()

async function loadPage() {
    // Retrieve the user and redirect to the homePage if the user doesn't exist
    if(sessionStorage.user === undefined) {
        window.location.href = "index.html"
    }

    // !!!!! TODO Afficher un loader et cacher le contenu de la page !!!!!

    var user1 = await fetchUser(sessionStorage.user)
    if (user1 == null) {
        // TODO afficher une page d'erreur
    } else {
        var user2 = null
        // Get the linked user if it exist
        if (user1.linked_guest.length != 0) {
            user2 = await fetchUser(user1.linked_guest[0].id)
        }
        // !!!!! TODO cacher le loader et afficher le contenu de la page !!!!!
        fillThePage(user1, user2)
    }
}

async function fetchUser(userId) {
    const getUserApiUrl = `https://api.baserow.io/api/database/rows/table/302843/${userId}/?user_field_names=true`
    const getUserRequestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    try {
        const response = await fetch(getUserApiUrl, getUserRequestOptions)
        const result = await response.json()
        return result
    } catch(error) {
        console.log(error)
        return null
    }
}


function fillThePage(user1, user2) {
    console.log(user1.firstname)
    console.log(user1.lastname)
    if(user2 != null) {
        console.log(user2.firstname)
        console.log(user2.lastname)
    }

    fillHeader(user1, user2)
    fillPlanning(user1)
    fillMaps(user1)
    fillForm(user1)

    // on save
    const saveButton = document.getElementById("saveButton")
    saveButton.addEventListener("click", function(){
        saveChoices(user1)
    })
} 

function fillHeader(user1, user2) {
    const headerWelcomeLabel = document.getElementById("headerWelcomeLabel")
    if (user2 == null) {
        headerWelcomeLabel.textContent = `Bienvenue ${user1.firstname} ! Tu es invité au`
    } else {
        headerWelcomeLabel.textContent = `Bienvenue ${user1.firstname} et ${user2.firstname} ! Vous êtes invités au`
    }

    const headerDateLabel = document.getElementById("headerDateLabel")
    let dateString = ""
    if (user1.is_invited_friday) {
        if(user1.is_invited_sunday) {
            dateString += "14, "
        } else {
            dateString += "14 & "
        }
    }
    dateString += "15"
    if (user1.is_invited_sunday) {
        dateString += " & 16"
    }
    dateString += " février 2025"
    headerDateLabel.textContent = dateString
}

function fillPlanning(user) {
    const planningFridayBlock = document.getElementById("planningFridayBlock")
    planningFridayBlock.hidden = !user.is_invited_friday

    const planningSundayBlock = document.getElementById("planningSundayBlock")
    planningSundayBlock.hidden = !user.is_invited_sunday

    const planningSaturdayTitle = document.getElementById("planningSaturdayTitle")
    const planningSaturdayHour = document.getElementById("planningSaturdayHour")
    if(user.is_invited_full_saturday) {
        planningSaturdayTitle.textContent = "Cérémonie, Cocktail & Soirée"
        planningSaturdayHour.textContent = "16h00"
    } else {
        planningSaturdayTitle.textContent = "Cocktail"
        planningSaturdayHour.textContent = "18h00"
    }
}

function fillMaps(user) {
    const mapCityHallBlock = document.getElementById("mapCityHallBlock")
    mapCityHallBlock.hidden = !user.is_invited_friday

    const mapCastleTitle = document.getElementById("mapCastleTitle")
    if(user.is_invited_sunday) {
        mapCastleTitle.textContent = "Samedi & Dimanche" 
    } else {
        mapCastleTitle.textContent = "Samedi"
    }

    const mapHostelBlock = document.getElementById("mapHostelBlock")
    mapHostelBlock.hidden = !user.is_invited_sunday && !user.is_invited_full_saturday
}

function fillForm(user) {
    // show or hide checkbox
    const fridayCheckboxContainer = document.getElementById("fridayCheckboxContainer")
    const saturdayCocktailCheckboxContainer = document.getElementById("saturdayCocktailCheckboxContainer")
    const saturdayFullCheckboxContainer = document.getElementById("saturdayFullCheckboxContainer")
    const sundayCheckboxContainer = document.getElementById("sundayCheckboxContainer")
    fridayCheckboxContainer.hidden = !user.is_invited_friday
    saturdayCocktailCheckboxContainer.hidden = user.is_invited_full_saturday
    saturdayFullCheckboxContainer.hidden = !user.is_invited_full_saturday
    sundayCheckboxContainer.hidden = !user.is_invited_sunday

    // pre-fill checkbox
    const fridayCheckbox = document.getElementById("fridayCheckbox")
    const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
    const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
    const sundayCheckbox = document.getElementById("sundayCheckbox")
    fridayCheckbox.checked = user.join_friday
    saturdayCocktailCheckbox.checked = user.join_cocktail
    saturdayFullCheckbox.checked = user.join_full_saturday
    sundayCheckbox.checked = user.join_sunday

    // show or hide food section
    const formFoodBlock = document.getElementById("formFoodBlock")
    formFoodBlock.hidden = !user.is_invited_full_saturday

    // pre-fill food radio buttons
    const burgerClassic = document.getElementById("burgerClassic")
    const burgerCheese = document.getElementById("burgerCheese")
    const burgerVg = document.getElementById("burgerVg")
    burgerClassic.checked = user.food === FOOD_CHOICE_CLASSIC
    burgerCheese.checked = user.food === FOOD_CHOICE_CHEESE
    burgerVg.checked = user.food === FOOD_CHOICE_VG

    // enable or disabled save button + update user
    triggerSaveButtonDisabled(user)
    burgerClassic.onclick = function() { 
        triggerSaveButtonDisabled(user) 
    }
    burgerCheese.onclick = function() { 
        triggerSaveButtonDisabled(user)
    }
    burgerVg.onclick = function() { 
        triggerSaveButtonDisabled(user) 
    }
}

function triggerSaveButtonDisabled(user) {
    const saveButton = document.getElementById("saveButton")
    saveButton.disabled = user.is_invited_full_saturday && (burgerClassic.checked === false) && (burgerCheese.checked === false) && (burgerVg.checked === false)
}

function showSnackbar(text) {
    let snackbar = document.getElementById("snackbar")
    snackbar.textContent = text
    snackbar.className = "show"
    setTimeout(function() { 
        snackbar.className = snackbar.className.replace("show", "")
    }, 3000)
}

function saveChoices(user) {
    const fridayCheckbox = document.getElementById("fridayCheckbox")
    const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
    const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
    const sundayCheckbox = document.getElementById("sundayCheckbox")
    const burgerClassic = document.getElementById("burgerClassic")
    const burgerCheese = document.getElementById("burgerCheese")
    const burgerVg = document.getElementById("burgerVg")
    let foodString = ""
    if(burgerClassic.checked) {
        foodString = FOOD_CHOICE_CLASSIC
    }
    if(burgerCheese.checked) {
        foodString = FOOD_CHOICE_CHEESE
    }
    if(burgerVg.checked) {
        foodString = FOOD_CHOICE_VG
    }

    const apiUrl = `https://api.baserow.io/api/database/rows/table/302843/${user.id}/?user_field_names=true`

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            has_answered: true,
            join_friday: fridayCheckbox.checked,
            join_full_saturday: saturdayFullCheckbox.checked,
            join_sunday: sundayCheckbox.checked,
            join_cocktail: saturdayCocktailCheckbox.checked,
            food: foodString
        })
    }
    
    fetch(apiUrl, requestOptions)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            showSnackbar("Merci d'avoir répondu ! 2")
        })
        .catch(error => {
            console.log(error)
            showSnackbar(error)
        })
}