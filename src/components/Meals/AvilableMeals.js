import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvilableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvilableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {

            const response = await fetch('https://udemy-react-http-34002-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            };
            console.log(loadedMeals);
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            console.log(error.message)
            setHttpError(error.message);
        });

    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvilableMeals
