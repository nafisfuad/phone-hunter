const loadPhones = () => {
    const searchText = document.getElementById('search-field').value;
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    fetch(url).then(res => res.json()).then(data => displayPhones(data.data));
};

const displayPhones = phones => {
    console.log(phones);
    
    const phonesDiv = document.getElementById('phones');
    phonesDiv.textContent = '';
    phones.forEach(phone => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <a href="#" class="btn btn-primary" onclick="phoneDetails('${phone.slug}')">Details</a>
        </div>
        `;
        phonesDiv.appendChild(col);
    });
};

const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url).then(res => res.json()).then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    const phoneDiv = document.getElementById('phone-details');
    const sensors = phone.mainFeatures.sensors;
    console.log(sensors);
    phoneDiv.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${phone.image}" class="card-img-top rounded-start" alt="...">
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="card-body">
                    <h5 class="card-title">${phone.name}</h5>
                    <p class="card-text"><small>Release Date: ${phone.releaseDate}</small></p>
                    <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}, Display Size: ${phone.mainFeatures.displaySize}, Memory: ${phone.mainFeatures.memory}, Storage: ${phone.mainFeatures.storage}</p>
                    <p class="card-text">Sensors: ${sensors}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
    `
    console.log(phone);
}