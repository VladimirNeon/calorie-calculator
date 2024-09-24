document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const warningText = document.getElementById("registerWarningText");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        let errorMessage = "";


        const username = form.querySelector(".login__input--user").value;
        const email = form.querySelector(".login__input--email").value;
        const password = form.querySelectorAll(".login__input--password")[0].value;
        const passwordConfirm = form.querySelectorAll(".login__input--password")[1].value;


        if (username.length < 4) {
            errorMessage = "Ім'я користувача має бути довшим за 4 символи!";
        } else if (!validateEmail(email)) {
            errorMessage = "Введіть правильну адресу електронної пошти!";
        } else if (!validatePassword(password)) {
            errorMessage = "Пароль повинен бути не менше 8 символів, містити хоча б одну цифру, одну заголовну та одну малу літеру.";
        } else if (password !== passwordConfirm) {
            errorMessage = "Паролі не співпадають!";
        }


        if (errorMessage) {
            warningText.textContent = errorMessage;
            warningText.classList.add("active");
            return;
        }


        const userExists = await checkUserExists(username, email);
        if (userExists) {
            warningText.textContent = "Користувач із таким username або email вже існує.";
            warningText.classList.add("active");
            return;
        }


        warningText.textContent = "";
        warningText.classList.remove("active");


        registerUser(username, email, password);
    });


    async function checkUserExists(username, email) {
        const response = await fetch(`http://localhost:8080/api/users/exists?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return response.json();
    }


    function registerUser(username, email, password) {
        const userData = { username, email, password };

        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Реєстрація пройшла успішно!");
                    window.location.href = "../login.html";
                } else {
                    response.json().then((data) => {
                        alert(`Помилка реєстрації: ${data.message}`);
                    });
                }
            })
            .catch((error) => {
                console.error("Помилка при надсиланні даних:", error);
                alert("Помилка під час реєстрації. Спробуйте ще раз.");
            });
    }

   
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(String(password));
    }
});