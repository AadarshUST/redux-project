import React, { useEffect, useState } from 'react';
import EachRecipeStyles from '~/Style/Detail.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';
import IngredientsView from './IngredientsView';

const RecipeView = () => {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    const { isAuthenticated } = useAppSelector(selectUser);
    const recipeStyle = isAuthenticated ? { marginTop: "0px" } : { marginTop: "74px" };
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-recipe/${id}`);
    };

    useEffect(() => {
        const getApiData = async () => {
            try {
                const { data: { data } } = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        getApiData();
    }, [id]);

    return (
        <div className={EachRecipeStyles["recipe-view"]} style={recipeStyle} >
            <div className={EachRecipeStyles["recipe-title-wrapper"]}>
                <div className={EachRecipeStyles["recipe-title"]}>{recipe.recipeName}</div>
                <button className={EachRecipeStyles['editButton']} onClick={handleEditClick}>Edit</button>
            </div>
            <div className={EachRecipeStyles["recipe-section-col"]}>
                <div className={EachRecipeStyles["recipe-section-title"]}>Ingredients</div>
                <hr />
                <ul className={EachRecipeStyles["recipe-ingredient-list"]}>
                    {/* {console.log(recipe.recipeIngrendients.split('\n'))} */}
                    <IngredientsView ingredients={recipe.recipeIngrendients} />
                </ul>
            </div>
            <div className={EachRecipeStyles["recipe-section-col"]}>
                <div className={EachRecipeStyles["text-center"]}>
                    {/* Check if recipe.recipeImgName is defined before using it */}
                    {recipe.recipeImgName && (
                        <img alt="" className={EachRecipeStyles["recipe-photo"]} src={`http://localhost:5000/images/${recipe.recipeImgName}`} />
                    )}
                </div>
            </div>
            {/* Render directions only if they exist */}
            {
                <div>
                    <div className={EachRecipeStyles["recipe-section-title"]}>Directions</div>
                    <hr />
                    <ol className={EachRecipeStyles["recipe-directions-list"]}>
                        {recipe.recipeProcess?.split('\n').map((item, i) => (
                            <li key={i} className={EachRecipeStyles["recipe-directions-list-item"]}>
                                {item}
                            </li>
                        ))}
                    </ol>
                </div>
            }
        </div>
    );
};

export default RecipeView;