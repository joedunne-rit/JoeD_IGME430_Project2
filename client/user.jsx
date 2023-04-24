//Used for client-side user page code
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const UserPreview = (props) => {
    return(
        <div id="appearance">
            <img src="assets/img/spellbook.png" alt="preview of character" />
        </div>
    )
}

//When item in inventory is clicked, change image in preview to that item
//Will be attached to items in inventory
const changePreview = (e) => {
    ReactDOM.render(
        <UserPreview item={e.target.item} />,
        document.getElementById('preview')
    );
};

const Inventory = (props) => {
    const items = props.items.map(item => {
        const itemName = `assets/img/${item}`;
        return(
            <div name={item.name} className="item">
                <img src={itemName} alt='preview of item'/>
            </div>
            //add event listener to apply item to preview
            //get item file name
            //apply file name to src tag in UserPreview
        );
    });

    return(
        <div className='itemList'>
            {items}
        </div>
    );
}

const Store = (props) => {
    return(
        <div name='testName' price='300' className="item">
            <img src='assets/img/testName.png' alt="preview of item"></img>
            <div id='price'>300</div>
        </div>
    )
}

//Function that will be attached to any store item
//When store item is clicked, specified item is added to inventory after transaction
const purchase = (e) => {
    e.preventDefault()
    const itemName = e.target.name;
    const price = e.target.price;
    helper.sendPost('/purchase', {itemName, price})

    return false;
}

//Whenever tab is swapped to inventory, this function is called to properly retrieve user's inventory
//Takes said inventory, and uses the data to properly render inventory tab
const loadInventory = async () => {
    const response = await fetch('/getInventory');
    const data = await response.json();
    console.log(data.items[0].inventory);
    ReactDOM.render(
        <Inventory items={data.items[0].inventory}/>,
        document.getElementById('items')
    )
    console.log('loadInventory finished');
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
        <UserPreview />,
        document.getElementById('preview')
    );
    ReactDOM.render(
        <Inventory items={[]}/>,
        document.getElementById('items')
    )

    loadInventory();
}

window.onload = init;