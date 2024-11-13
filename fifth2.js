document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipes');
    const recipeForm = document.getElementById('recipe-form');
    const addRecipeForm = document.getElementById('add-recipe-form');
    const searchRecipes = document.getElementById('search-recipes');
    const searchInput = document.getElementById('search');
    const showForm = document.getElementById('show-form');
    const showSearch = document.getElementById('show-search');
    


    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    function displayRecipes(filteredRecipes = recipes) {
        recipeList.innerHTML = '';
        filteredRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;
            recipeList.appendChild(recipeDiv);
        });
    }
    
    function addRecipe(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
        const instructions = document.getElementById('instructions').value;

        const newRecipe = { name, image, ingredients, instructions};
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        recipeForm.reset();
        addRecipeForm.classList.add('hidden');
    }

    function searchRecipesFn() {
        const query = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) || 
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
        );
        displayRecipes(filteredRecipes);
    }

    function toggleSections(sectionToShow) {
        addRecipeForm.classList.add('hidden');
        searchRecipes.classList.add('hidden');
        recipeList.classList.add('hidden');

        if (sectionToShow === 'add') {
            addRecipeForm.classList.remove('hidden');
        } else if (sectionToShow === 'search') {
            searchRecipes.classList.remove('hidden');
        } else {
            recipeList.classList.remove('hidden');
        }
    }

    showForm.addEventListener('click', () => toggleSections('add'));
    showSearch.addEventListener('click', () => toggleSections('search'));

    recipeForm.addEventListener('submit', addRecipe);
    searchInput.addEventListener('input', searchRecipesFn);

    displayRecipes();
});