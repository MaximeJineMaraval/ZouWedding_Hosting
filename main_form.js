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
    if(user === null) {
        document.getElementById(containerId).hidden = true
    } else {
        // Fill name
        document.getElementById(nameId).textContent = user.firstname
        // Hide sunday if needed
        const sundayCheckBoxItem = document.getElementById(sundayItemId)
        if(user.is_invited_sunday) {
            sundayCheckBoxItem.hidden = false
        } else {
            sundayCheckBoxItem.hidden = true
            const checkboxContainer = document.getElementById(checkboxContainerId)
            checkboxContainer.style.paddingLeft = "22%"
            checkboxContainer.style.paddingRight = "22%"
        }
        // Prefill day checkboxes
        document.getElementById(fridayCheckboxId).checked = user.join_friday
        document.getElementById(saturdayCheckboxId).checked = user.join_cocktail || user.join_full_saturday
        document.getElementById(sundayCheckboxId).checked = user.join_sunday
        // Hide food section if needed
        if(!user.is_invited_full_saturday) {
            document.getElementById(foodSectionTitle).style.display = "none"
            document.getElementById(foodContainer).style.display = "none"
        }
        // Prefill food radios
        document.getElementById(foodClassicRadio).checked = user.food === SERVER_VALUE_CLASSIC
        document.getElementById(foodCheeseRadio).checked = user.food === SERVER_VALUE_CHEESE
        document.getElementById(foodVgRadio).checked = user.food === SERVER_VALUE_VG
    }
}


/*function fillForm(user1, user2, user3) {
    // Enable or disabled save button + update user
    let triggerFunction = function() { 
        triggerSaveButtonDisabled(user1, user2, user3) 
    }
    triggerFunction()
    burgerClassic.onclick = triggerFunction
    burgerCheese.onclick = triggerFunction
    burgerVg.onclick = triggerFunction
    burgerClassic2.onclick = triggerFunction
    burgerCheese2.onclick = triggerFunction
    burgerVg2.onclick = triggerFunction
    burgerClassic3.onclick = triggerFunction
    burgerCheese3.onclick = triggerFunction
    burgerVg3.onclick = triggerFunction
}*/

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

// Save the user choices
async function saveChoices(user1, user2, user3) {
    showLoader(true)
    // user1
    const fridayCheckbox = document.getElementById("fridayCheckbox")
    const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
    const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
    const sundayCheckbox = document.getElementById("sundayCheckbox")
    let foodString = ""
    if(document.getElementById("burgerClassic").checked) {
        foodString = FOOD_CHOICE_CLASSIC
    }
    if(document.getElementById("burgerCheese").checked) {
        foodString = FOOD_CHOICE_CHEESE
    }
    if(document.getElementById("burgerVg").checked) {
        foodString = FOOD_CHOICE_VG
    }
    // user2
    const fridayCheckbox2 = document.getElementById("fridayCheckbox2")
    const saturdayCocktailCheckbox2 = document.getElementById("saturdayCocktailCheckbox2")
    const saturdayFullCheckbox2 = document.getElementById("saturdayFullCheckbox2")
    const sundayCheckbox2 = document.getElementById("sundayCheckbox2")
    let foodString2 = ""
    if(document.getElementById("burgerClassic2").checked) {
        foodString2 = FOOD_CHOICE_CLASSIC
    }
    if(document.getElementById("burgerCheese2").checked) {
        foodString2 = FOOD_CHOICE_CHEESE
    }
    if(document.getElementById("burgerVg2").checked) {
        foodString2 = FOOD_CHOICE_VG
    }
    // user3
    const fridayCheckbox3 = document.getElementById("fridayCheckbox3")
    const saturdayCocktailCheckbox3 = document.getElementById("saturdayCocktailCheckbox3")
    const saturdayFullCheckbox3 = document.getElementById("saturdayFullCheckbox3")
    const sundayCheckbox3 = document.getElementById("sundayCheckbox3")
    let foodString3 = ""
    if(document.getElementById("burgerClassic3").checked) {
        foodString3 = FOOD_CHOICE_CLASSIC
    }
    if(document.getElementById("burgerCheese3").checked) {
        foodString3 = FOOD_CHOICE_CHEESE
    }
    if(document.getElementById("burgerVg3").checked) {
        foodString3 = FOOD_CHOICE_VG
    }

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
                join_friday: fridayCheckbox.checked,
                join_full_saturday: saturdayFullCheckbox.checked,
                join_sunday: sundayCheckbox.checked,
                join_cocktail: saturdayCocktailCheckbox.checked,
                food: foodString
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
                    join_friday: fridayCheckbox2.checked,
                    join_full_saturday: saturdayFullCheckbox2.checked,
                    join_sunday: sundayCheckbox2.checked,
                    join_cocktail: saturdayCocktailCheckbox2.checked,
                    food: foodString2
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
                    join_friday: fridayCheckbox3.checked,
                    join_full_saturday: saturdayFullCheckbox3.checked,
                    join_sunday: sundayCheckbox3.checked,
                    join_cocktail: saturdayCocktailCheckbox3.checked,
                    food: foodString3
                })
            }
            const response = await fetch(apiUrl3, requestOptions3)
            await response.json()
        }
        showSnackbar("Merci d'avoir répondu !")
        showLoader(false)
    } catch(error) {
        console.log(error)
        showSnackbar(error)
        showLoader(false)
    }
}

window.fillForm = fillForm
window.saveChoices = saveChoices