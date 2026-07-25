// Vars 
var addContactBtn = document.querySelector(".addContactBtn")
var dataFormOuter = document.querySelector(".data-form-outer")
var closeBtn = document.querySelector(".close-btn")
var cancelBtn = document.querySelector(".cancel-btn")
var saveBtn = document.querySelector(".save-btn")
var changePhoto = document.querySelector("#changePhoto")
var fullName = document.querySelector("#fullName")
var phoneNum = document.querySelector("#phoneNum")
var email = document.querySelector("#email")
var address = document.querySelector("#address")
var group = document.querySelector("#group")
var notes = document.querySelector("#notes")
var isFavorite = document.querySelector("#isFavorite")
var isEmergency = document.querySelector("#isEmergency")
var contactCards = document.querySelector(".contact-cards")
var emptyContactCard = document.querySelector("#emptyContactCard")
var iconOfName = document.querySelector("#iconOfName")
var imgChangePhoto = document.querySelector("img.change-photo-icon")
var divChangePhoto = document.querySelector("div.change-photo-icon")
var starIcon = document.querySelector(".star-icon")
var heartIcon = document.querySelector(".heart-icon")
var totalCard = document.querySelector("#totalCard")
var favoriteCardsCount = document.querySelector("#favoriteCardsCount")
var emergencyCardsCount = document.querySelector("#emergencyCardsCount")
var allCard = document.querySelector("#allCard")
var emptyFav = document.querySelector("#emptyFav")
var favContainer = document.querySelector("#favContainer")
var emptyEmr = document.querySelector("#emptyEmr")
var emrContainer = document.querySelector("#emrContainer")
var avatarPath = document.querySelector("#avatarPath")
var formImg = document.querySelector("#formImg")
var searchInput = document.querySelector("#searchInput")
var nameInValid = document.querySelector("#nameInValid")
var phoneInValid = document.querySelector("#phoneInValid")
var emailInValid = document.querySelector("#emailInValid")
var form = document.forms[0]
var updateIndex = null

// BG Array 
bgArr = ["bg-1" , "bg-2" , "bg-3" , "bg-4" , "bg-5" , "bg-6" , "bg-7" , "bg-8" , "bg-9" , "bg-10" ]

// Toggle Form Function
function toggleFormModal() {
    dataFormOuter.classList.toggle("d-none")
}

addContactBtn.addEventListener("click" , function () {
    toggleFormModal()
})

closeBtn.addEventListener("click" , function () {
    toggleFormModal()
    clearForm()
})

cancelBtn.addEventListener("click" , function () {
    toggleFormModal()
    clearForm()
})

// Form Submit Function 
form.addEventListener("submit" , function (e) {
    e.preventDefault()
})

// Create Cards Array 
var cardsArr = JSON.parse(localStorage.getItem("cardsArr")) || []
displayCards()

// Create Cards Function 
function createCards() {
        var cardInputs = {
        name : fullName.value ,
        phone : phoneNum.value ,
        email : email.value ,
        address : address.value ,
        group : group.value ,
        notes : notes.value ,
        favorite : isFavorite.checked ,
        emergency : isEmergency.checked ,
        img : avatarPath.value
    }
    cardsArr.push(cardInputs)
    localStorage.setItem("cardsArr" , JSON.stringify(cardsArr))

    displayCards()
    toggleFormModal()
    clearForm()

    Swal.fire({
    title: "Added!",
    text: "Contact has been added successfully.",
    icon: "success" ,
    showConfirmButton: false ,
    timer: 1000
});
}

// Change Img Function
function changeImg() {
    var imgPath = changePhoto.files[0].name
    if(!imgPath) return
    avatarPath.value = imgPath
    formImg.innerHTML = `
    <img src="./assets/images/${imgPath}" alt="avatar" class="change-photo-icon object-fit-cover rounded-5">
    `
}
changePhoto.addEventListener("change" , changeImg)

// Clear Function
function clearForm() {
    fullName.value = ""
    phoneNum.value = ""
    email.value = ""
    address.value = ""
    group.value = "Select a group"
    notes.value = ""
    isFavorite.checked = false
    isEmergency.checked = false
    updateIndex = null
    avatarPath.value = ""
    formImg.innerHTML = `
        <div
            class="change-photo-icon text-white fw-bold lh-3xl fs-30 rounded-circle d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-user"></i>
        </div>
        `;
        nameInValid.classList.add("d-none")
        phoneInValid.classList.add("d-none")
        emailInValid.classList.add("d-none")
        fullName.classList.remove("invalid-border")
        phoneNum.classList.remove("invalid-border")
        email.classList.remove("invalid-border")
}

// Display Function
function displayCards() {
    var box = ""

    if (cardsArr.length === 0) {
        emptyContactCard.classList.remove("d-none")
        contactCards.innerHTML = ""
        return;
    } else {
        emptyContactCard.classList.add("d-none")

        for(i = 0 ; i < cardsArr.length ; i++ ) {
            box += `
            <div class="col-sm-6 col-12">
            <div
                class="contact-card bg-white rounded-4 overflow-hidden d-flex flex-column h-100">
                <div class="px-3 pt-3 pb-12">
                    <!-- Top  -->
                    <div class="d-flex gap-14">
                        <!-- Top Icon  -->
                        <div
                            class="position-relative flex-shrink-0">

                            ${renderAvatar(cardsArr[i].name , cardsArr[i].img)}

                                <div
                                class="star-icon star-heart position-absolute bg-gold-3-color rounded-circle d-flex align-items-center justify-content-center ${cardsArr[i].favorite ? "" : "d-none"}">
                                <i
                                    class="fa-solid fa-star text-white fs-8"></i>
                                </div>
                                
                                <div
                                class="heart-icon star-heart position-absolute bg-red-4-color rounded-circle d-flex align-items-center justify-content-center ${cardsArr[i].emergency ? "" : "d-none"}">
                                <i
                                    class="fa-solid fa-heart-pulse text-white fs-8"></i>
                                </div>
                        </div>
    
                        <!-- Top Data  -->
                        <div class="pt-1">
                            <h3
                                class="fw-semibold color-black fs-16 lh-base m-0">${cardsArr[i].name}</h3>
                            <div
                                class="d-flex align-items-center gap-2 mt-1">
    
                                <div
                                    class="card-phone-icon d-flex align-items-center justify-content-center bg-light-blue-color brr-6">
                                    <i
                                        class="fa-solid fa-phone color-blue-3 fs-9"></i>
                                </div>
    
                                <span
                                    class="color-grey fs-14 lh-small">${cardsArr[i].phone}</span>
                            </div>
                        </div>
                    </div>
    
                    <!-- Mid 1 -->
                    <div class="mt-12">

                        ${cardsArr[i].email ? 
                            `
                            <div
                                class="d-flex align-items-center gap-10 mb-2">
                                <div
                                    class="card-mid-icon d-flex align-items-center justify-content-center rounded-3 bg-light-13-color">
                                    <i
                                        class="fa-solid fa-envelope color-vio fs-10"></i>
                                </div>
                                <span
                                    class="color-dark-grey fs-14 lh-small">${cardsArr[i].email}</span>
                            </div>
                            `
                            : ""
                        }
    
                        ${cardsArr[i].address ?
                            `
                            <div
                                class="d-flex align-items-center gap-10">
                                <div
                                    class="card-mid-icon d-flex align-items-center justify-content-center rounded-3 bg-light-blue-2-color">
                                    <i
                                        class="fa-solid fa-location-dot color-green-3 fs-10"></i>
                                </div>
                                <span
                                    class="color-dark-grey fs-14 lh-small">${cardsArr[i].address}</span>
                            </div>
                            `
                            : ""
                        }
                    </div>
    
                    <!-- Mid 2 -->
                    <div
                        class="d-flex gap-6 flex-wrap mt-12">
    
                        <span
                            class="family text-capitalize color-blue-2 fw-medium fs-11 py-1 px-2 bg-light-blue-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "family" ? "" : "d-none"}">family</span>
    
                        <span
                            class="friends text-capitalize color-green fw-medium fs-11 py-1 px-2 bg-light-green-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "friends" ? "" : "d-none"}">friends</span>
    
                        <span
                            class="work text-capitalize color-vio-3 fw-medium fs-11 py-1 px-2 bg-light-14-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "work" ? "" : "d-none"}">work</span>
    
                        <span
                            class="school text-capitalize color-brown fw-medium fs-11 py-1 px-2 bg-light-15-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "school" ? "" : "d-none"}">school</span>
    
                        <span
                            class="other text-capitalize color-grey-2 fw-medium fs-11 py-1 px-2 bg-light-11-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "other" ? "" : "d-none"}">other</span>
    
                        <span
                            class="emergency text-capitalize color-red-5 fw-medium fs-11 py-1 px-2 bg-light-16-color brr-6 d-inline-flex align-items-center gap-1 ${cardsArr[i].emergency ? "" : "d-none"}">
                            <i
                                class="fa-solid fa-heart-pulse fs-10"></i>
                            Emergency
                        </span>
                    </div>
                </div>
    
                <!-- Footer  -->
                <div
                    class="card-footer py-10 px-3 bg-light-7-color bg-opacity-75 d-flex align-items-center justify-content-between mt-auto">
    
                    <div
                        class="d-flex align-items-center gap-6">
    
                        <a href="tel:${cardsArr[i].phone}"
                            title="Call"
                            class="card-phone-mail-link card-phone-link color-green-3 bg-light-green-2-color rounded-3 d-flex justify-content-center align-items-center">
                            <i
                                class="fa-solid fa-phone fs-14"></i>
                        </a>
    
                        <a
                            href="mailto:${cardsArr[i].email}"
                            title="Call"
                            class="card-phone-mail-link card-phone-link color-vio bg-light-17-color rounded-3 d-flex justify-content-center align-items-center">
                            <i
                                class="fa-solid fa-envelope fs-14"></i>
                        </a>
                    </div>
    
                    <div
                        class="d-flex align-items-center gap-6">
                        <button
                            class="card-btn card-star color-grey-3 bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0 ${cardsArr[i].favorite ? "d-none" : ""}" onclick="toggleStarBtn(${i})">
                            <i
                                class="fa-regular fa-star"></i>
                        </button>
                        <button
                            class="card-btn card-star-after color-gold-3 bg-light-6-color rounded-3 d-flex align-items-center justify-content-center border-0 ${!cardsArr[i].favorite ? "d-none" : "d-flex"}" onclick="toggleStarBtn(${i})">
                            <i
                                class="fa-solid fa-star"></i>
                        </button>

                        <button
                            class="card-btn card-heart color-grey-3 bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0 ${cardsArr[i].emergency ? "d-none" : ""}" onclick="toggleHeartBtn(${i})">
                            <i
                                class="fa-regular fa-heart"></i>
                        </button>
                        <button
                            class="card-btn card-heart-after color-red-4 bg-light-16-color rounded-3 d-flex align-items-center justify-content-center border-0 ${!cardsArr[i].emergency ? "d-none" : ""}" onclick="toggleHeartBtn(${i})">
                            <i
                                class="fa-solid fa-heart-pulse"></i>
                        </button>
    
                        <button
                            class="card-btn card-edit color-grey bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0" onclick="updateCard(${i})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
    
                        <button
                            class="card-btn card-remove color-grey bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0" onclick="removeCard(${i})">
                            <i
                                class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
            `
        }
        contactCards.innerHTML = box
    }
    
    countCards()
    addFavList()
    addEmrList()
}

// Remove Function
function removeCard(i) {
    Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${cardsArr[i].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!"
}).then((result) => {
    if (result.isConfirmed) {
        
        cardsArr.splice(i , 1)
        localStorage.setItem("cardsArr" , JSON.stringify(cardsArr))
        countCards()
        addFavList()
        addEmrList()
        displayCards()
        Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        showConfirmButton: false ,
        timer: 1000
        });
    }
});
}

// Update Function
function updateCard(i) {
    updateIndex = i
    toggleFormModal()

    fullName.value = cardsArr[i].name
    phoneNum.value = cardsArr[i].phone
    email.value = cardsArr[i].email
    address.value = cardsArr[i].address
    group.value = cardsArr[i].group
    notes.value = cardsArr[i].notes
    isFavorite.checked = cardsArr[i].favorite
    isEmergency.checked = cardsArr[i].emergency
    avatarPath.value = cardsArr[i].img || ""

            if (cardsArr[i].img) {
            formImg.innerHTML = `
                <img src="./assets/images/${cardsArr[i].img}" alt="avatar" class="change-photo-icon object-fit-cover rounded-5">
                `
        }else if(cardsArr[i].name){
            var finalName = cardsArr[i].name.trim().split(" ").map((w)=> w[0].toUpperCase()).join("")
            formImg.innerHTML = `
                <div
                    class="change-photo-icon text-white fw-bold lh-3xl fs-30 rounded-circle d-flex justify-content-center align-items-center">
                    ${finalName}
                </div>
                `
        } else {
            formImg.innerHTML = `
                <div
                    class="change-photo-icon text-white fw-bold lh-3xl fs-30 rounded-circle d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-user"></i>
                </div>
                `
        }
}

function submitUpdateCard() {
        if(updateIndex === null) return

        cardsArr[updateIndex].name = fullName.value
        cardsArr[updateIndex].phone = phoneNum.value
        cardsArr[updateIndex].email = email.value
        cardsArr[updateIndex].address = address.value
        cardsArr[updateIndex].group = group.value
        cardsArr[updateIndex].notes = notes.value
        cardsArr[updateIndex].favorite = isFavorite.checked
        cardsArr[updateIndex].emergency = isEmergency.checked
        cardsArr[updateIndex].img = avatarPath.value;

        localStorage.setItem("cardsArr" , JSON.stringify(cardsArr))
        displayCards()
        clearForm()
        toggleFormModal()
    }

    // Save Btn 
saveBtn.addEventListener("click" , function(e) {
    e.preventDefault()

    if (fullName.value == "") {
        return Swal.fire({
        title: "Missing Name",
        text: "Please enter a name for the contact!",
        icon: "error"
        });
        
    }else if(phoneNum.value == "") {
        return Swal.fire({
        title: "Missing Phone",
        text: "Please enter a phone number!",
        icon: "error"
        });
    }

    for (i = 0; i < cardsArr.length; i++) {
        if (i === updateIndex) continue;
        
        if (phoneNum.value == cardsArr[i].phone) {
        return Swal.fire({
        title: "Duplicate Phone Number",
        text: "A contact with this phone number already exists: Brett Barton",
        icon: "error"
        });
        }
    }

    if (!validateName()) {
        return Swal.fire({
        title: "Invalid Name",
        text: "Name should contain only letters and spaces (2-50 characters)",
        icon: "error"
        });
    }else if (!validatePhone()) {
        return Swal.fire({
        title: "Invalid Phone",
        text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
        icon: "error"
        });
    }else if (email.value && !validateEmail()) {
        return Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error"
        });
    }

    if(updateIndex === null) {
        createCards()
    } else {
        submitUpdateCard()
        Swal.fire({
        title: "Updated!",
        text: "Contact has been updated successfully.",
        icon: "success" ,
        showConfirmButton: false ,
        timer: 1000
});
    }
})

// Cont Cards Function
function countCards() {
    totalCard.innerHTML= cardsArr.length
    allCard.innerHTML= cardsArr.length

    var favoriteCount = 0
    var emergencyCount = 0
    for(i = 0 ; i < cardsArr.length ; i++) {

        if(cardsArr[i].favorite) {
            favoriteCount ++
        }
        
        if(cardsArr[i].emergency) {
            emergencyCount ++
        }
    }

    favoriteCardsCount.innerHTML = favoriteCount
    emergencyCardsCount.innerHTML = emergencyCount
}

// Fav List Function
function addFavList() {
    favContainer.innerHTML = ""
    var hasFav = false
    for(i = 0 ; i < cardsArr.length ; i++) {
        var contact = cardsArr[i]
        if (contact.favorite) {
            hasFav = true
            var contactHTML = `
            <div class="col">
                <div
                    class="favorite-list-item p-10 bg-light-7-color brr-12 d-flex gap-12 align-items-center">
    
                    ${renderAvatarFavEm(contact.name , contact.img)}
    
                    <div class="flex-grow-1">
                        <h4
                            class="color-black fw-medium fs-14 fs-xl-11 lh-small m-0">${contact.name}</h4>
                        <p
                            class="m-0 color-grey fs-12 fs-xl-10 lh-x-small">${contact.phone}</p>
                    </div>
    
                    <a href="tel:${contact.phone}"
                        class="favorite-phone-link color-green-3 bg-light-blue-2-color rounded-3 d-flex justify-content-center align-items-center flex-shrink-0">
                        <i
                            class="fa-solid fa-phone fs-12 fs-xl-8"></i>
                    </a>
                </div>
            </div>
            `
            favContainer.innerHTML += contactHTML
        }
    }

    if(hasFav === false) {
        emptyFav.classList.remove("d-none")
    }else {
        emptyFav.classList.add("d-none")
    }
}

// Emr List Function
function addEmrList() {
    emrContainer.innerHTML = ""
    var hasEmr = false
    for(i = 0 ; i < cardsArr.length ; i++) {
        var contact = cardsArr[i]
        if (contact.emergency) {
            hasEmr = true
            var contactEmrtHTML = `
            <div class="col">
                <div
                    class="emergency-list-item p-10 bg-light-7-color brr-12 d-flex gap-12 align-items-center">
                    
                    ${renderAvatarFavEm(contact.name , contact.img)}
    
                    <div class="flex-grow-1">
                        <h4
                            class="color-black fw-medium fs-14 fs-xl-11 lh-small m-0">${contact.name}</h4>
                        <p
                            class="m-0 color-grey fs-12 fs-xl-10 lh-x-small">${contact.phone}</p>
                    </div>
    
                    <a href="tel:${contact.phone}"
                        class="emergency-phone-link color-red-5 bg-light-18-color rounded-3 d-flex justify-content-center align-items-center flex-shrink-0">
                        <i
                            class="fa-solid fa-phone fs-12 fs-xl-8"></i>
                    </a>
                </div>
            </div>
            `
            emrContainer.innerHTML += contactEmrtHTML
        }
    }

    if(hasEmr === false) {
        emptyEmr.classList.remove("d-none")
    }else {
        emptyEmr.classList.add("d-none")
    }
}

// Star Toggler 
function toggleStarBtn(i) {
    cardsArr[i].favorite = !cardsArr[i].favorite
    localStorage.setItem("cardsArr" , JSON.stringify(cardsArr))
    displayCards()
}

// Heart Toggler 
function toggleHeartBtn(i) {
    cardsArr[i].emergency = !cardsArr[i].emergency
    localStorage.setItem("cardsArr" , JSON.stringify(cardsArr))
    displayCards()
}

// Change Icon BG 
function getAvatarColor() {
    return bgArr
}

function getColorByName(name) {
    var colors = getAvatarColor()
    var indexColor = name.length % colors.length
    return colors[indexColor]
}

function renderAvatar(name = "" , picPath = "") {

    if (picPath && picPath !== "" && picPath != "./assets/images/") {
        return  `
    <img
        src="./assets/images/${picPath}"
        alt="avatar"
        class="img-icon fs-18 lh-large object-fit-cover brr-12">
    `
    }

    if(name && name.trim() !== "") {
        var finalName = name.trim().split(" ").map((w)=> w[0].toUpperCase()).join("") 
        var color = getColorByName(name)
        return `
        <div
            class="img-icon text-white fw-semibold fs-18 lh-large brr-12 d-flex align-items-center justify-content-center ${color}" id="iconOfName">${finalName}</div>
        `
    }

            return `
        <div
            class="img-icon text-white fw-semibold fs-18 lh-large brr-12 d-flex align-items-center justify-content-center bg-1" id="iconOfName"></div>
        `
    }

function renderAvatarFavEm(name = "" , picPath = "") {

    if (picPath && picPath !== "" && picPath != "./assets/images/") {
        return  `
    <img
        src="./assets/images/${picPath}"
        alt="avatar"
        class="favorite-icon-img flex-shrink-0 object-fit-cover rounded-3">
    `
    }

    if(name && name.trim() !== "") {
        var finalName = name.trim().split(" ").map((w)=> w[0].toUpperCase()).join("") 
        var color = getColorByName(name)
        return `
        <div
            class="favorite-icon-img flex-shrink-0 text-white fw-semibold fs-14 lh-small rounded-3 d-flex justify-content-center align-items-center ${color}" id="iconOfName">${finalName}</div>
        `
    }

            return `
        <div
            class="favorite-icon-img flex-shrink-0 text-white fw-semibold fs-14 lh-small rounded-3 d-flex justify-content-center align-items-center bg-1" id="iconOfName"></div>
        `
    }

// Search Function
searchInput.addEventListener("keyup" , function(){
    var cartona = ""
    searchValue = searchInput.value
    console.log(searchValue);
    
    for(i = 0 ; i < cardsArr.length ; i++) {
        var cardName = cardsArr[i].name
        var cardPhone = cardsArr[i].phone
        var cardEmail = cardsArr[i].email
        if (cardName.toUpperCase().includes(searchValue.toUpperCase()) || cardPhone.includes(searchValue) || cardEmail.toUpperCase().includes(searchValue.toUpperCase())) {
            cartona += `
            <div class="col-sm-6 col-12">
            <div
                class="contact-card bg-white rounded-4 overflow-hidden d-flex flex-column h-100">
                <div class="px-3 pt-3 pb-12">
                    <!-- Top  -->
                    <div class="d-flex gap-14">
                        <!-- Top Icon  -->
                        <div
                            class="position-relative flex-shrink-0">

                            ${renderAvatar(cardsArr[i].name , cardsArr[i].img)}

                                <div
                                class="star-icon star-heart position-absolute bg-gold-3-color rounded-circle d-flex align-items-center justify-content-center ${cardsArr[i].favorite ? "" : "d-none"}">
                                <i
                                    class="fa-solid fa-star text-white fs-8"></i>
                                </div>
                                
                                <div
                                class="heart-icon star-heart position-absolute bg-red-4-color rounded-circle d-flex align-items-center justify-content-center ${cardsArr[i].emergency ? "" : "d-none"}">
                                <i
                                    class="fa-solid fa-heart-pulse text-white fs-8"></i>
                                </div>
                        </div>
    
                        <!-- Top Data  -->
                        <div class="pt-1">
                            <h3
                                class="fw-semibold color-black fs-16 lh-base m-0">${cardsArr[i].name}</h3>
                            <div
                                class="d-flex align-items-center gap-2 mt-1">
    
                                <div
                                    class="card-phone-icon d-flex align-items-center justify-content-center bg-light-blue-color brr-6">
                                    <i
                                        class="fa-solid fa-phone color-blue-3 fs-9"></i>
                                </div>
    
                                <span
                                    class="color-grey fs-14 lh-small">${cardsArr[i].phone}</span>
                            </div>
                        </div>
                    </div>
    
                    <!-- Mid 1 -->
                    <div class="mt-12">

                        ${cardsArr[i].email ? 
                            `
                            <div
                                class="d-flex align-items-center gap-10 mb-2">
                                <div
                                    class="card-mid-icon d-flex align-items-center justify-content-center rounded-3 bg-light-13-color">
                                    <i
                                        class="fa-solid fa-envelope color-vio fs-10"></i>
                                </div>
                                <span
                                    class="color-dark-grey fs-14 lh-small">${cardsArr[i].email}</span>
                            </div>
                            `
                            : ""
                        }
    
                        ${cardsArr[i].address ?
                            `
                            <div
                                class="d-flex align-items-center gap-10">
                                <div
                                    class="card-mid-icon d-flex align-items-center justify-content-center rounded-3 bg-light-blue-2-color">
                                    <i
                                        class="fa-solid fa-location-dot color-green-3 fs-10"></i>
                                </div>
                                <span
                                    class="color-dark-grey fs-14 lh-small">${cardsArr[i].address}</span>
                            </div>
                            `
                            : ""
                        }
                    </div>
    
                    <!-- Mid 2 -->
                    <div
                        class="d-flex gap-6 flex-wrap mt-12">
    
                        <span
                            class="family text-capitalize color-blue-2 fw-medium fs-11 py-1 px-2 bg-light-blue-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "family" ? "" : "d-none"}">family</span>
    
                        <span
                            class="friends text-capitalize color-green fw-medium fs-11 py-1 px-2 bg-light-green-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "friends" ? "" : "d-none"}">friends</span>
    
                        <span
                            class="work text-capitalize color-vio-3 fw-medium fs-11 py-1 px-2 bg-light-14-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "work" ? "" : "d-none"}">work</span>
    
                        <span
                            class="school text-capitalize color-brown fw-medium fs-11 py-1 px-2 bg-light-15-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "school" ? "" : "d-none"}">school</span>
    
                        <span
                            class="other text-capitalize color-grey-2 fw-medium fs-11 py-1 px-2 bg-light-11-color brr-6 d-inline-flex align-items-center ${cardsArr[i].group == "other" ? "" : "d-none"}">other</span>
    
                        <span
                            class="emergency text-capitalize color-red-5 fw-medium fs-11 py-1 px-2 bg-light-16-color brr-6 d-inline-flex align-items-center gap-1 ${cardsArr[i].emergency ? "" : "d-none"}">
                            <i
                                class="fa-solid fa-heart-pulse fs-10"></i>
                            Emergency
                        </span>
                    </div>
                </div>
    
                <!-- Footer  -->
                <div
                    class="card-footer py-10 px-3 bg-light-7-color bg-opacity-75 d-flex align-items-center justify-content-between mt-auto">
    
                    <div
                        class="d-flex align-items-center gap-6">
    
                        <a href="tel:${cardsArr[i].phone}"
                            title="Call"
                            class="card-phone-mail-link card-phone-link color-green-3 bg-light-green-2-color rounded-3 d-flex justify-content-center align-items-center">
                            <i
                                class="fa-solid fa-phone fs-14"></i>
                        </a>
    
                        <a
                            href="mailto:${cardsArr[i].email}"
                            title="Call"
                            class="card-phone-mail-link card-phone-link color-vio bg-light-17-color rounded-3 d-flex justify-content-center align-items-center">
                            <i
                                class="fa-solid fa-envelope fs-14"></i>
                        </a>
                    </div>
    
                    <div
                        class="d-flex align-items-center gap-6">
                        <button
                            class="card-btn card-star color-grey-3 bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0 ${cardsArr[i].favorite ? "d-none" : ""}" onclick="toggleStarBtn(${i})">
                            <i
                                class="fa-regular fa-star"></i>
                        </button>
                        <button
                            class="card-btn card-star-after color-gold-3 bg-light-6-color rounded-3 d-flex align-items-center justify-content-center border-0 ${!cardsArr[i].favorite ? "d-none" : "d-flex"}" onclick="toggleStarBtn(${i})">
                            <i
                                class="fa-solid fa-star"></i>
                        </button>

                        <button
                            class="card-btn card-heart color-grey-3 bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0 ${cardsArr[i].emergency ? "d-none" : ""}" onclick="toggleHeartBtn(${i})">
                            <i
                                class="fa-regular fa-heart"></i>
                        </button>
                        <button
                            class="card-btn card-heart-after color-red-4 bg-light-16-color rounded-3 d-flex align-items-center justify-content-center border-0 ${!cardsArr[i].emergency ? "d-none" : ""}" onclick="toggleHeartBtn(${i})">
                            <i
                                class="fa-solid fa-heart-pulse"></i>
                        </button>
    
                        <button
                            class="card-btn card-edit color-grey bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0" onclick="updateCard(${i})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
    
                        <button
                            class="card-btn card-remove color-grey bg-light-7-color rounded-3 d-flex align-items-center justify-content-center border-0" onclick="removeCard(${i})">
                            <i
                                class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
            `
        }
    }

    if (cartona === "") {
    emptyContactCard.classList.remove("d-none");
    } else {
    emptyContactCard.classList.add("d-none");
    }

contactCards.innerHTML = cartona
})

// Validation
function validateName() {
    var nameRegex = /^[A-Za-z\u0600-\u06FF ]{2,50}$/;
    if(nameRegex.test(fullName.value)) {
        nameInValid.classList.add("d-none")
        fullName.classList.remove("invalid-border")
        return true
    }else {
        nameInValid.classList.remove("d-none")
        fullName.classList.add("invalid-border")
        if (fullName.value == "") {
        nameInValid.classList.add("d-none")
        fullName.classList.remove("invalid-border")
        }
        return false
    }
}
fullName.addEventListener("input", validateName);

function validatePhone() {
    var phoneRegex = /^(\+2)?01[0125]\d{8}$/;
        if(phoneRegex.test(phoneNum.value)) {
        phoneInValid.classList.add("d-none")
        phoneNum.classList.remove("invalid-border")
        return true
    }else {
        phoneInValid.classList.remove("d-none")
        phoneNum.classList.add("invalid-border")
        if (phoneNum.value == "") {
        phoneInValid.classList.add("d-none")
        phoneNum.classList.remove("invalid-border")
        }
        return false
    }
}
phoneNum.addEventListener("input", validatePhone);

function validateEmail() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)) {
        emailInValid.classList.add("d-none")
        email.classList.remove("invalid-border")
        return true
    }else {
        emailInValid.classList.remove("d-none")
        email.classList.add("invalid-border")
        if (email.value == "") {
        emailInValid.classList.add("d-none")
        email.classList.remove("invalid-border")
        }
        return false
    }
}
email.addEventListener("input", validateEmail);

