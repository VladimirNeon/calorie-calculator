# Курсовий проект: Веб-додаток для створення меню, та підрахунку калорій

## Опис проєкту

Цей проект представляє собою веб-додаток для управління клієнтами, стравами, інгредієнтами та меню. Основна мета додатку - надавати можливість керувати інформацією про страви та їх склад, додавати нових клієнтів та створювати індивідуальні меню на основі вибраних інгредієнтів.

Проект реалізований на основі фреймворку Spring з використанням Spring Boot, Spring Security для захисту додатку, JPA для роботи з базою даних, а також технології AOP (ас-пектно-орієнтоване програмування) для журналювання основних операцій.

## Основні функції:
- Реєстрація та аутентифікація користувачів.
- Управління клієнтами, стравами, інгредієнтами та меню.
- Журналювання операцій додавання, видалення та отримання даних.
- Захищений доступ до ресурсів додатку за допомогою Spring Security.
  
## Стек технологій:
- **Java 17**
- **Spring Boot 3.x**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL**
- **AspectJ (для AOP)**
  
## Розгортання проекту

### Налаштування бази даних
1. Для розгортання проекту вам потрібно відредагувати конфігураційний файл `application.yml`, щоб налаштувати підключення до бази даних. Ось приклад, який можна змінити під вашу базу даних:

    ```yaml
    spring:
      datasource:
        url: jdbc:postgresql://localhost:5432/your_db_name
        username: your_db_username
        password: your_db_password
        driver-class-name: org.postgresql.Driver
      jpa:
        hibernate:
          ddl-auto: update
    ```

   Змініть `your_db_name`, `your_db_username` та `your_db_password` на свої дані.

2. Проект працює на локальному сервері за адресою: `http://localhost:8080`.

### Запуск проекту
1. Клонувати репозиторій:

    ```bash
    git clone https://github.com/your-repo-name.git
    ```

2. Відкрити проект у вашій IDE та переконатися, що встановлено Java 17.

3. Запустити проект за допомогою наступної команди (якщо використовується Maven):

    ```bash
    mvn spring-boot:run
    ```

4. Проект стане доступним за адресою `http://localhost:8080`.

### Особливості проекту
- Ви можете зайти в додаток за допомогою сторінки входу за адресою `/web/login.html`.
- Після успішної автентифікації ви потрапите на головну сторінку `/web/main.html`.
- Використовується Spring Security для захисту ресурсів. Сторінки керування клієнтами, стравами, інгредієнтами та меню вимагають аутентифікації.
  
## Як користуватися додатком

1. Реєстрація: Використовуйте сторінку `/register` для створення нового користувача.
2. Вхід: Використовуйте сторінку `/login` для аутентифікації.
3. Операції з клієнтами, стравами та інгредієнтами:
   - Додавання, редагування та видалення клієнтів і страв доступні через відповідні API `/api/clients`, `/api/dishes` тощо.
   - Всі дії з даними будуть журналюватися за допомогою AOP, включаючи додавання, отримання та видалення записів.

## Висновок

Цей проект реалізує основні принципи сучасної веб-розробки на базі Spring Framework. Він включає в себе надійне управління даними через REST API, захист за допомогою Spring Security, а також гнучке журналювання за допомогою аспектно-орієнтованого програмування (AOP).
