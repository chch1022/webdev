import React, { useState } from "react";
export default function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => setCount(count + 1)}
                id="wd-counter-up-click"
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    margin: '5px',
                    transition: 'all 0.3s ease'
                }}>Up</button>
            <button onClick={() => setCount(count - 1)}
                id="wd-counter-down-click"
                style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                margin: '5px',
                transition: 'all 0.3s ease'
              }}>Down</button>
            <hr /></div>);
}