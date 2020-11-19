import axios from 'axios';


const userList = document.querySelector('#usersId');
//console.log(userList);

const restaurantList = document.querySelector('#restaurantsId');

const reservationList = document.querySelector('#reservationsId');

const renderUser = (users) =>{
    const html = users.map( user =>`
    <li>
        <a href = '#${user.id}'>
            ${ user.name }
        </a>    
    </li>    
    `).join('');
    userList.innerHTML = html;

    console.log(users);

}

const renderRestaurants = (restaurants) =>{
    
    const html = restaurants.map( restaurant =>`
    <li>
            ${ restaurant.name }
            
    </li>    
    `).join('');
    restaurantList.innerHTML = html;

}

const renderReservations = (reservations) =>{
    
    const html = reservations.map( reservation =>`
    <li>
        ${ reservation.restaurantId }        
        ${ reservation.createdAt }
        <button>x</button>
            
    </li>    
    `).join('');
    reservationList.innerHTML = html;

}




const init = async() => {
    try {
        console.log('hi');
        const users = (await axios.get('/api/users')).data;
        const restaurants = (await axios.get('/api/restaurants')).data;
        renderUser(users);
        renderRestaurants(restaurants);

    }
    catch(ex){
        console.log(ex);
    }

}

init();

window.addEventListener(('hashchange'), async()=>{ 

    const userId = window.location.hash.slice(1)*1;
    const url = `/api/users/${userId}/reservations`;
    const reservations = (await axios(url)).data;

    renderReservations(reservations);

})