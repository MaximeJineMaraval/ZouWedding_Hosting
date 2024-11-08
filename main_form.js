function fillForm(user1, user2, user3) {
    fillUser(
        user1, 
        "user1Container",
        "formUserName1",
        "formCheckboxContainer1",
        "checkboxItemSunday1",
        "checkboxFriday1",
        "checkboxSaturday1",
        "checkboxSunday1"
    )
    fillUser(
        user2, 
        "user2Container",
        "formUserName2",
        "formCheckboxContainer2",
        "checkboxItemSunday2",
        "checkboxFriday2",
        "checkboxSaturday2",
        "checkboxSunday2"
    )
    fillUser(
        user3, 
        "user3Container",
        "formUserName3",
        "formCheckboxContainer3",
        "checkboxItemSunday3",
        "checkboxFriday3",
        "checkboxSaturday3",
        "checkboxSunday3"
    )
}

function fillUser(
    user, 
    containerId,
    nameId, 
    checkboxContainerId, 
    sundayItemId, 
    fridayCheckboxId,
    saturdayCheckboxId,
    sundayCheckboxId
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
    }
}


/*function fillForm(user1, user2, user3) {
    // Change labels
    if (user3 == null) {
        document.getElementById("joinBlock3").hidden = true
        document.getElementById("formFoodBlock3").hidden = true
    } else {
        document.getElementById("form").style.height = "200%"
        document.getElementById("joinTitle3").textContent = `Est-que ${user3.firstname} vient ?`
        document.getElementById("foodChoiceTitle3").textContent = `Et ${user3.firstname} mangera quoi ?`
    }
    if (user2 == null) {
        document.getElementById("joinBlock2").hidden = true
        document.getElementById("formFoodBlock2").hidden = true
    } else {
        document.getElementById("joinTitle").textContent = `Est-que ${user1.firstname} vient ?`
        document.getElementById("joinTitle2").textContent = `Est-que ${user2.firstname} vient ?`
        document.getElementById("foodChoiceTitle").textContent = `Et ${user1.firstname} mangera quoi ?`
        document.getElementById("foodChoiceTitle2").textContent = `Et ${user2.firstname} mangera quoi ?`
    }
    if (user2 != null && user3 != null) {
        document.getElementById("form").style.height = "200%"
    } else if (user2 != null) {
        document.getElementById("form").style.height = "150%"
    }

    // Show or hide checkboxes
    document.getElementById("fridayCheckboxContainer").hidden = !user1.is_invited_friday
    document.getElementById("saturdayCocktailCheckboxContainer").hidden = user1.is_invited_full_saturday
    document.getElementById("saturdayFullCheckboxContainer").hidden = !user1.is_invited_full_saturday
    document.getElementById("sundayCheckboxContainer").hidden = !user1.is_invited_sunday
    if(user2 != null) {
        document.getElementById("fridayCheckboxContainer2").hidden = !user2.is_invited_friday
        document.getElementById("saturdayCocktailCheckboxContainer2").hidden = user2.is_invited_full_saturday
        document.getElementById("saturdayFullCheckboxContainer2").hidden = !user2.is_invited_full_saturday
        document.getElementById("sundayCheckboxContainer2").hidden = !user2.is_invited_sunday
    }
    if(user3 != null) {
        document.getElementById("fridayCheckboxContainer3").hidden = !user3.is_invited_friday
        document.getElementById("saturdayCocktailCheckboxContainer3").hidden = user3.is_invited_full_saturday
        document.getElementById("saturdayFullCheckboxContainer3").hidden = !user3.is_invited_full_saturday
        document.getElementById("sundayCheckboxContainer3").hidden = !user3.is_invited_sunday
    }

    // Pre-fill checkboxes
    document.getElementById("fridayCheckbox").checked = user1.join_friday
    document.getElementById("saturdayCocktailCheckbox").checked = user1.join_cocktail
    document.getElementById("saturdayFullCheckbox").checked = user1.join_full_saturday
    document.getElementById("sundayCheckbox").checked = user1.join_sunday
    if(user2 != null) {
        document.getElementById("fridayCheckbox2").checked = user2.join_friday
        document.getElementById("saturdayCocktailCheckbox2").checked = user2.join_cocktail
        document.getElementById("saturdayFullCheckbox2").checked = user2.join_full_saturday
        document.getElementById("sundayCheckbox2").checked = user2.join_sunday
    }
    if(user3 != null) {
        document.getElementById("fridayCheckbox3").checked = user3.join_friday
        document.getElementById("saturdayCocktailCheckbox3").checked = user3.join_cocktail
        document.getElementById("saturdayFullCheckbox3").checked = user3.join_full_saturday
        document.getElementById("sundayCheckbox3").checked = user3.join_sunday
    }

    // Show or hide food section
    document.getElementById("formFoodBlock").hidden = !user1.is_invited_full_saturday
    if(user2 != null) {
        document.getElementById("formFoodBlock2").hidden = !user2.is_invited_full_saturday
    }
    if(user3 != null) {
        document.getElementById("formFoodBlock3").hidden = !user3.is_invited_full_saturday
    }

    // Pre-fill food radio buttons
    document.getElementById("burgerClassic").checked = user1.food === FOOD_CHOICE_CLASSIC
    document.getElementById("burgerCheese").checked = user1.food === FOOD_CHOICE_CHEESE
    document.getElementById("burgerVg").checked = user1.food === FOOD_CHOICE_VG
    if(user2 != null) {
        document.getElementById("burgerClassic2").checked = user2.food === FOOD_CHOICE_CLASSIC
        document.getElementById("burgerCheese2").checked = user2.food === FOOD_CHOICE_CHEESE
        document.getElementById("burgerVg2").checked = user2.food === FOOD_CHOICE_VG
    }
    if(user3 != null) {
        document.getElementById("burgerClassic3").checked = user3.food === FOOD_CHOICE_CLASSIC
        document.getElementById("burgerCheese3").checked = user3.food === FOOD_CHOICE_CHEESE
        document.getElementById("burgerVg3").checked = user3.food === FOOD_CHOICE_VG
    }

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
        || (user3 != null &&
            user3.is_invited_full_saturday 
            && (burgerClassic3.checked === false) 
            && (burgerCheese3.checked === false) 
            && (burgerVg3.checked === false)
        )
}

// Save the user choices
async function saveChoices(user1, user2, user3) {
    const loader = document.getElementById("formLoader")
    loader.hidden = false
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
        loader.hidden = true
    } catch(error) {
        console.log(error)
        showSnackbar(error)
    }
}

window.fillForm = fillForm
window.saveChoices = saveChoices