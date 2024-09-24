document.addEventListener('DOMContentLoaded', () => {
    const ingredientsTable = document.querySelector('#ingredientsTable tbody');
    const ingredientForm = document.getElementById('ingredientForm');
    const deleteIngredientForm = document.getElementById('deleteIngredientForm');

    fetch('/ingredients')
        .then(response => response.json())
        .then(data => {
            data.forEach(ingredient => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ingredient.id}</td>
                    <td>${ingredient.name}</td>
                    <td>${ingredient.caloriesPerGram}</td>
                `;
                ingredientsTable.appendChild(row);
            });
        });

    ingredientForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(ingredientForm);
        const ingredient = {
            id: formData.get('id'),
            name: formData.get('name'),
            caloriesPerGram: parseFloat(formData.get('caloriesPerGram'))
        };

        fetch('/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
            .then(response => response.json())
            .then(data => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.caloriesPerGram}</td>
            `;
                ingredientsTable.appendChild(row);
                ingredientForm.reset();
            });
    });

    deleteIngredientForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = document.getElementById('deleteIngredientId').value;

        fetch(`/ingredients/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const rows = ingredientsTable.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.children[0].textContent == id) {
                    row.remove();
                }
            });
            deleteIngredientForm.reset();
        });
    });
});
