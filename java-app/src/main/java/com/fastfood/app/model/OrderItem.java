package com.fastfood.app.model;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class OrderItem {

    private final String id;
    private final String name;
    private final double basePrice;
    private final double totalPrice;
    private final int quantity;
    private final List<Customization> customizations;
    
    public OrderItem(JSONObject json) {
        this.id = json.getString("id");
        this.name = json.getString("name");
        this.basePrice = json.getDouble("basePrice");
        this.totalPrice = json.getDouble("totalPrice");
        this.quantity = json.getInt("quantity");
        
        this.customizations = new ArrayList<>();
        if (json.has("customizations")) {
            JSONArray customizationsArray = json.getJSONArray("customizations");
            for (int i = 0; i < customizationsArray.length(); i++) {
                JSONObject customizationJson = customizationsArray.getJSONObject(i);
                Customization customization = new Customization(customizationJson);
                this.customizations.add(customization);
            }
        }
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public double getBasePrice() {
        return basePrice;
    }
    
    public double getTotalPrice() {
        return totalPrice;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public List<Customization> getCustomizations() {
        return customizations;
    }
}