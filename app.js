//Grabing Elements
const inputText = document.getElementById('inputText');
const qantity = document.getElementById('qantity');
const units = document.getElementById('units');
const resetBtn = document.getElementById('reset');
const addBtn = document.getElementById('addBtn');
const itemContainer = document.getElementById('itemContainer');
const clearAll = document.getElementById('clearAll');

let items = [];

//Function to reset elements
function reset(){
    location.reload();
}

//Adding event listeners

//Reseting Elements
resetBtn.addEventListener('click', reset);
//Adding Notes
addBtn.addEventListener('click', addItems);
//Event listener on pressing enter
inputText.addEventListener('keyup', event =>{
    if(event.key === 'Enter'){
        addItems();
    }
    if(event.key === 'Control'){
        reset();
    }
})

qantity.addEventListener('keyup', event =>{
    if(event.key === 'Enter'){
        addItems();
    }
    if(event.key === 'Control'){
        reset();
    }
})

units.addEventListener('keyup', event =>{
    if(event.key === 'Enter'){
        addItems();
    }
    if(event.key === 'Control'){
        reset();
    }
})


//Add items function
function addItems(){
    let items = getItems();
    if(inputText.value === ''){
        inputText.style.borderColor = 'red';
        setTimeout(() => {
            inputText.style.borderColor = 'white';
        }, 1000);
    } else{
        let itemObj = {
            itemName: inputText.value,
            qty: qantity.value,
            unit: units.value,
            classValue: '',
            unDoneBtn: ''
        }
        items.push(itemObj);
        addToLocalStorage(items);
        showItems();
        reset();
    }
}

//Adding items to local storage
function addToLocalStorage(items){
    localStorage.setItem('items', JSON.stringify(items))
}

//Get items from local storage
function getItems(){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    return items;
}

//Show all the items
function showItems(){
    let items = getItems();
    let itemsHTML = '';
    if(items === null){
        itemsHTML = '';
    } else{
        items.forEach((item, index) => {
            itemsHTML += `
            <li class="grid ${item.classValue}">
                <p>${index + 1}</p>
                <p>${item.itemName}</p>
                <p>${item.qty}</p>
                <p style="text-transform: uppercase;">${item.unit}</p>
                <div>
                    <button class="markDoneBtn ${item.unDoneBtn}"></button>
                    <button class="deleteItem"></button>
                </div>
            </li>`;
        
        });
    }

    itemContainer.innerHTML = itemsHTML;

    //Deleting and Mark Done 
    const deleteItems = itemContainer.querySelectorAll('.deleteItem');
    deleteItems.forEach((item, index) =>{
        item.addEventListener('click', () =>{
            let items = getItems();
            items.splice(index, 1);
            addToLocalStorage(items);
            showItems();
        })
    })

    //Marking Done
    const markDoneBtn = itemContainer.querySelectorAll('.markDoneBtn');
    markDoneBtn.forEach((item, index) =>{
        item.addEventListener('click', () =>{
            let items = getItems();
            if(items[index].classValue === 'markDone'){
                items[index].classValue = '';
                items[index].unDoneBtn = '';
            }else{
                items[index].classValue = 'markDone';
                items[index].unDoneBtn = 'unDoneBtn';
            }
            addToLocalStorage(items);
            showItems();
        })
    })
}
showItems();

// Clear all items from local Storage
clearAll.addEventListener('click', clearItems);

function clearItems(){
    localStorage.clear();
    showItems();
}

// let str = [{name: "Abhishek", sirName: "Mehra"}, {name: "Abhi", sirName: "Sharma"}]
// console.log(str);
// str[0].name = "Ryan";
// console.log(str);