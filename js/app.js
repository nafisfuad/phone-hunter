const loadPhones = () => {
    const searchText = document.getElementById('search-field').value;
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    fetch(url).then(res => res.json()).then(data => displayPhones(data.data));
};

const displayPhones = phones => {
    console.log(phones);
    const phonesDiv = document.getElementById('phones');
    phones.forEach(phone => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <a href="#" class="btn btn-primary" onclick="phoneDetails('${phone.slug}')">Go somewhere</a>
        </div>
        `;
        phonesDiv.appendChild(col);
    });
};

const phoneDetails = slug => {
    
}