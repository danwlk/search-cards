import React from 'react';
import './Search.css';
import { useState } from 'react';

function Search({ title, url }) {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [dataText, setDataText] = useState('Press Button to Fetch Data');

    const getData = () => {
        setShowData(false);
        setDataText('Loading...');
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setDataText('');
                setShowData(true);
            });
    };

    const clearData = () => {
        if (data.length === 0) {
            setDataText('There is no data to clear!');
        } else {
            setShowData(false);
            setData([]);
            setDataText('Data has been cleared');
        }
    };

    return (
        <div className="search">
            <button className="hide-button">HIDE</button>
            <h1>{title}</h1>
            <button className="search-btn" onClick={() => getData()}>
                {data.length === 0 ? 'Fetch Data' : 'Refresh Data'}
            </button>
            <button className="search-btn" onClick={() => clearData()}>
                Clear
            </button>
            <br />
            <select className="dropdown">
                <option value="none">Filter By</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <input className="input" type="text"></input>
            <button className="search-btn">Clear</button>
            <h3>Data:</h3>
            {showData ? (
                <pre>{JSON.stringify(data, null, 4)}</pre>
            ) : (
                <div>{dataText}</div>
            )}
        </div>
    );
}

export default Search;
