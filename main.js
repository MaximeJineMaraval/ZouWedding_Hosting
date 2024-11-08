applySparklesBackground()
initNavBar()
loadPage()

async function loadPage() {
    // Show loading
    document.getElementById("welcomeLabelsContainer").hidden = true
    document.getElementById("scrollIndicator").hidden = true
    showLoader(true)

    // Retrieve the user and redirect to the homePage if the user doesn't exist
    if(sessionStorage.user === undefined) {
        window.location.href = "index.html"
    }

    // Get the user1
    var user1 = await fetchUser(sessionStorage.user)
    
    // If user is not found, return to the index
    if (user1 == null) {
         window.location.href = "index.html"
    } else {
        // Get the linked users if it exist
        var user2 = null
        var user3 = null
        if (user1.linked_guest.length >= 1) {
            user2 = await fetchUser(user1.linked_guest[0].id)
        }
        if (user1.linked_guest.length >= 2) {
            user3 = await fetchUser(user1.linked_guest[1].id)
        }
        // Fill the page
        fillThePage(user1, user2, user3)
    }
}

// Get the full user info from the ID
async function fetchUser(userId) {
    try {
        const token = await getToken()
        const getUserApiUrl = `https://api.baserow.io/api/database/rows/table/302843/${userId}/?user_field_names=true`
        const getUserRequestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
        const response = await fetch(getUserApiUrl, getUserRequestOptions)
        const result = await response.json()
        return result
    } catch(error) {
        console.log(error)
        return null
    }
}

// Fill the screen with the users
function fillThePage(user1, user2, user3) {
    // Fill the screen
    fillWelcome(user1, user2, user3)
    fillPlanning(user1)
    fillMaps(user1)
    fillForm(user1, user2, user3)

    // Set SaveButton click
    const saveButton = document.getElementById("saveButton")
    saveButton.addEventListener("click", function(){
        saveChoices(user1, user2, user3)
    })

    // Hide loader
    document.getElementById("welcomeLabelsContainer").hidden = false
    document.getElementById("scrollIndicator").hidden = false
    showLoader(false)
} 

// Get the BDD token
async function getToken() {
    const url = "https://europe-west9-zouwedding-424315.cloudfunctions.net/logJsVersion"
    const requestOptions = {
        method: 'GET'
    }
    const response = await fetch(url, requestOptions)
    const result = await response.text()
    return result
}

window.getToken = getToken