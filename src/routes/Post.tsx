import { useState, useEffect } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import style from "../Style/Post.module.css";
import { AgGridReact } from 'ag-grid-react';
import { token } from './Login';

interface PostData {
    id: number;
    recipeImgName: string;
    recipeName: string;
    recipeStatus: string;
}

const Post = () => {
    const [rowData, setRowData] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const { data: { data } } = await axios.get('http://localhost:5000/api/posts/getPost');
                setRowData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchApiData();
    }, []);

    const handleApprove = async (params: ICellRendererParams) => {
        try {
            const { data } = params;
            await axios.patch(`http://localhost:5000/api/posts/updateStatus/${data.id}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            setRowData(prevRowData => prevRowData.map(row => row.id === data.id ? { ...row, recipeStatus: 'Approved' } : row));
        } catch (error) {
            console.error('Update error:', error);
        }
    };


    const handleDeleteClick = async (params: ICellRendererParams) => {
        try {
            const { data } = params;
            await axios.delete(`http://localhost:5000/api/posts/deletePost/${data.id}`);
            setRowData(prevRowData => prevRowData.filter(row => row.id !== data.id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const editButtonRenderer = (params: ICellRendererParams) => {
        const { recipeStatus } = params.data;
        const buttonText = recipeStatus === 'Approved' ? 'Approved' : 'Pending';
        return <button className={buttonText === "Approved" ? style["btn-approve"] : style["btn-pending"]} onClick={() => handleApprove(params)}>{buttonText}</button>;
    };

    const deleteButtonRenderer = (params: ICellRendererParams) => {
        return <button className={style["btn-delete"]} onClick={() => handleDeleteClick(params)}>Remove</button>;
    };

    const avatarFormatter = ({ value }: any) => {
        console.log(value);

        return <img src={`http://localhost:5000/images/` + value} width="50px" height="50px" />;
    };

    const columnDefs = [
        { field: 'recipeImgName', headerName: 'Image', sortable: true, filter: true, cellRenderer: avatarFormatter, cellClass: 'vertical-middle' },
        { field: 'recipeName', headerName: 'Recipe Name', sortable: true, filter: true, cellClass: 'vertical-middle' },
        { field: 'recipeStatus', headerName: 'Status', sortable: true, filter: true, cellClass: 'vertical-middle' },
        {
            headerName: 'For Approval',
            cellRenderer: editButtonRenderer,
            cellClass: 'vertical-middle',
            width: 100,

        },
        {
            headerName: 'Remove Recipe',
            cellRenderer: deleteButtonRenderer,
            cellClass: 'vertical-middle',
            width: 100,
        },
    ];

    return (
        <div className={style["App"]}>
            <div className={`ag-theme-alpine ${style["ag-style"]}`} style={{ width: "76vw", height: "91vh" }}>
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

export default Post;