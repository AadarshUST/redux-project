import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import Items from '~/components/LandingComponents/Items';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';
import Styles from '~/Style/LandingPage.module.css';

const LandingPage = () => {
    const { isAuthenticated } = useAppSelector(selectUser);
    const cardListStyle = isAuthenticated ? { marginTop: "0px" } : { marginTop: "74px" };
    const [apiData, setApiData] = useState([]);
    const { cardList } = Styles;

    useEffect(() => {
        const fetchApi = async () => {
            const { data: { data } } = await axios.get('http://localhost:5000/api/posts/getApprovedPost');
            setApiData(data);
        };
        fetchApi();
    }, []);

    return (
        <>
            <Header />
            <div className={cardList} style={cardListStyle} >
                {
                    apiData.map(({ id, recipeName, recipeImgName, recipeIngrendients, recipeProcess }) => {
                        return <Items key={id} id={id} title={recipeName} src={recipeImgName} desc={recipeIngrendients} process={recipeProcess} />
                    })
                }
            </div>
        </>
    )
}

export default LandingPage
