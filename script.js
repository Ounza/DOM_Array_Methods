const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth ');

let data = []; 
getRandomUser();
getRandomUser();
getRandomUser();
//fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);

}
//Double everyones money
function doubleMoney(){
    data = data.map(user => {
        return{...user, money:user.money*2};
    });
    updateDOM();
}
//To sort users by richest
function sortMoney(){
    data = data.sort((a,b) => b.money-a.money);
    updateDOM();
}
//To filter only millionaires
function showMillionaires(){
    data= data.filter(function(item){
        return item.money > 1000000;
    });
    updateDOM();
}
//Using reduce to calculate wealth
function calculateWealth(){
    const wealth = data.reduce((acc,num) => acc += num.money);
    console.log(wealth);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
 
//Add new obj to data arr

function addData(obj){
     data.push(obj);
     updateDOM();
}

//Update the DOM
function updateDOM(providedData = data){
    //Clear main div
    main.innerHTML= '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML= `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number){
    return'$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}
//Event Listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);