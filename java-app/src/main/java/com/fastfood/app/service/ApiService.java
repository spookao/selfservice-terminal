package com.fastfood.app.service;

import com.fastfood.app.model.Order;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ApiService {

    private static final String API_URL = "http://localhost:3000/api";
    private final OkHttpClient httpClient;
    
    public ApiService() {
        this.httpClient = new OkHttpClient();
    }
    
    public List<Order> fetchOrders() throws IOException {
        List<Order> fetchedOrders = new ArrayList<>();
        
        Request request = new Request.Builder()
                .url(API_URL + "/orders")
                .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            
            String responseData = response.body().string();
            JSONArray ordersArray = new JSONArray(responseData);
            
            for (int i = 0; i < ordersArray.length(); i++) {
                JSONObject orderJson = ordersArray.getJSONObject(i);
                Order order = new Order(orderJson);
                fetchedOrders.add(order);
            }
        }
        
        return fetchedOrders;
    }
    
    public boolean updateOrderStatus(String orderId, String newStatus) throws IOException {
        JSONObject jsonBody = new JSONObject();
        jsonBody.put("status", newStatus);
        
        RequestBody body = RequestBody.create(
                jsonBody.toString(),
                MediaType.parse("application/json; charset=utf-8")
        );
        
        Request request = new Request.Builder()
                .url(API_URL + "/orders/" + orderId)
                .patch(body)
                .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
}