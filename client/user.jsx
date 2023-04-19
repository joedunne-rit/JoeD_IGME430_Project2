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
        const itemName = `assets/img/${item.name}`;
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
        <div name='testName' className="item">
            <img src='assets/img/testName.png' alt="preview of item"></img>
            <div id='price'>300</div>
        </div>
    )
}

const loadInventory = async () => {
    const response = await fetch('/getInventory');
    const data = await response.json();
    ReactDOM.render(
        <Inventory items={data.items}/>,
        document.getElementById('items')
    )
}

const init = () => {
    //click to swap inv/shop
    const inventoryButton = document.getElementById('inventoryButton');
    const storeButton = document.getElementById('storeButton');

    inventoryButton.addEventListener('click', (e) => {
        e.preventDefault();
        loadInventory;
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

    loadInventory;
}

window.onload = init;