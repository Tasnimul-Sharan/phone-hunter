const searchPhone = () => {
    const serchField = document.getElementById('search-field');
    const message = document.getElementById('message');
    const serchFieldValue = serchField.value;
    serchField.value = '';
    // loadPhone(serchFieldValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${serchFieldValue}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data[0] == null)
            if (data.data[0] == null) {
                message.style.display = 'block';
            }

            else {
                displayPhone(data.data[0])
                message.style.display = 'none';
            }
        })
}


/* const loadPhone = searchText => {
//     const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
//     // console.log(url)
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayPhone(data.status))
// }

 if (isNaN(inputValue) || inputValue == "") {
        error.innerText = "please give a number";
        input.value = '';
        main.innerHTML = '';
    }
    else if (inputValue < 0) {
        error.innerText = "please enter a positive number";
        input.value = '';
        main.innerHTML = '';
    }
    else {
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => cardDisplay(data.cards))
        input.value = '';
        error.innerHTML = '';
    }

*/ loadPhone('data');

const displayPhone = data => {
    console.log(data)
    const container = document.getElementById('search-results');
    container.textContent = '';
    const pair = Object.entries(data)
    for (const pair in data) {
        // console.log(pair)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
              <div class="card" style="width: 18rem;">
                  <img src="${data.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${data.phone_name}</h5>
                     <p class="card-text">${data.brand}</p>
                     <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-primary">See details</button>
                  </div>
             </div>
                  `;
        container.appendChild(div);
    }
}

const loadPhoneDetail = id => {
    // console.log(id)
    const url = (`https://openapi.programming-hero.com/api/phone/${id}`)
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}



const displayPhoneDetail = data => {
    console.log(data)
    const phoneDetail = document.getElementById("phone-details");
    phoneDetail.textContent = '';
    const pair = Object.entries(data.mainFeatures)
    // data.apply(releaseDate);
    // console.log(pair)
    for (const pair in data) {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = ` <div class="card" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${data.name}</h5>
                   <p class="card-text">${data.releaseDate}</p>
                   <p class="card-text">${data.mainFeatures.chipSet}</p>
                   <p class="card-text">${data.mainFeatures.displaySize}</p>
                   <p class="card-text">${data.mainFeatures.memory}</p>
                   <p class="card-text">${data.mainFeatures.sensors}</p>   
                   <p class="card-text">${data.others.Bluetooth}</p>   
                   <p class="card-text">${data.others.GPS}</p>   
                   <p class="card-text">${data.others.NFC}</p>   
                   <p class="card-text">${data.others.Radio}</p>   
                   <p class="card-text">${data.others.USB}</p>   
                   <p class="card-text">${data.others.WLAN}</p>   
                  </div>
                </div>
                `;
        phoneDetail.appendChild(div);
    }

}
