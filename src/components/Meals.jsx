import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
const requestConfig = {};
const Meals = () => {
    const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching Meals . . .</p>;
    }
    if (error) {
        return <ErrorPage title="Failed to Fetch" message={error} />
    }
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}

export default Meals