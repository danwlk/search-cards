import React from 'react';
import './Search.css';
import loading from '../../Assets/loading.gif';
import useSearchLogic from './useSearchLogic';
import { CloseButton } from 'react-bootstrap';

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
        showJson,
        handleSearch,
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
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    value={typing}
                    onChange={(e) => handleTyping(e)}
                    placeholder="Enter value"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(typing);
                        }
                    }}
                ></input>
                <CloseButton
                    className="clear-button"
                    onClick={() => handleClear()}
                />
                <button
                    className="search-button"
                    onClick={() => handleSearch(typing)}
                >
                    search
                </button>
            </div>
            <div>{dataText}</div>
            <h3>Data:</h3>
            {showLoading && <img src={loading} alt="Loading..."></img>}
            {showData ? (
                <pre>{JSON.stringify(data, null, 4)}</pre>
            ) : showFiltered ? (
                <ul>
                    {filteredItems.map((item) => {
                        return (
                            <li key={item[1]} style={{ marginBottom: '1rem' }}>
                                {typeof item[0] === 'string' &&
                                item[0].startsWith('{') ? (
                                    <div>
                                        <pre>{item[0]}</pre>
                                    </div>
                                ) : (
                                    <div>
                                        {item[0]}
                                        <button
                                            className="element-button"
                                            onClick={() => showJson(item[1])}
                                        >
                                            Show Data
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}

export default Search;
