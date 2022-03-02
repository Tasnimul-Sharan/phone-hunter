const container = document.getElementById('search-results');
const phoneDetail = document.getElementById("phone-details");

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchPhone = () => {
    const serchField = document.getElementById('search-field');
    const message = document.getElementById('message');
    const serchFieldValue = serchField.value;
    serchField.value = '';
    toggleSpinner('block')
    const url = `https://openapi.programming-hero.com/api/phones?search=${serchFieldValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.data[0] == null) {
                message.style.display = 'block';
                toggleSpinner('none');
                container.innerHTML = '';
                phoneDetail.textContent = '';
            }

            else {
                displayPhone(data.data[0])
                message.style.display = 'none';
                phoneDetail.textContent = '';
            }
        })
}

const displayPhone = data => {
    console.log(data)
    const container = document.getElementById('search-results');
    container.textContent = '';
    const pair = Object.entries(data)
    for (const pair in data) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
              <div class="card bg-dark text-white" style="width: 18rem;">
                  <img src="${data.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${data.phone_name}</h5>
                     <p class="card-text">${data.brand}</p>
                     <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-primary mx-5">See details</button>
                  </div>
             </div>
                  `;
        container.appendChild(div);
    }
    toggleSpinner('none');
}

const loadPhoneDetail = id => {
    const url = (`https://openapi.programming-hero.com/api/phone/${id}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = data => {
    console.log(data)
    const phoneDetail = document.getElementById("phone-details");
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = ` <div class="card" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body bg-dark text-white">
                   <h5 class="card-title">${data.name}</h5>
                   <p class="card-text">releaseDate : ${data.releaseDate}</p>
                   <p class="card-text">chipSet : ${data.mainFeatures.chipSet}</p>
                   <p class="card-text">displaySize : ${data.mainFeatures.displaySize}</p>
                   <p class="card-text">memory : ${data.mainFeatures.memory}</p>
                   <p class="card-text">storage : ${data.mainFeatures.storage}</p>
                   <p class="card-text">sensors : ${data.mainFeatures.sensors}</p> 
                   <p class="card-text">Bluetooth : ${data.others?.Bluetooth}</p>   
                   <p class="card-text">GPS : ${data.others?.GPS}</p>   
                   <p class="card-text">NFC : ${data.others?.NFC}</p>   
                   <p class="card-text">Radio : ${data.others?.Radio}</p>   
                   <p class="card-text">USB : ${data.others?.USB}</p>   
                   <p class="card-text">WLAN : ${data.others?.WLAN}</p>
                  </div>
                </div>
                `;
    phoneDetail.appendChild(div);

    toggleSpinner('none');
}
