const SERVER_VALUE_CLASSIC = "CLASSIC"
const SERVER_VALUE_CHEESE = "CHEESE"
const SERVER_VALUE_VG = "VG"

let burgerClassic1
let burgerClassic2
let burgerClassic3
let burgerCheese1
let burgerCheese2
let burgerCheese3
let burgerVg1
let burgerVg2
let burgerVg3

function fillForm(user1, user2, user3) {
    burgerClassic1 = document.getElementById("radioClassic1")
    burgerClassic2 = document.getElementById("radioClassic2")
    burgerClassic3 = document.getElementById("radioClassic3")
    burgerCheese1 = document.getElementById("radioCheese1")
    burgerCheese2 = document.getElementById("radioCheese2")
    burgerCheese3 = document.getElementById("radioCheese3")
    burgerVg1 = document.getElementById("radioVg1")
    burgerVg2 = document.getElementById("radioVg2")
    burgerVg3 = document.getElementById("radioVg3")


    if(user2 != null || user3 != null) {
        document.getElementById("formTitle").textContent = "Alors, vous venez ?"
    }
    fillUser(
        user1, 
        "user1Container",
        "formUserName1",
        "formDaysContainer1",
        "checkboxItemSunday1",
        "checkboxFriday1",
        "checkboxSaturday1",
        "checkboxSunday1",
        "foodSectionTitle1",
        "formFoodContainer1",
        "radioClassic1",
        "radioCheese1",
        "radioVg1"
    )
    fillUser(
        user2, 
        "user2Container",
        "formUserName2",
        "formDaysContainer2",
        "checkboxItemSunday2",
        "checkboxFriday2",
        "checkboxSaturday2",
        "checkboxSunday2",
        "foodSectionTitle2",
        "formFoodContainer2",
        "radioClassic2",
        "radioCheese2",
        "radioVg2"
    )
    fillUser(
        user3, 
        "user3Container",
        "formUserName3",
        "formDaysContainer3",
        "checkboxItemSunday3",
        "checkboxFriday3",
        "checkboxSaturday3",
        "checkboxSunday3",
        "foodSectionTitle3",
        "formFoodContainer3",
        "radioClassic3",
        "radioCheese3",
        "radioVg3"
    )

    // Enable or disabled save button
    let triggerFunction = function() { 
        triggerSaveButtonDisabled(user1, user2, user3) 
    }
    triggerFunction()
    burgerClassic1.onclick = triggerFunction
    burgerCheese2.onclick = triggerFunction
    burgerVg3.onclick = triggerFunction
    burgerClassic2.onclick = triggerFunction
    burgerCheese2.onclick = triggerFunction
    burgerVg2.onclick = triggerFunction
    burgerClassic3.onclick = triggerFunction
    burgerCheese3.onclick = triggerFunction
    burgerVg3.onclick = triggerFunction
}

function fillUser(
    user, 
    containerId,
    nameId, 
    checkboxContainerId, 
    sundayItemId, 
    fridayCheckboxId,
    saturdayCheckboxId,
    sundayCheckboxId,
    foodSectionTitle,
    foodContainer,
    foodClassicRadio,
    foodCheeseRadio,
    foodVgRadio
) {
    if(user != null) {
        document.getElementById(containerId).hidden = false
        // Fill name
        document.getElementById(nameId).textContent = user.firstname
        // Hide sunday if needed
        const sundayCheckBoxItem = document.getElementById(sundayItemId)
        if(user.is_invited_sunday) {
            sundayCheckBoxItem.hidden = false
        } else {
            sundayCheckBoxItem.hidden = true
            const checkboxContainer = document.getElementById(checkboxContainerId)
            if(window.screen.width <= 600) {
                checkboxContainer.style.paddingLeft = "15%"
                checkboxContainer.style.paddingRight = "15%"
            } else {
                checkboxContainer.style.paddingLeft = "22%"
                checkboxContainer.style.paddingRight = "22%"
            }
        }
        // Prefill day checkboxes
        document.getElementById(fridayCheckboxId).checked = user.join_friday
        document.getElementById(saturdayCheckboxId).checked = user.join_cocktail || user.join_full_saturday
        document.getElementById(sundayCheckboxId).checked = user.join_sunday
        // Hide food section if needed
        document.getElementById(saturdayCheckboxId).onclick = function () {
            updateFoodSectionVisibility(user, foodSectionTitle, foodContainer, saturdayCheckboxId)
        }
        updateFoodSectionVisibility(user, foodSectionTitle, foodContainer, saturdayCheckboxId)
        // Prefill food radios
        document.getElementById(foodClassicRadio).checked = user.food === SERVER_VALUE_CLASSIC
        document.getElementById(foodCheeseRadio).checked = user.food === SERVER_VALUE_CHEESE
        document.getElementById(foodVgRadio).checked = user.food === SERVER_VALUE_VG
        // Prefill comment section
        const formComments = document.getElementById("formComments")
        if(user.is_invited_to_sleep) {
            formComments.placeholder = "Précise nous si tu dors avec nous sur place durant le weekend 🏰😴❤️\nTu peux aussi ajouter un commentaire ou juste lous laisser un petit mot"
        } else {
            formComments.placeholder = "Tu veux ajouter une précision, ou juste nous écrire un petit mot ? C'est par ici !"
        }
        formComments.value = user.comment
    }
}

function triggerSaveButtonDisabled(user1, user2, user3) {
    const saveButton = document.getElementById("saveButton")
    saveButton.disabled = 
        (
            user1.is_invited_full_saturday 
            && (burgerClassic1.checked === false) 
            && (burgerCheese1.checked === false) 
            && (burgerVg1.checked === false)
        )
        || (user2 != null &&
            user2.is_invited_full_saturday 
            && (burgerClassic2.checked === false) 
            && (burgerCheese2.checked === false) 
            && (burgerVg2.checked === false)
        )
        || (user3 != null &&
            user3.is_invited_full_saturday 
            && (burgerClassic3.checked === false) 
            && (burgerCheese3.checked === false) 
            && (burgerVg3.checked === false)
        )
}

// Manage food section visibility
function updateFoodSectionVisibility(user, foodSectionTitle, foodContainer, saturdayCheckbox) {
    if(user.is_invited_full_saturday && document.getElementById(saturdayCheckbox).checked) {
        document.getElementById(foodSectionTitle).style.display = "block"
        document.getElementById(foodContainer).style.display = "flex"
    } else {
        document.getElementById(foodSectionTitle).style.display = "none"
        document.getElementById(foodContainer).style.display = "none"
    }
}

// Save the user choices
async function saveChoices(user1, user2, user3) {
    showLoader(true)
    // user1
    const joinFriday1 = document.getElementById("checkboxFriday1").checked
    const joinSunday1 = document.getElementById("checkboxSunday1").checked
    const joinCocktail1 = document.getElementById("checkboxSaturday1").checked
    const joinFullSaturday1 = document.getElementById("checkboxSaturday1").checked && user1.is_invited_full_saturday
    let foodString1 = ""
    if(burgerClassic1.checked && joinFullSaturday1) {
        foodString1 = SERVER_VALUE_CLASSIC
    }
    if(burgerCheese1.checked && joinFullSaturday1) {
        foodString1 = SERVER_VALUE_CHEESE
    }
    if(burgerVg1.checked && joinFullSaturday1) {
        foodString1 = SERVER_VALUE_VG
    }
    // user2
    const joinFriday2 = document.getElementById("checkboxFriday2").checked
    const joinSunday2 = document.getElementById("checkboxSunday2").checked
    const joinCocktail2 = document.getElementById("checkboxSaturday2").checked
    const joinFullSaturday2 = document.getElementById("checkboxSaturday2").checked && user2.is_invited_full_saturday
    let foodString2 = ""
    if(burgerClassic2.checked && joinFullSaturday2) {
        foodString2 = SERVER_VALUE_CLASSIC
    }
    if(burgerCheese2.checked && joinFullSaturday2) {
        foodString2 = SERVER_VALUE_CHEESE
    }
    if(burgerVg2.checked && joinFullSaturday2) {
        foodString2 = SERVER_VALUE_VG
    }
    // user3
    const joinFriday3 = document.getElementById("checkboxFriday3").checked
    const joinSunday3 = document.getElementById("checkboxSunday3").checked
    const joinCocktail3 = document.getElementById("checkboxSaturday3").checked
    const joinFullSaturday3 = document.getElementById("checkboxSaturday3").checked && user3.is_invited_full_saturday
    let foodString3 = ""
    if(burgerClassic3.checked && joinFullSaturday3) {
        foodString3 = SERVER_VALUE_CLASSIC
    }
    if(burgerCheese3.checked && joinFullSaturday3) {
        foodString3 = SERVER_VALUE_CHEESE
    }
    if(burgerVg3.checked && joinFullSaturday3) {
        foodString3 = SERVER_VALUE_VG
    }
    // comment
    const formComment = document.getElementById("formComments").value

    // api calls
    try {
        const token = await getToken()
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
                join_friday: joinFriday1,
                join_full_saturday: joinFullSaturday1,
                join_sunday: joinSunday1,
                join_cocktail: joinCocktail1,
                food: foodString1,
                comment: formComment
            })
        }
        const response = await fetch(apiUrl, requestOptions)
        await response.json()
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
                    join_friday: joinFriday2,
                    join_full_saturday: joinFullSaturday2,
                    join_sunday: joinSunday2,
                    join_cocktail: joinCocktail2,
                    food: foodString2,
                    comment: formComment
                })
            }
            const response = await fetch(apiUrl2, requestOptions2)
            await response.json()
        }
        if(user3 != null) {
            const apiUrl3 = `https://api.baserow.io/api/database/rows/table/302843/${user3.id}/?user_field_names=true`
            const requestOptions3 = {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    has_answered: true,
                    join_friday: joinFriday3,
                    join_full_saturday: joinFullSaturday3,
                    join_sunday: joinSunday3,
                    join_cocktail: joinCocktail3,
                    food: foodString3,
                    comment: formComment
                })
            }
            const response = await fetch(apiUrl3, requestOptions3)
            await response.json()
        }
        showSnackbar("✨ Merci d'avoir répondu ! ✨")
        showLoader(false)
    } catch(error) {
        console.log(error)
        showSnackbar(error)
        showLoader(false)
    }
}

window.fillForm = fillForm
window.saveChoices = saveChoices