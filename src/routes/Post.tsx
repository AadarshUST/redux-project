import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "../Style/Post.css";

const Post = () => {

    console.log("post component rendered");


    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
                    params: {
                        app_id: '46584388',
                        app_key: '09f9bb10ac2359680395ef49678f7b58',
                        'nutrition-type': 'cooking'
                    }
                });
                setRowData(response.data.hints);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchApiData();
    }, []);

    const avatarFormatter = ({ value }: { value: "string" }) => {
        return <img src={value} alt="Avatar" width="50px" height="50px" />;
    };

    const columnDefs = [
        { field: 'food.label', headerName: 'Food Label', sortable: true, filter: true, cellClass: 'vertical-middle' },
        { field: 'food.category', headerName: 'Category', sortable: true, filter: true, cellClass: 'vertical-middle' },
        { field: 'food.nutrients.ENERC_KCAL', headerName: 'Energy (kcal)', sortable: true, filter: true, cellClass: 'vertical-middle' },
        { field: 'food.image', headerName: 'Image', sortable: true, filter: true, cellRenderer: avatarFormatter, cellClass: 'vertical-middle' }
    ];

    return (
        <div className="App">
            {/* <h2> 
                Implement AG Grid in React -{' '}
                <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">
                    Clue Mediator
                </a>
            </h2> */}
            <div className="ag-theme-alpine ag-style" style={{ width: "76vw", height: "91vh" }}>
                <AgGridReact
                    defaultColDef={{ flex: 1 }}
                    rowHeight={60}
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    );
}

export default Post