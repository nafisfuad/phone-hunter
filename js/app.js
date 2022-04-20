const loadPhones = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    fetch(url).then(res => res.json()).then(data => displayPhones(data.data));
};

const displayPhones = phones => {
    console.log(phones);

    const phonesDiv = document.getElementById('phones');
    phonesDiv.textContent = '';
    if (phones.length === 0) {
        phonesDiv.innerHTML = `
        <div class="card w-100">
  <div class="card-header">
    Error
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>No results found.</p>
    </blockquote>
  </div>
</div>
        `
    }
    if (phones.length <= 20) {
        for (const phone of phones) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="w-75 p-5 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <a href="#" class="btn btn-primary" onclick="phoneDetails('${phone.slug}')">Details</a>
        </div>
        `;
            phonesDiv.appendChild(col);
        }
    } else {
        for (let i = 0; i < 20; i++) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
        <div class="card h-100">
            <img src="${phones[i].image}" class="w-75 p-5 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phones[i].phone_name}</h5>
            <p class="card-text">Brand: ${phones[i].brand}</p>
            <a href="#" class="btn btn-primary" onclick="phoneDetails('${phones[i].slug}')">Details</a>
        </div>
        `;
            console.log(phones[i]);
            phonesDiv.appendChild(col);
        }
    }
};

const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url).then(res => res.json()).then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    const mainFeatures = [];
    const others = [];
    for (const key in phone.mainFeatures) {
        if (key !== 'sensors') {
            mainFeatures.push(phone.mainFeatures[key]);
        }
    }


    console.log(mainFeatures);
    const phoneDiv = document.getElementById('phone-details');
    phoneDiv.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${phone.image}" class="card-img-top rounded-start py-5 px-3" alt="...">
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="card-body">
                    <h5 class="card-title">${phone.name}</h5>
                    <p class="card-text"><small>Release Date: ${phone.releaseDate}</small></p>
                    <p class="card-text"><small>Main Features: ${mainFeatures}</small></p>
                    <p class="card-text"><small>Sensors: ${phone.mainFeatures.sensors}</small></p>
                    <p class="card-text"><small>Others: ${others}</small></p>
                </div>
            </div>
        </div>
    </div>
    `
    console.log(phone);
}