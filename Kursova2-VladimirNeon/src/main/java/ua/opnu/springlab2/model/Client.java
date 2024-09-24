package ua.opnu.springlab2.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private LocalDate subscriptionEndDate;

    @ManyToMany
    @JoinTable(
            name = "favorite_ingredients",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> favoriteIngredients;

    @ManyToMany
    @JoinTable(
            name = "allergy_ingredients",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> allergyIngredients;

    private double weight;
    private double height;
    private int age;
    private double recommendedCalories;
}