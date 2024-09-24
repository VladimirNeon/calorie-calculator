

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form.login");
    const warningText = document.querySelector(".warning-text");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.querySelector(".login__input--user").value;
        const password = document.querySelector(".login__input--password").value;


        warningText.textContent = "";


        if (!username || !password) {
            warningText.textContent = "Будь ласка, заповніть усі поля.";
            return;
        }

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            if (response.ok) {
                window.location.href = "/web/main.html";
            } else {
                const errorText = await response.text();
                warningText.textContent = "Помилка входу: " + errorText;
            }
        } catch (error) {
            console.error("Error during login:", error);
            warningText.textContent = "Сталася помилка під час спроби входу.";
        }
    });
});
