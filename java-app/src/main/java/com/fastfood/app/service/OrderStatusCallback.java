package com.fastfood.app.service;

public interface OrderStatusCallback {
    void updateStatus(String orderId, String newStatus);
}