document.addEventListener('DOMContentLoaded', () => {
    const dishesTable = document.querySelector('#dishesTable tbody');
    const dishForm = document.getElementById('dishForm');
    const deleteDishForm = document.getElementById('deleteDishForm');
    const addIngredientButton = document.getElementById('addIngredientButton');

    fetch('/dishes')
        .then(response => response.json())
        .then(data => {
            data.forEach(dish => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${dish.id}</td>
                    <td>${dish.name}</td>
                    <td>
                        <ul>
                            ${dish.dishIngredients.map(di => `<li>${di.ingredient.name} - ${di.grams} г</li>`).join('')}
                        </ul>
                    </td>
                    <td>${dish.dishIngredients.reduce((total, di) => total + (di.grams * di.ingredient.caloriesPerGram), 0)}</td>
                `;
                dishesTable.appendChild(row);
            });
        });

    addIngredientButton.addEventListener('click', () => {
        const ingredientsList = document.getElementById('ingredientsList');
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="number" name="ingredientId" placeholder="ID Інгредієнта" required />
            <input type="number" name="grams" placeholder="Грами" required />
        `;
        ingredientsList.appendChild(div);
    });

    dishForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(dishForm);
        const ingredients = [];
        for (let i = 0; i < formData.getAll('ingredientId').length; i++) {
            ingredients.push({
                ingredient: { id: formData.getAll('ingredientId')[i] },
                grams: formData.getAll('grams')[i]
            });
        }

        const dish = {
            id: formData.get('id'),
            name: formData.get('name'),
            dishIngredients: ingredients
        };

        fetch('/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dish)
        })
            .then(response => response.json())
            .then(data => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>
                    <ul>
                        ${data.dishIngredients.map(di => `<li>${di.ingredient.name} - ${di.grams} г</li>`).join('')}
                    </ul>
                </td>
                <td>${data.dishIngredients.reduce((total, di) => total + (di.grams * di.ingredient.caloriesPerGram), 0)}</td>
            `;
                dishesTable.appendChild(row);
                dishForm.reset();
            });
    });

    deleteDishForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = document.getElementById('deleteDishId').value;

        fetch(`/dishes/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const rows = dishesTable.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.children[0].textContent == id) {
                    row.remove();
                }
            });
            deleteDishForm.reset();
        });
    });
});
