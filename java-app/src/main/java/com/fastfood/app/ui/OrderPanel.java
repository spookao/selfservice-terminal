package com.fastfood.app.ui;

import com.fastfood.app.model.Customization;
import com.fastfood.app.model.Order;
import com.fastfood.app.model.OrderItem;
import com.fastfood.app.service.OrderStatusCallback;
import net.miginfocom.swing.MigLayout;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderPanel extends JPanel {
    
    public OrderPanel(Order order, OrderStatusCallback callback) {
        setLayout(new MigLayout("fillx", "[grow][]"));
        setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createMatteBorder(0, 0, 1, 0, Color.LIGHT_GRAY),
                new EmptyBorder(15, 15, 15, 15)
        ));
        setBackground(Color.WHITE);

        JPanel infoPanel = new JPanel(new MigLayout("fillx", "[grow][]"));
        infoPanel.setOpaque(false);

        JLabel orderNumberLabel = new JLabel("Pedido #" + order.getOrderNumber());
        orderNumberLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        infoPanel.add(orderNumberLabel, "split 2");
        
        JLabel timestampLabel = new JLabel(order.getFormattedTimestamp());
        timestampLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        timestampLabel.setForeground(Color.GRAY);
        infoPanel.add(timestampLabel, "wrap");

        JLabel paymentMethodLabel = new JLabel("Pagamento: " + order.getPaymentMethodDisplay());
        paymentMethodLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        infoPanel.add(paymentMethodLabel, "wrap");

        JLabel totalLabel = new JLabel(String.format("Total: €%.2f", order.getTotal()));
        totalLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        infoPanel.add(totalLabel, "wrap");

        JLabel statusLabel = new JLabel("Status: " + getStatusDisplay(order.getStatus()));
        statusLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        infoPanel.add(statusLabel, "wrap");
        
        add(infoPanel, "grow");

        JPanel actionsPanel = new JPanel(new MigLayout("", "[]", "[][]"));
        actionsPanel.setOpaque(false);
        
        JButton viewDetailsButton = new JButton("Ver Detalhes");
        viewDetailsButton.addActionListener(e -> showOrderDetails(order));
        actionsPanel.add(viewDetailsButton, "wrap");

        if (order.getStatus().equals("pending")) {
            JButton prepareButton = new JButton("Preparar");
            prepareButton.addActionListener(e -> callback.updateStatus(order.getId(), "preparing"));
            actionsPanel.add(prepareButton, "split 2");
            
            JButton cancelButton = new JButton("Cancelar");
            cancelButton.setForeground(Color.RED);
            cancelButton.addActionListener(e -> {
                int option = JOptionPane.showConfirmDialog(
                        this,
                        "Tem certeza que deseja cancelar o pedido #" + order.getOrderNumber() + "?",
                        "Confirmar Cancelamento",
                        JOptionPane.YES_NO_OPTION,
                        JOptionPane.WARNING_MESSAGE
                );
                
                if (option == JOptionPane.YES_OPTION) {
                    callback.updateStatus(order.getId(), "cancelled");
                }
            });
            actionsPanel.add(cancelButton);
        } else if (order.getStatus().equals("preparing")) {
            JButton completeButton = new JButton("Concluir");
            completeButton.addActionListener(e -> callback.updateStatus(order.getId(), "completed"));
            actionsPanel.add(completeButton, "split 2");
            
            JButton cancelButton = new JButton("Cancelar");
            cancelButton.setForeground(Color.RED);
            cancelButton.addActionListener(e -> {
                int option = JOptionPane.showConfirmDialog(
                        this,
                        "Tem certeza que deseja cancelar o pedido #" + order.getOrderNumber() + "?",
                        "Confirmar Cancelamento",
                        JOptionPane.YES_NO_OPTION,
                        JOptionPane.WARNING_MESSAGE
                );
                
                if (option == JOptionPane.YES_OPTION) {
                    callback.updateStatus(order.getId(), "cancelled");
                }
            });
            actionsPanel.add(cancelButton);
        } else if (order.getStatus().equals("completed")) {
            JButton archiveButton = new JButton("Arquivar");
            archiveButton.addActionListener(e -> callback.updateStatus(order.getId(), "archived"));
            actionsPanel.add(archiveButton);
        }
        
        add(actionsPanel, "top");
    }
    
    private String getStatusDisplay(String status) {
        switch (status) {
            case "pending": return "Pendente";
            case "preparing": return "Em Preparo";
            case "completed": return "Concluído";
            case "cancelled": return "Cancelado";
            case "archived": return "Arquivado";
            default: return status;
        }
    }
    
    private void showOrderDetails(Order order) {
        JDialog dialog = new JDialog();
        dialog.setTitle("Detalhes do Pedido #" + order.getOrderNumber());
        dialog.setLayout(new BorderLayout());
        dialog.setSize(600, 500);
        dialog.setLocationRelativeTo(this);
        dialog.setModal(true);
        
        JPanel contentPanel = new JPanel(new MigLayout("fillx", "[grow]"));
        contentPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JLabel headerLabel = new JLabel("Pedido #" + order.getOrderNumber());
        headerLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));
        contentPanel.add(headerLabel, "wrap");
        
        JLabel timestampLabel = new JLabel("Data: " + order.getFormattedTimestamp());
        timestampLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        contentPanel.add(timestampLabel, "wrap");
        
        JLabel paymentLabel = new JLabel("Pagamento: " + order.getPaymentMethodDisplay());
        paymentLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        contentPanel.add(paymentLabel, "wrap 20");

        JLabel itemsHeaderLabel = new JLabel("Itens do Pedido:");
        itemsHeaderLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        contentPanel.add(itemsHeaderLabel, "wrap 10");
        
        for (OrderItem item : order.getItems()) {
            JPanel itemPanel = new JPanel(new MigLayout("fillx", "[grow][]"));
            itemPanel.setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, Color.LIGHT_GRAY));
            itemPanel.setOpaque(false);
            
            JLabel itemNameLabel = new JLabel(item.getName() + " x" + item.getQuantity());
            itemNameLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            itemPanel.add(itemNameLabel, "wrap");

            if (!item.getCustomizations().isEmpty()) {
                StringBuilder customizationsText = new StringBuilder("<html>");

                Map<String, List<String>> customizationsByCategory = new HashMap<>();
                for (Customization customization : item.getCustomizations()) {
                    if (!customizationsByCategory.containsKey(customization.getCategory())) {
                        customizationsByCategory.put(customization.getCategory(), new ArrayList<>());
                    }
                    customizationsByCategory.get(customization.getCategory()).add(customization.getName());
                }

                for (Map.Entry<String, List<String>> entry : customizationsByCategory.entrySet()) {
                    String categoryName = Customization.getCategoryDisplayName(entry.getKey());
                    String options = String.join(", ", entry.getValue());
                    customizationsText.append("<b>").append(categoryName).append(":</b> ").append(options).append("<br>");
                }
                
                customizationsText.append("</html>");
                
                JLabel customizationsLabel = new JLabel(customizationsText.toString());
                customizationsLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
                itemPanel.add(customizationsLabel, "wrap");
            }
            
            JLabel itemPriceLabel = new JLabel(String.format("€%.2f", item.getTotalPrice() * item.getQuantity()));
            itemPriceLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
            itemPanel.add(itemPriceLabel, "right");
            
            contentPanel.add(itemPanel, "growx, wrap");
        }

        JPanel totalPanel = new JPanel(new MigLayout("fillx", "[grow][]"));
        totalPanel.setOpaque(false);
        totalPanel.setBorder(new EmptyBorder(10, 0, 0, 0));
        
        JLabel totalLabel = new JLabel("Total");
        totalLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        totalPanel.add(totalLabel);
        
        JLabel totalValueLabel = new JLabel(String.format("€%.2f", order.getTotal()));
        totalValueLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        totalPanel.add(totalValueLabel, "right");
        
        contentPanel.add(totalPanel, "growx, wrap 20");

        JButton closeButton = new JButton("Fechar");
        closeButton.addActionListener(e -> dialog.dispose());
        contentPanel.add(closeButton, "right");
        
        JScrollPane scrollPane = new JScrollPane(contentPanel);
        scrollPane.setBorder(null);
        dialog.add(scrollPane, BorderLayout.CENTER);
        
        dialog.setVisible(true);
    }
}