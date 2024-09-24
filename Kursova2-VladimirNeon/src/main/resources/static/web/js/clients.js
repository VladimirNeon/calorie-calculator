document.addEventListener('DOMContentLoaded', () => {
    const clientsTable = document.querySelector('#clientsTable tbody');
    const clientForm = document.getElementById('clientForm');
    const deleteClientForm = document.getElementById('deleteClientForm');
    const findMenuForm = document.getElementById('findMenuForm');
    const addFavoriteIngredientButton = document.getElementById('addFavoriteIngredientButton');
    const addAllergyIngredientButton = document.getElementById('addAllergyIngredientButton');

    fetch('/clients')
        .then(response => response.json())
        .then(data => {
            data.forEach(client => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>
                        <ul>
                            ${client.favoriteIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            ${client.allergyIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${client.subscriptionEndDate}</td>
                    <td>${client.weight}</td>
                    <td>${client.height}</td>
                    <td>${client.age}</td>
                    <td>${client.recommendedCalories.toFixed(2)}</td>
                `;
                clientsTable.appendChild(row);
            });
        });

    addFavoriteIngredientButton.addEventListener('click', () => {
        const favoriteIngredientsList = document.getElementById('favoriteIngredientsList');
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="number" name="favoriteIngredientId" placeholder="ID Улюбленого Інгредієнта" />
        `;
        favoriteIngredientsList.appendChild(div);
    });

    addAllergyIngredientButton.addEventListener('click', () => {
        const allergyIngredientsList = document.getElementById('allergyIngredientsList');
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="number" name="allergyIngredientId" placeholder="ID Інгредієнта на який є Алергія" />
        `;
        allergyIngredientsList.appendChild(div);
    });

    clientForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(clientForm);
        const favoriteIngredients = formData.getAll('favoriteIngredientId').filter(id => id).map(id => ({ id: id }));
        const allergyIngredients = formData.getAll('allergyIngredientId').filter(id => id).map(id => ({ id: id }));

        const client = {
            id: formData.get('id'),
            name: formData.get('name'),
            subscriptionEndDate: formData.get('subscriptionEndDate'),
            weight: parseFloat(formData.get('weight')),
            height: parseFloat(formData.get('height')),
            age: parseInt(formData.get('age')),
            favoriteIngredients: favoriteIngredients,
            allergyIngredients: allergyIngredients
        };

        fetch('/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(response => response.json()).then(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>
                    <ul>
                        ${data.favoriteIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                    </ul>
                </td>
                <td>
                    <ul>
                        ${data.allergyIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
                    </ul>
                </td>
                <td>${data.subscriptionEndDate}</td>
                <td>${data.weight}</td>
                <td>${data.height}</td>
                <td>${data.age}</td>
                <td>${data.recommendedCalories.toFixed(2)}</td>
            `;
            clientsTable.appendChild(row);
            clientForm.reset();
        });
    });

    deleteClientForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = document.getElementById('deleteClientId').value;

        fetch(`/clients/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const rows = clientsTable.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.children[0].textContent == id) {
                    row.remove();
                }
            });
            deleteClientForm.reset();
        });
    });

    findMenuForm.addEventListener('submit', event => {
        event.preventDefault();
        const clientId = document.getElementById('searchClientId').value;
        const menuResults = document.getElementById('menuResults');
        menuResults.innerHTML = '';

        fetch(`/menus/closest/${clientId}`)
            .then(response => response.json())
            .then(menus => {
                menus.forEach(menu => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h4>Меню ID: ${menu.id}</h4>
                        <p>Загальна Калорійність: ${menu.totalCalories.toFixed(2)} ккал</p>
                        <ul>
                            ${menu.dishes.map(dish => `<li>${dish.name} (Калорійність: ${dish.totalCalories.toFixed(2)} ккал)</li>`).join('')}
                        </ul>
                    `;
                    menuResults.appendChild(div);
                });
            });
    });
});
