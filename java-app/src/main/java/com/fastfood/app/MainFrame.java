package com.fastfood.app;

import com.fastfood.app.model.Order;
import com.fastfood.app.service.ApiService;
import com.fastfood.app.service.OrderStatusCallback;
import com.fastfood.app.service.SocketService;
import com.fastfood.app.ui.OrdersTabPanel;
import com.fastfood.app.util.SoundUtil;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainFrame extends JFrame implements OrderStatusCallback, SocketService.SocketEventListener {

    private final OrdersTabPanel ordersTabPanel;
    private final JLabel statusLabel;
    private final List<Order> orders = new ArrayList<>();
    private final ApiService apiService;
    private final SocketService socketService;
    
    public MainFrame() {
        setTitle("FastFood - Gestão de Pedidos");
        setSize(1200, 800);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        apiService = new ApiService();
        socketService = new SocketService();
        socketService.addListener(this);

        JPanel headerPanel = createHeaderPanel();
        add(headerPanel, BorderLayout.NORTH);

        ordersTabPanel = new OrdersTabPanel();
        add(ordersTabPanel, BorderLayout.CENTER);

        JPanel footerPanel = createFooterPanel();
        add(footerPanel, BorderLayout.SOUTH);

        statusLabel = new JLabel("Conectando ao servidor...");
        statusLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        footerPanel.add(statusLabel, BorderLayout.WEST);

        new Thread(socketService::connect).start();
        loadOrders();
    }
    
    private JPanel createHeaderPanel() {
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(new Color(255, 107, 0));
        headerPanel.setBorder(new EmptyBorder(10, 20, 10, 20));
        
        JLabel titleLabel = new JLabel("FastFood - Gestão de Pedidos");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);
        headerPanel.add(titleLabel, BorderLayout.WEST);
        
        return headerPanel;
    }
    
    private JPanel createFooterPanel() {
        JPanel footerPanel = new JPanel(new BorderLayout());
        footerPanel.setBorder(new EmptyBorder(10, 20, 10, 20));
        
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton refreshButton = new JButton("Atualizar");
        refreshButton.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        refreshButton.addActionListener(this::refreshOrders);
        buttonPanel.add(refreshButton);
        
        footerPanel.add(buttonPanel, BorderLayout.EAST);
        
        return footerPanel;
    }
    
    private void loadOrders() {
        new SwingWorker<List<Order>, Void>() {
            @Override
            protected List<Order> doInBackground() {
                try {
                    return apiService.fetchOrders();
                } catch (IOException e) {
                    e.printStackTrace();
                    SwingUtilities.invokeLater(() -> 
                        statusLabel.setText("Erro ao carregar pedidos")
                    );
                    return new ArrayList<>();
                }
            }
            
            @Override
            protected void done() {
                try {
                    orders.clear();
                    orders.addAll(get());
                    ordersTabPanel.updateOrders(orders, MainFrame.this);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }.execute();
    }
    
    private void refreshOrders(ActionEvent e) {
        loadOrders();
    }
    
    @Override
    public void updateStatus(String orderId, String newStatus) {
        new SwingWorker<Boolean, Void>() {
            @Override
            protected Boolean doInBackground() {
                try {
                    return apiService.updateOrderStatus(orderId, newStatus);
                } catch (IOException e) {
                    e.printStackTrace();
                    return false;
                }
            }
            
            @Override
            protected void done() {
                try {
                    if (get()) {
                        loadOrders();
                    } else {
                        JOptionPane.showMessageDialog(
                                MainFrame.this,
                                "Erro ao atualizar o status do pedido",
                                "Erro",
                                JOptionPane.ERROR_MESSAGE
                        );
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }.execute();
    }
    
    @Override
    public void onConnect() {
        SwingUtilities.invokeLater(() -> 
            statusLabel.setText("Conectado ao servidor")
        );
    }
    
    @Override
    public void onDisconnect() {
        SwingUtilities.invokeLater(() -> 
            statusLabel.setText("Desconectado do servidor")
        );
    }
    
    @Override
    public void onNewOrder() {
        SoundUtil.playNotificationSound();
        loadOrders();
        SwingUtilities.invokeLater(() -> {
            if (!orders.isEmpty()) {
                Order newOrder = orders.get(0);
                statusLabel.setText("Novo pedido recebido: #" + newOrder.getOrderNumber());
            }
        });
    }
    
    @Override
    public void onOrderUpdated() {
        loadOrders();
    }
}