// useSearchLogic.js
import { useState } from 'react';

const useSearchLogic = (url) => {
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [dataText, setDataText] = useState('Press Button to Fetch Data');
    const [showLoading, setShowLoading] = useState(false);
    const [keys, setKeys] = useState([]);
    const [typing, setTyping] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [showFiltered, setShowFiltered] = useState(false);
    const [filteredItems2, setFilteredItems2] = useState([]);

    const getData = () => {
        setShowData(false);
        setShowFiltered(false);
        setShowLoading(true);
        setDataText('');
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setKeys(Object.keys(json[0] || {}));
                setShowData(true);
                setShowLoading(false);
            });
    };

    const clearData = () => {
        setShowData(false);
        setShowFiltered(false);
        setData([]);
        setKeys([]);
        setDataText('Data has been cleared');
    };

    const handleTyping = (e) => {
        setTyping(e.target.value);
    };

    const handleClear = () => {
        setTyping('');
        setDataText('');
        setFilteredItems(filteredItems2);
    };

    const handleFilterChange = (e) => {
        const f = e.target.value;

        if (f === 'Filter By') {
            setShowData(true);
            setShowFiltered(false);
        } else {
            const temp = data
                .filter((item) => {
                    return item[f] !== undefined;
                })
                .map((item) => {
                    return [item[f], item.id];
                });
            setFilteredItems(() => temp);
            setFilteredItems2(() => temp);
            setShowData(false);
            setShowFiltered(true);
        }
    };

    const showJson = (id) => {
        const jsonData = data.find((item) => item.id === id);

        const jsonString = JSON.stringify(jsonData, null, 2);

        setFilteredItems((old) => {
            return old.map((item) => {
                if (item[1] === id) {
                    return [jsonString, item[1]];
                }
                return item;
            });
        });
    };

    const handleSearch = (value) => {
        if (!showData && !showFiltered) {
            setDataText('You have to fetch the data before you can search.');
            setTyping('');
        } else if (showData) {
            setDataText('You have to choose the filter option first');
            setTyping('');
        } else if (showFiltered) {
            setDataText('');
            const temp = filteredItems2;

            setFilteredItems(() =>
                temp.filter((item) => {
                    return item[0]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase());
                })
            );
        }
    };

    return {
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
    };
};

export default useSearchLogic;
