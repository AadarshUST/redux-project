import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '~/Style/RecipeForm.module.css';
import { userID } from './Login';
import { useSelector } from 'react-redux';
import { selectUser } from '~/selectors';

const RecipeForm = () => {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { role } = useSelector(selectUser);

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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/posts/update/${id}`, recipe);
            alert('Recipe updated successfully!');
            navigate(`/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleFormSubmit} >
            <fieldset disabled={ !(recipe.userId === userID) }>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Recipe Name</label>
                    <input
                        type="text"
                        name="recipeName"
                        className={styles.input}
                        value={recipe.recipeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ingredients</label>
                    <textarea
                        name="recipeIngrendients"
                        className={styles.textarea}
                        value={recipe.recipeIngrendients}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Process</label>
                    <textarea
                        name="recipeProcess"
                        className={styles.textarea}
                        value={recipe.recipeProcess}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Save</button>
            </fieldset>
        </form>
    );
};

export default RecipeForm;
