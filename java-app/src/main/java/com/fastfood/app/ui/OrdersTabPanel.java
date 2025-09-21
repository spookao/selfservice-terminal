package com.fastfood.app.ui;

import com.fastfood.app.model.Order;
import com.fastfood.app.service.OrderStatusCallback;
import net.miginfocom.swing.MigLayout;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class OrdersTabPanel extends JTabbedPane {
    private final JPanel pendingOrdersPanel;
    private final JPanel preparingOrdersPanel;
    private final JPanel completedOrdersPanel;
    
    public OrdersTabPanel() {
        setFont(new Font("Segoe UI", Font.PLAIN, 16));
        
        pendingOrdersPanel = new JPanel();
        pendingOrdersPanel.setLayout(new MigLayout("wrap 1", "[grow]", "[]"));
        JScrollPane pendingScrollPane = new JScrollPane(pendingOrdersPanel);
        pendingScrollPane.getVerticalScrollBar().setUnitIncrement(16);
        
        preparingOrdersPanel = new JPanel();
        preparingOrdersPanel.setLayout(new MigLayout("wrap 1", "[grow]", "[]"));
        JScrollPane preparingScrollPane = new JScrollPane(preparingOrdersPanel);
        preparingScrollPane.getVerticalScrollBar().setUnitIncrement(16);
        
        completedOrdersPanel = new JPanel();
        completedOrdersPanel.setLayout(new MigLayout("wrap 1", "[grow]", "[]"));
        JScrollPane completedScrollPane = new JScrollPane(completedOrdersPanel);
        completedScrollPane.getVerticalScrollBar().setUnitIncrement(16);
        
        addTab("Pedidos Pendentes", new ImageIcon(), pendingScrollPane, "Pedidos aguardando preparo");
        addTab("Em Preparo", new ImageIcon(), preparingScrollPane, "Pedidos em preparo");
        addTab("Concluídos", new ImageIcon(), completedScrollPane, "Pedidos concluídos");
    }
    
    public void updateOrders(List<Order> orders, OrderStatusCallback callback) {
        pendingOrdersPanel.removeAll();
        preparingOrdersPanel.removeAll();
        completedOrdersPanel.removeAll();
        
        int pendingCount = 0;
        int preparingCount = 0;
        int completedCount = 0;
        
        for (Order order : orders) {
            switch (order.getStatus()) {
                case "pending":
                    OrderPanel pendingPanel = new OrderPanel(order, callback);
                    pendingOrdersPanel.add(pendingPanel, "growx");
                    pendingCount++;
                    break;
                case "preparing":
                    OrderPanel preparingPanel = new OrderPanel(order, callback);
                    preparingOrdersPanel.add(preparingPanel, "growx");
                    preparingCount++;
                    break;
                case "completed":
                    OrderPanel completedPanel = new OrderPanel(order, callback);
                    completedOrdersPanel.add(completedPanel, "growx");
                    completedCount++;
                    break;
            }
        }

        if (pendingCount == 0) {
            JLabel emptyPendingLabel = new JLabel("Não há pedidos pendentes");
            emptyPendingLabel.setFont(new Font("Segoe UI", Font.PLAIN, 18));
            emptyPendingLabel.setHorizontalAlignment(SwingConstants.CENTER);
            pendingOrdersPanel.add(emptyPendingLabel, "align center");
        }
        
        if (preparingCount == 0) {
            JLabel emptyPreparingLabel = new JLabel("Não há pedidos em preparo");
            emptyPreparingLabel.setFont(new Font("Segoe UI", Font.PLAIN, 18));
            emptyPreparingLabel.setHorizontalAlignment(SwingConstants.CENTER);
            preparingOrdersPanel.add(emptyPreparingLabel, "align center");
        }
        
        if (completedCount == 0) {
            JLabel emptyCompletedLabel = new JLabel("Não há pedidos concluídos");
            emptyCompletedLabel.setFont(new Font("Segoe UI", Font.PLAIN, 18));
            emptyCompletedLabel.setHorizontalAlignment(SwingConstants.CENTER);
            completedOrdersPanel.add(emptyCompletedLabel, "align center");
        }

        pendingOrdersPanel.revalidate();
        pendingOrdersPanel.repaint();
        preparingOrdersPanel.revalidate();
        preparingOrdersPanel.repaint();
        completedOrdersPanel.revalidate();
        completedOrdersPanel.repaint();

        setTitleAt(0, "Pedidos Pendentes (" + pendingCount + ")");
        setTitleAt(1, "Em Preparo (" + preparingCount + ")");
        setTitleAt(2, "Concluídos (" + completedCount + ")");
    }
}