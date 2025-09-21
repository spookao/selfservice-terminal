package com.fastfood.app.service;

import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class SocketService {

    private static final String SOCKET_URL = "http://localhost:3000";
    private Socket socket;
    private final List<SocketEventListener> listeners = new ArrayList<>();
    
    public interface SocketEventListener {
        void onConnect();
        void onDisconnect();
        void onNewOrder();
        void onOrderUpdated();
    }
    
    public void connect() {
        try {
            socket = IO.socket(SOCKET_URL);
            
            socket.on(Socket.EVENT_CONNECT, args -> {
                for (SocketEventListener listener : listeners) {
                    listener.onConnect();
                }
            });
            
            socket.on(Socket.EVENT_DISCONNECT, args -> {
                for (SocketEventListener listener : listeners) {
                    listener.onDisconnect();
                }
            });
            
            socket.on("newOrder", args -> {
                for (SocketEventListener listener : listeners) {
                    listener.onNewOrder();
                }
            });
            
            socket.on("orderUpdated", args -> {
                for (SocketEventListener listener : listeners) {
                    listener.onOrderUpdated();
                }
            });
            
            socket.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
    
    public void disconnect() {
        if (socket != null) {
            socket.disconnect();
        }
    }
    
    public void addListener(SocketEventListener listener) {
        listeners.add(listener);
    }
    
    public void removeListener(SocketEventListener listener) {
        listeners.remove(listener);
    }
    
    public boolean isConnected() {
        return socket != null && socket.connected();
    }
}