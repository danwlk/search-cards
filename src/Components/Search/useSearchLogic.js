// useSearchLogic.js
import { useState } from 'react';

const useSearchLogic = (url) => {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [dataText, setDataText] = useState('Press Button to Fetch Data');
    const [showLoading, setShowLoading] = useState(false);
    const [keys, setKeys] = useState([]);
    const [typing, setTyping] = useState('');
    const [filterValue, setFilterValue] = useState('Filter By');
    const [filteredItems, setFilteredItems] = useState([]);

    const getData = () => {
        setShowData(false);
        setShowLoading(true);
        setDataText('');
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setKeys(Object.keys(json[0] || {}));
                setShowData(true);
                setShowLoading(false);
            });
    };

    const clearData = () => {
        setShowData(false);
        setData([]);
        setKeys([]);
        setDataText('Data has been cleared');
    };

    const handleTyping = (e) => {
        setTyping(e.target.value);
    };

    const handleClear = () => {
        setTyping('');
    };

    const handleSearch = () => {
        
    };

    return { 
        data, showData, dataText, showLoading, keys, typing, filterValue, filteredItems,
        getData, clearData, handleTyping, handleClear, handleSearch
    };
};

export default useSearchLogic;
