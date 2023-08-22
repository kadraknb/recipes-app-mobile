import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Categories from './Categories';
import AppContext from '../context/AppContext';
import Card from './Card';
import GetApi from '../services/getApi';
import { useRoute } from '@react-navigation/native';

const Recipes = () => {
  const { recipesUpdate } = useContext(AppContext);
  const [ recipes, setRecipes ] = useState([]);
  const pageIsDrinks = useRoute().name === 'Drinks';

  useEffect(() => {
    getRecipes();
    return () => {};
  }, []);

  useEffect(() => {
    setRecipes(recipesUpdate);
    return () => {};
  }, [recipesUpdate]);

  const getRecipes = async () => {
    const data = await GetApi.recipes(pageIsDrinks);
    setRecipes(data);
  };

  return (
    <View>
      <Categories />
      {recipes.length &&
        recipes.map((recipe) => (
          <Card key={Object.values(recipe)[0]} recipe={recipe} pageIsDrinks={pageIsDrinks} />
        ))}
    </View>
  );
};

export default Recipes;
