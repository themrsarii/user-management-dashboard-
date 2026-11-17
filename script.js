let userContainer= document.querySelector('.user-container');
let menu = document.querySelector(".btns i");
let navLinks = document.querySelector(".nav-links");
menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

let renderUi= ()=>{
        userContainer.innerHTML = "";

    // Saare users render karo
    usersArray.forEach((item, index) => {

        userContainer.innerHTML += `
            <div class="single-user">
                <div class="user-image">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <hr style="margin-top: 10px;">
                </div>

                <h3>${item.name}</h3>
                <p>${item.email}</p>

                <div class="action-btns">
                    <div id="d-btn">
                        <button onclick="deleteUser(${index})">DELETE</button>
                    </div>
                    <div id="u-btn">
                        <button onclick="updateUser(${index})">UPDATE</button>
                    </div>
                </div>
            </div>
        `;
        console.log(item.imageUrl)
    });
}

let addUserBtn = document.querySelector('#addUserBtn');
let navBTN = document.querySelector('#navaddUserBtn');
let underLay = document.querySelector('#underlay');
let crossIcon = document.querySelector('.cross-icon');
let form = document.querySelector('form');

addUserBtn.addEventListener('click', () => {
    underLay.classList.remove('vis');
    form.reset();
});
navBTN.addEventListener('click', () => {
    form.reset();
    underLay.classList.remove('vis');
});

crossIcon.addEventListener('click', () => {
    underLay.classList.add('vis');
});

underLay.addEventListener('click', () => {
    underLay.classList.add('vis');
});


let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];
let isUpdated= false;
let currentIndex= null;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = form[0].value;
    let email = form[1].value;
    let imageUrl = form[2].value;

    let usersObj = {
        name: name,
        email: email,
        imageUrl: imageUrl
    };

    if(isUpdated){
        usersArray[currentIndex]= usersObj;
        isUpdated=false;
        currentIndex= null;
    }else{
        usersArray.push(usersObj);
    }
    localStorage.setItem("usersArray",JSON.stringify(usersArray));

    renderUi();


    

    underLay.classList.add('vis');
    form.reset();
});

form.addEventListener('click', (e) => {
    e.stopPropagation();
});

let deleteUser= (index)=>{
    usersArray.splice(index,1);
    localStorage.setItem("usersArray",JSON.stringify(usersArray));
    renderUi();
}
let updateUser= (index)=>{
    currentIndex= index;
    isUpdated= true;
    let newUserArray= usersArray[index];
    form[0].value= newUserArray.name;
    form[1].value= newUserArray.email;
    form[2].value= newUserArray.imageUrl;
    underLay.classList.remove('vis');
}
renderUi();