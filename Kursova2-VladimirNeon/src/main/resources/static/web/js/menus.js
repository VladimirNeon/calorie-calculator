document.addEventListener('DOMContentLoaded', () => {
    const menuTable = document.querySelector('#menuTable tbody');
    const menuForm = document.getElementById('menuForm');
    const deleteMenuForm = document.getElementById('deleteMenuForm');
    const addDishButton = document.getElementById('addDishButton');

    fetch('/menus')
        .then(response => response.json())
        .then(data => {
            data.forEach(menu => {
                const row = document.createElement('tr');
                const totalCalories = menu.dishes.reduce((total, dish) => {
                    return total + dish.dishIngredients.reduce((dishTotal, di) => {
                        return dishTotal + (di.grams * di.ingredient.caloriesPerGram);
                    }, 0);
                }, 0);
                row.innerHTML = `
                    <td>${menu.id}</td>
                    <td>
                        <ul>
                            ${menu.dishes.map(dish => `
                                <li>${dish.name}:
                                    <ul>
                                        ${dish.dishIngredients.map(di => `<li>${di.ingredient.name} - ${di.grams} г</li>`).join('')}
                                    </ul>
                                </li>
                            `).join('')}
                        </ul>
                    </td>
                    <td>${totalCalories}</td>
                `;
                menuTable.appendChild(row);
            });
        });

    addDishButton.addEventListener('click', () => {
        const dishesList = document.getElementById('dishesList');
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="number" name="dishId" placeholder="ID Страви" required />
        `;
        dishesList.appendChild(div);
    });

    menuForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(menuForm);
        const dishes = formData.getAll('dishId').map(dishId => ({ id: dishId }));

        const menu = {
            id: formData.get('id'),
            dishes: dishes
        };

        fetch('/menus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)
        })
            .then(response => response.json())
            .then(data => {
                const row = document.createElement('tr');
                const totalCalories = data.dishes.reduce((total, dish) => {
                    return total + dish.dishIngredients.reduce((dishTotal, di) => {
                        return dishTotal + (di.grams * di.ingredient.caloriesPerGram);
                    }, 0);
                }, 0);
                row.innerHTML = `
                <td>${data.id}</td>
                <td>
                    <ul>
                        ${data.dishes.map(dish => `
                            <li>${dish.name}:
                                <ul>
                                    ${dish.dishIngredients.map(di => `<li>${di.ingredient.name} - ${di.grams} г</li>`).join('')}
                                </ul>
                            </li>
                        `).join('')}
                    </ul>
                </td>
                <td>${totalCalories}</td>
            `;
                menuTable.appendChild(row);
                menuForm.reset();
            });
    });

    deleteMenuForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = document.getElementById('deleteMenuId').value;

        fetch(`/menus/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const rows = menuTable.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.children[0].textContent == id) {
                    row.remove();
                }
            });
            deleteMenuForm.reset();
        });
    });
});