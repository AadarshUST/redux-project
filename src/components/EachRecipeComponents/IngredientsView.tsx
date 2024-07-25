import React from 'react';
import EachRecipeStyles from '~/Style/Detail.module.css';
import { IngredientGroup } from './types';

interface IngredientViewProps {
    ingredients: Array<string | IngredientGroup>;
}

const IngredientsView = ({ ingredients }: IngredientViewProps) => {
    return (
        <>
            {ingredients?.split('\n').map((item: any, i: number) => {
                if (typeof item === 'string') {
                    return (
                        <li key={i} className={EachRecipeStyles["recipe-ingredient-list-item"]}>
                            {item}
                        </li>
                    );
                } else if (typeof item === 'object' && 'name' in item && 'items' in item) {
                    // Assuming item is an IngredientGroup
                    return (
                        <React.Fragment key={i}>
                            <li className={EachRecipeStyles["recipe-ingredient-list-item"]}>{item.name}</li>
                            <ul>
                                {item.items.map((subItem: any, j: number) => (
                                    <li key={j} className={EachRecipeStyles["recipe-ingredient-list-item"]}>
                                        {subItem}
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </>
    );
};

export default IngredientsView;