import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import DetailNavBar from '~/components/EachRecipeComponents/DetailNavBar';
import RecipeView from '~/components/EachRecipeComponents/RecipeView';

const EachRecipe = () => {
    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        const getApiData = async () => {
            try {
                const { data: { data } } = await axios.get(`http://localhost:5000/api/posts/getApprovedPost`);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        getApiData();
    }, []);
    return (
        <>
            <Header />
            <div className="app">
                <DetailNavBar recipeList={recipe} />
                <RecipeView />
            </div>
        </>
    );
};

export default EachRecipe;
