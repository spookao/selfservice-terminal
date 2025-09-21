package com.fastfood.app.model;

import org.json.JSONObject;

public class Customization {

    private final String category;
    private final String id;
    private final String name;
    private final double price;
    
    public Customization(JSONObject json) {
        this.category = json.getString("category");
        this.id = json.getString("id");
        this.name = json.getString("name");
        this.price = json.getDouble("price");
    }
    
    public String getCategory() {
        return category;
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public double getPrice() {
        return price;
    }
    
    public static String getCategoryDisplayName(String category) {
        switch (category) {
            case "ingredients": return "Ingredientes";
            case "sauces": return "Molhos";
            case "size": return "Tamanho";
            case "extras": return "Extras";
            case "type": return "Tipo";
            case "ice": return "Gelo";
            case "sugar": return "Açúcar";
            case "flavor": return "Sabor";
            case "toppings": return "Coberturas";
            case "burger": return "Hambúrguer";
            case "sides": return "Acompanhamentos";
            case "drinks": return "Bebidas";
            case "dessert": return "Sobremesa";
            case "burgers": return "Hambúrgueres";
            default: return category.substring(0, 1).toUpperCase() + category.substring(1);
        }
    }
}