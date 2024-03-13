import React from 'react';
import './Search.css';
import loading from '../../Assets/loading.gif';
import useSearchLogic from './useSearchLogic';

function Search({ title, url, handleHide }) {
    const {
        data,
        showData,
        dataText,
        showLoading,
        keys,
        typing,
        filteredItems,
        showFiltered,
        getData,
        clearData,
        handleTyping,
        handleClear,
        handleFilterChange,
    } = useSearchLogic(url);

    return (
        <div className="search">
            <button className="hide-button" onClick={handleHide}>
                HIDE
            </button>
            <h1>{title}</h1>
            <button className="search-btn" onClick={() => getData()}>
                {data.length === 0 ? 'Fetch Data' : 'Refresh Data'}
            </button>
            <button className="search-btn" onClick={() => clearData()}>
                Clear
            </button>
            <br />
            <select
                className="dropdown"
                onChange={(e) => handleFilterChange(e)}
            >
                <option value="Filter By">Filter By</option>
                {keys.map((key) => {
                    return (
                        <option value={key} key={key}>
                            {key}
                        </option>
                    );
                })}
            </select>
            <input
                className="input"
                type="text"
                value={typing}
                onChange={(e) => handleTyping(e)}
                placeholder="Enter value"
            ></input>

            {/* TODO: make function handleSearch for search button */}
            <button className="search-btn">Search</button>
            <button className="search-btn" onClick={() => handleClear()}>
                Clear
            </button>
            <h3>Data:</h3>
            {showLoading && <img src={loading} alt="Loading..."></img>}
            {showData ? (
                <pre>{JSON.stringify(data, null, 4)}</pre>
            ) : showFiltered ? (
                <ul>
                    {filteredItems.map((item, i) => {
                        return <li key={i}>{item}</li>
                    })}
                </ul>
            ) : (
                <div>{dataText}</div>
            )}
        </div>
    );
}

export default Search;
