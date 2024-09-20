const token = 'o0pJ9uzhCRFeCHA3KKCpWAiTw68oAR8C'
const FOOD_CHOICE_CLASSIC = "CLASSIC"
const FOOD_CHOICE_CHEESE = "CHEESE"
const FOOD_CHOICE_VG = "VG"

loadPage()

async function loadPage() {
    document.getElementById("mainLoader").hidden = false
    document.getElementById("pageContent").hidden = true

    // Retrieve the user and redirect to the homePage if the user doesn't exist
    if(sessionStorage.user === undefined) {
        window.location.href = "index.html"
    }

    var user1 = await fetchUser(sessionStorage.user)
    if (user1 == null) {
        // TODO afficher une page d'erreur
    } else {
        var user2 = null
        // Get the linked user if it exist
        if (user1.linked_guest.length != 0) {
            user2 = await fetchUser(user1.linked_guest[0].id)
        }
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
    fillHeader(user1, user2)
    fillPlanning(user1)
    fillMaps(user1)
    fillForm(user1, user2)

    // on save
    const saveButton = document.getElementById("saveButton")
    saveButton.addEventListener("click", function(){
        saveChoices(user1, user2)
    })
    document.getElementById("mainLoader").hidden = true
    document.getElementById("pageContent").hidden = false
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

function fillForm(user1, user2) {
    if(user2 == null) {
        // hide the user2 section if needed
        const joinBlock2 = document.getElementById("joinBlock2")
        const formFoodBlock2 = document.getElementById("formFoodBlock2")
        joinBlock2.hidden = true
        formFoodBlock2.hidden = true
    } else {
        // impact the title and size if there's two guest
        const form = document.getElementById("form")
        form.style.height = "150%"
        const joinTitle = document.getElementById("joinTitle")
        const joinTitle2 = document.getElementById("joinTitle2")
        const foodChoiceTitle = document.getElementById("foodChoiceTitle")
        const foodChoiceTitle2 = document.getElementById("foodChoiceTitle2")
        joinTitle.textContent = `Est-que ${user1.firstname} vient ?`
        joinTitle2.textContent = `Est-que ${user2.firstname} vient ?`
        foodChoiceTitle.textContent = `Et ${user1.firstname} mangera quoi ?`
        foodChoiceTitle2.textContent = `Et ${user2.firstname} mangera quoi ?`
    }

    // show or hide checkbox
    const fridayCheckboxContainer = document.getElementById("fridayCheckboxContainer")
    const saturdayCocktailCheckboxContainer = document.getElementById("saturdayCocktailCheckboxContainer")
    const saturdayFullCheckboxContainer = document.getElementById("saturdayFullCheckboxContainer")
    const sundayCheckboxContainer = document.getElementById("sundayCheckboxContainer")
    fridayCheckboxContainer.hidden = !user1.is_invited_friday
    saturdayCocktailCheckboxContainer.hidden = user1.is_invited_full_saturday
    saturdayFullCheckboxContainer.hidden = !user1.is_invited_full_saturday
    sundayCheckboxContainer.hidden = !user1.is_invited_sunday

    if(user2 != null) {
        const fridayCheckboxContainer2 = document.getElementById("fridayCheckboxContainer2")
        const saturdayCocktailCheckboxContainer2 = document.getElementById("saturdayCocktailCheckboxContainer2")
        const saturdayFullCheckboxContainer2 = document.getElementById("saturdayFullCheckboxContainer2")
        const sundayCheckboxContainer2 = document.getElementById("sundayCheckboxContainer2")
        fridayCheckboxContainer2.hidden = !user2.is_invited_friday
        saturdayCocktailCheckboxContainer2.hidden = user2.is_invited_full_saturday
        saturdayFullCheckboxContainer2.hidden = !user2.is_invited_full_saturday
        sundayCheckboxContainer2.hidden = !user2.is_invited_sunday
    }

    // pre-fill checkbox
    const fridayCheckbox = document.getElementById("fridayCheckbox")
    const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
    const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
    const sundayCheckbox = document.getElementById("sundayCheckbox")
    fridayCheckbox.checked = user1.join_friday
    saturdayCocktailCheckbox.checked = user1.join_cocktail
    saturdayFullCheckbox.checked = user1.join_full_saturday
    sundayCheckbox.checked = user1.join_sunday

    if(user2 != null) {
        const fridayCheckbox2 = document.getElementById("fridayCheckbox2")
        const saturdayCocktailCheckbox2 = document.getElementById("saturdayCocktailCheckbox2")
        const saturdayFullCheckbox2 = document.getElementById("saturdayFullCheckbox2")
        const sundayCheckbox2 = document.getElementById("sundayCheckbox2")
        fridayCheckbox2.checked = user2.join_friday
        saturdayCocktailCheckbox2.checked = user2.join_cocktail
        saturdayFullCheckbox2.checked = user2.join_full_saturday
        sundayCheckbox2.checked = user2.join_sunday
    }

    // show or hide food section
    const formFoodBlock = document.getElementById("formFoodBlock")
    formFoodBlock.hidden = !user1.is_invited_full_saturday

    if(user2 != null) {
        const formFoodBlock2 = document.getElementById("formFoodBlock2")
        formFoodBlock2.hidden = !user2.is_invited_full_saturday
    }

    // pre-fill food radio buttons
    const burgerClassic = document.getElementById("burgerClassic")
    const burgerCheese = document.getElementById("burgerCheese")
    const burgerVg = document.getElementById("burgerVg")
    burgerClassic.checked = user1.food === FOOD_CHOICE_CLASSIC
    burgerCheese.checked = user1.food === FOOD_CHOICE_CHEESE
    burgerVg.checked = user1.food === FOOD_CHOICE_VG

    const burgerClassic2 = document.getElementById("burgerClassic2")
    const burgerCheese2 = document.getElementById("burgerCheese2")
    const burgerVg2 = document.getElementById("burgerVg2")
    if(user2 != null) {
        burgerClassic2.checked = user2.food === FOOD_CHOICE_CLASSIC
        burgerCheese2.checked = user2.food === FOOD_CHOICE_CHEESE
        burgerVg2.checked = user2.food === FOOD_CHOICE_VG
    }

    // enable or disabled save button + update user
    triggerSaveButtonDisabled(user1, user2)
    burgerClassic.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
    burgerCheese.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
    burgerVg.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
    burgerClassic2.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
    burgerCheese2.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
    burgerVg2.onclick = function() { 
        triggerSaveButtonDisabled(user1, user2) 
    }
}

function triggerSaveButtonDisabled(user1, user2) {
    const saveButton = document.getElementById("saveButton")
    saveButton.disabled = 
        (
            user1.is_invited_full_saturday 
            && (burgerClassic.checked === false) 
            && (burgerCheese.checked === false) 
            && (burgerVg.checked === false)
        )
        || (user2 != null &&
            user2.is_invited_full_saturday 
            && (burgerClassic2.checked === false) 
            && (burgerCheese2.checked === false) 
            && (burgerVg2.checked === false)
        )
}

function showSnackbar(text) {
    let snackbar = document.getElementById("snackbar")
    snackbar.textContent = text
    snackbar.className = "show"
    setTimeout(function() { 
        snackbar.className = snackbar.className.replace("show", "")
    }, 3000)
}

async function saveChoices(user1, user2) {
    const loader = document.getElementById("formLoader")
    loader.hidden = false
    // user1
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
    // user2
    const fridayCheckbox2 = document.getElementById("fridayCheckbox2")
    const saturdayCocktailCheckbox2 = document.getElementById("saturdayCocktailCheckbox2")
    const saturdayFullCheckbox2 = document.getElementById("saturdayFullCheckbox2")
    const sundayCheckbox2 = document.getElementById("sundayCheckbox2")
    const burgerClassic2 = document.getElementById("burgerClassic2")
    const burgerCheese2 = document.getElementById("burgerCheese2")
    const burgerVg2 = document.getElementById("burgerVg2")
    let foodString2 = ""
    if(burgerClassic2.checked) {
        foodString2 = FOOD_CHOICE_CLASSIC
    }
    if(burgerCheese2.checked) {
        foodString2 = FOOD_CHOICE_CHEESE
    }
    if(burgerVg2.checked) {
        foodString2 = FOOD_CHOICE_VG
    }

    try {
        // user1
        const apiUrl = `https://api.baserow.io/api/database/rows/table/302843/${user1.id}/?user_field_names=true`
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
        const response = await fetch(apiUrl, requestOptions)
        const result = await response.json()
        if(user2 != null) {
            const apiUrl2 = `https://api.baserow.io/api/database/rows/table/302843/${user2.id}/?user_field_names=true`
            const requestOptions2 = {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    has_answered: true,
                    join_friday: fridayCheckbox2.checked,
                    join_full_saturday: saturdayFullCheckbox2.checked,
                    join_sunday: sundayCheckbox2.checked,
                    join_cocktail: saturdayCocktailCheckbox2.checked,
                    food: foodString2
                })
            }
            const response = await fetch(apiUrl2, requestOptions2)
            const result = await response.json()
            showSnackbar("Merci d'avoir répondu !")
            loader.hidden = true
        } else {
            showSnackbar("Merci d'avoir répondu !")
            loader.hidden = true
        }
    } catch(error) {
        console.log(error)
        showSnackbar(error)
    }
}