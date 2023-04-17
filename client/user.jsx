//Used for client-side user page code
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const UserPreview = (props) => {
    return(
        <div id="appearance">
            <img src="" alt="preview of character" />
        </div>
    )
}

const Inventory = (props) => {
    const items = props.items.map(item => {
        const itemName = `assets/img/${item.name}`;
        return(
            <div name={item.name} className="item">
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

const Store = (props) => {

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