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


// const loadPhone = searchText => {
//     const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
//     // console.log(url)
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayPhone(data.status))
// }

// loadPhone('data');

const displayPhone = (data) => {
    console.log(data)
    const container = document.getElementById('search-results');
    container.textContent = '';
    const pair = Object.entries(data)
    for (const pair in data) {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
              <div class="card" style="width: 18rem;">
                  <img src="${data.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${data.phone_name}</h5>
                     <p class="card-text">${data.brand}</p>
                     <button class="btn btn-primary">See details</button>
                  </div>
             </div>
                  `;
        container.appendChild(div);
    }

}