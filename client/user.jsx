//Used for client-side user page code
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const UserPreview = (props) => {
    const itemName = `${props.item}`;
    return(
        <div id="appearance">
            <img src={itemName} alt="preview of character" />
        </div>
    )
}

const loadPreview = async () => {
    //Something's going wrong here, can't tell what
    const response = await fetch('/getEquipped');
    const data = await response.json();
    ReactDOM.render(
        <UserPreview item={data.item[0].equipped} />,
        document.getElementById('preview')
    );
}

//When item in inventory is clicked, change image in preview to that item
//Will be attached to items in inventory
//Additionally, will change equipped value in account model
const equip = (e, itemName) => {
    helper.sendPost('/equip', {itemName});
    loadPreview();
};

const Inventory = (props) => {
    const items = props.items.map(item => {
        const itemName = `assets/img/${item}`;
        return(
            <div name={item} className="item" onClick={(e) => equip(e, itemName)}>
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