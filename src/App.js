import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [totalBudget, setTotalBudget] = useState(1000); 
  const [remainingBudget, setRemainingBudget] = useState(1000); 
  const [moneySpent, setMoneySpent] = useState(0);
  const [items, setItems] = useState([]); 

  const nameInput = useRef(null); 
  const costInput = useRef(null);

  const handleSave = () => {
    const name = nameInput.current.value;
    const cost = parseInt(costInput.current.value);

    if (!name || isNaN(cost)) {
      alert("Please enter valid item name and cost.");
      return;
    }

    const newItem = { name, cost };
    setItems([...items, newItem]);
    setRemainingBudget((prevBudget) => prevBudget - cost);
    setMoneySpent((prevSpent) => prevSpent + cost);

    nameInput.current.value = "";
    costInput.current.value = "";
  };

  const handleDelete = (index, cost) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setRemainingBudget((prevBudget) => prevBudget + cost);
    setMoneySpent((prevSpent) => prevSpent - cost);
  };

  return (
    <div>
      <div className="budget-info">
        <div>Total Budget: ${totalBudget}</div>
        <div>Remaining Budget: ${remainingBudget}</div>
        <div>Money Spent: ${moneySpent}</div>
      </div>
      <div className="item-form">
        <input type="text" placeholder="Item Name" ref={nameInput} />
        <input type="number" placeholder="Cost" ref={costInput} />
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="item-list">
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.cost}
              <button onClick={() => handleDelete(index, item.cost)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
