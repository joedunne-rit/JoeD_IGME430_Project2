//Used for client-side user page code
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

//React component for displaying the user's currently equipped appearance
const UserPreview = (props) => {
    const itemName = `${props.item}`;
    return(
        <div id="appearance">
            <img src={itemName} alt="preview of character" />
        </div>
    )
}

//Gets currently equipped appearance from database, then updates user preview
const loadPreview = async () => {
    // /getEquipped is finishing first for some reason
    const response = await fetch('/getEquipped');
    const data = await response.json();
    ReactDOM.render(
        <UserPreview item={data.item[0].equipped} />,
        document.getElementById('preview')
    );
}

//Sends post request to server to change currently equipped apparance
//Afterwards, updates user preview
const equip = (e, itemName) => {
    helper.sendPost('/equip', {itemName});
    loadPreview();
};

//React component for inventory tab
const Inventory = (props) => {
    const items = props.items.map(item => {
        const itemName = `assets/img/${item}`;
        return(
            <div name={item} className="item" onClick={(e) => equip(e, itemName)}>
                <img src={itemName} alt='preview of item'/>
            </div>
        );
    });

    return(
        <div className='itemList'>
            {items}
        </div>
    );
}

//Takes a specified item & makes a transaction in server
//Sends post request to server with the item's name & price
//All shop items have a button tied to this function
const purchase = (e, itemName, price) => {
    e.preventDefault();
    helper.sendPost('/purchase', {itemName, price});

    return false;
}

//Makes post request to server to add money to an account
const addCurrency = (e) => {
    e.preventDefault();
    const money = 300;
    helper.sendPost('/addCurrency', {money});

    return false;
}

//React component for item store
const Store = (props) => {
    const items = ['blue.png', 'purple.png', 'cyan.png', 'orange.png'];
    const shopList = items.map(item => {
        const imageName = `/assets/img/${item}`;
        return(
            <div name={item} price='300' className='item'>
                <img src={imageName} alt='preview of item'></img>
                <div class='price'>300</div>
                <button class='purchase' onClick={(e) => purchase(e, item, 300)}>Buy</button>
            </div>
        )
    })
    //Display user's currency amount, add button to add currency
    return(
        <div id='shop'>
            <button id='addCurrencyButton' onClick={(e) => addCurrency(e)}>Get more money</button>
            {shopList}
        </div>
    )
}

//Whenever tab is swapped to inventory, this function is called to properly retrieve user's inventory
//Takes said inventory, and uses the data to properly render inventory tab
const loadInventory = async () => {
    const response = await fetch('/getInventory');
    const data = await response.json();
    ReactDOM.render(
        <Inventory items={data.items[0].inventory}/>,
        document.getElementById('items')
    )
}

const init = () => {
    //click to swap inv/shop
    const inventoryButton = document.getElementById('inventoryButton');
    const storeButton = document.getElementById('storeButton');

    inventoryButton.addEventListener('click', (e) => {
        e.preventDefault();
        loadInventory();
    });

    storeButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(
            <Store />,
            document.getElementById('items')
        )
    });

    ReactDOM.render(
        <UserPreview item='assets/img/spellbook.png'/>,
        document.getElementById('preview')
    );
    ReactDOM.render(
        <Inventory items={[]}/>,
        document.getElementById('items')
    )

    loadPreview();
    loadInventory();
}

window.onload = init;