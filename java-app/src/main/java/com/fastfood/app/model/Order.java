package com.fastfood.app.model;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Order {

    private final String id;
    private final int orderNumber;
    private final List<OrderItem> items;
    private final double total;
    private final String paymentMethod;
    private final String status;
    private final Date timestamp;
    
    public Order(JSONObject json) {
        this.id = json.getString("_id");
        this.orderNumber = json.getInt("orderNumber");
        this.total = json.getDouble("total");
        this.paymentMethod = json.getString("paymentMethod");
        this.status = json.getString("status");

        String ts = json.getString("timestamp");
        OffsetDateTime odt = OffsetDateTime.parse(ts, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        this.timestamp = Date.from(odt.toInstant());
        
        this.items = new ArrayList<>();
        JSONArray itemsArray = json.getJSONArray("items");
        for (int i = 0; i < itemsArray.length(); i++) {
            JSONObject itemJson = itemsArray.getJSONObject(i);
            OrderItem item = new OrderItem(itemJson);
            this.items.add(item);
        }
    }
    
    public String getId() {
        return id;
    }
    
    public int getOrderNumber() {
        return orderNumber;
    }
    
    public List<OrderItem> getItems() {
        return items;
    }
    
    public double getTotal() {
        return total;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public String getStatus() {
        return status;
    }
    
    public Date getTimestamp() {
        return timestamp;
    }
    
    public String getFormattedTimestamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return sdf.format(timestamp);
    }
    
    public String getPaymentMethodDisplay() {
        switch (paymentMethod) {
            case "counter":
                return "Pagar no Balcão";
            case "card":
                return "Cartão Bancário";
            case "mbway":
                return "MB WAY";
            default:
                return paymentMethod;
        }
    }
}