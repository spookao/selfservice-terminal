const menuData = {
    burgers: [
        {
            id: 'b1',
            name: 'Hambúrguer Clássico',
            description: 'Hambúrguer de carne bovina, queijo, alface, tomate e molho especial',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                ingredients: [
                    { id: 'i1', name: 'Queijo Extra', price: 0.50, default: false },
                    { id: 'i2', name: 'Bacon', price: 1.00, default: false },
                    { id: 'i3', name: 'Cebola Caramelizada', price: 0.75, default: false },
                    { id: 'i4', name: 'Alface', price: 0, default: true },
                    { id: 'i5', name: 'Tomate', price: 0, default: true },
                    { id: 'i6', name: 'Picles', price: 0, default: false }
                ],
                sauces: [
                    { id: 's1', name: 'Molho Especial', price: 0, default: true },
                    { id: 's2', name: 'Maionese', price: 0, default: false },
                    { id: 's3', name: 'Ketchup', price: 0, default: false },
                    { id: 's4', name: 'Mostarda', price: 0, default: false },
                    { id: 's5', name: 'Barbecue', price: 0.50, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Normal', price: 0, default: true },
                    { id: 'sz2', name: 'Grande (+50g)', price: 2.00, default: false }
                ]
            }
        },
        {
            id: 'b2',
            name: 'Cheeseburger Duplo',
            description: 'Dois hambúrgueres, queijo duplo, bacon, cebola e molho especial',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                ingredients: [
                    { id: 'i1', name: 'Queijo Extra', price: 0.50, default: false },
                    { id: 'i2', name: 'Bacon Extra', price: 1.00, default: false },
                    { id: 'i3', name: 'Cebola Caramelizada', price: 0.75, default: false },
                    { id: 'i4', name: 'Alface', price: 0, default: false },
                    { id: 'i5', name: 'Tomate', price: 0, default: false },
                    { id: 'i6', name: 'Picles', price: 0, default: false }
                ],
                sauces: [
                    { id: 's1', name: 'Molho Especial', price: 0, default: true },
                    { id: 's2', name: 'Maionese', price: 0, default: false },
                    { id: 's3', name: 'Ketchup', price: 0, default: false },
                    { id: 's4', name: 'Mostarda', price: 0, default: false },
                    { id: 's5', name: 'Barbecue', price: 0.50, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Normal', price: 0, default: true },
                    { id: 'sz2', name: 'Grande (+50g por hambúrguer)', price: 3.00, default: false }
                ]
            }
        },
        {
            id: 'b3',
            name: 'Hambúrguer Vegetariano',
            description: 'Hambúrguer de grão-de-bico, queijo, alface, tomate e molho especial',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                ingredients: [
                    { id: 'i1', name: 'Queijo Extra', price: 0.50, default: false },
                    { id: 'i3', name: 'Cebola Caramelizada', price: 0.75, default: false },
                    { id: 'i4', name: 'Alface', price: 0, default: true },
                    { id: 'i5', name: 'Tomate', price: 0, default: true },
                    { id: 'i6', name: 'Picles', price: 0, default: false },
                    { id: 'i7', name: 'Abacate', price: 1.00, default: false }
                ],
                sauces: [
                    { id: 's1', name: 'Molho Especial Vegano', price: 0, default: true },
                    { id: 's2', name: 'Maionese Vegana', price: 0, default: false },
                    { id: 's3', name: 'Ketchup', price: 0, default: false },
                    { id: 's4', name: 'Mostarda', price: 0, default: false },
                    { id: 's5', name: 'Hummus', price: 0.50, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Normal', price: 0, default: true },
                    { id: 'sz2', name: 'Grande (+50g)', price: 2.00, default: false }
                ]
            }
        }
    ],
    sides: [
        {
            id: 's1',
            name: 'Batatas Fritas',
            description: 'Batatas fritas crocantes com sal',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                size: [
                    { id: 'sz1', name: 'Pequena', price: 0, default: false },
                    { id: 'sz2', name: 'Média', price: 1.00, default: true },
                    { id: 'sz3', name: 'Grande', price: 2.00, default: false }
                ],
                extras: [
                    { id: 'e1', name: 'Queijo Cheddar', price: 1.00, default: false },
                    { id: 'e2', name: 'Bacon', price: 1.50, default: false }
                ]
            }
        },
        {
            id: 's2',
            name: 'Nuggets de Frango',
            description: '6 unidades de nuggets de frango crocantes',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                size: [
                    { id: 'sz1', name: '6 unidades', price: 0, default: true },
                    { id: 'sz2', name: '9 unidades', price: 2.00, default: false },
                    { id: 'sz3', name: '12 unidades', price: 3.50, default: false }
                ],
                sauces: [
                    { id: 's1', name: 'Ketchup', price: 0, default: true },
                    { id: 's2', name: 'Barbecue', price: 0, default: false },
                    { id: 's3', name: 'Mostarda e Mel', price: 0, default: false },
                    { id: 's4', name: 'Maionese', price: 0, default: false }
                ]
            }
        }
    ],
    drinks: [
        {
            id: 'd1',
            name: 'Refrigerante',
            description: 'Coca-Cola, Pepsi, Sprite, Fanta',
            price: 1.99,
            image: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                type: [
                    { id: 't1', name: 'Coca-Cola', price: 0, default: true },
                    { id: 't2', name: 'Pepsi', price: 0, default: false },
                    { id: 't3', name: 'Sprite', price: 0, default: false },
                    { id: 't4', name: 'Fanta Laranja', price: 0, default: false },
                    { id: 't5', name: 'Fanta Uva', price: 0, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Pequeno (300ml)', price: 0, default: false },
                    { id: 'sz2', name: 'Médio (500ml)', price: 1.00, default: true },
                    { id: 'sz3', name: 'Grande (700ml)', price: 1.50, default: false }
                ],
                ice: [
                    { id: 'i1', name: 'Com Gelo', price: 0, default: true },
                    { id: 'i2', name: 'Sem Gelo', price: 0, default: false }
                ]
            }
        },
        {
            id: 'd2',
            name: 'Água Mineral',
            description: 'Água mineral sem gás',
            price: 1.50,
            image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: false
        },
        {
            id: 'd3',
            name: 'Sumo Natural',
            description: 'Laranja, Limão, Morango',
            price: 3.50,
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                type: [
                    { id: 't1', name: 'Laranja', price: 0, default: true },
                    { id: 't2', name: 'Limão', price: 0, default: false },
                    { id: 't3', name: 'Morango', price: 0.50, default: false },
                    { id: 't4', name: 'Ananás', price: 0.50, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Pequeno (300ml)', price: 0, default: false },
                    { id: 'sz2', name: 'Médio (500ml)', price: 1.00, default: true },
                    { id: 'sz3', name: 'Grande (700ml)', price: 1.50, default: false }
                ],
                sugar: [
                    { id: 'sg1', name: 'Com Açúcar', price: 0, default: true },
                    { id: 'sg2', name: 'Sem Açúcar', price: 0, default: false }
                ]
            }
        }
    ],
    desserts: [
        {
            id: 'ds1',
            name: 'Gelado',
            description: 'Baunilha, Chocolate, Morango',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                flavor: [
                    { id: 'f1', name: 'Baunilha', price: 0, default: true },
                    { id: 'f2', name: 'Chocolate', price: 0, default: false },
                    { id: 'f3', name: 'Morango', price: 0, default: false },
                    { id: 'f4', name: 'Caramelo', price: 0, default: false }
                ],
                toppings: [
                    { id: 'tp1', name: 'Calda de Chocolate', price: 0.50, default: false },
                    { id: 'tp2', name: 'Calda de Caramelo', price: 0.50, default: false },
                    { id: 'tp3', name: 'Calda de Morango', price: 0.50, default: false },
                    { id: 'tp4', name: 'Granulado', price: 0.50, default: false },
                    { id: 'tp5', name: 'Amendoim', price: 0.50, default: false }
                ],
                size: [
                    { id: 'sz1', name: 'Pequeno', price: 0, default: false },
                    { id: 'sz2', name: 'Médio', price: 1.00, default: true },
                    { id: 'sz3', name: 'Grande', price: 1.50, default: false }
                ]
            }
        },
        {
            id: 'ds2',
            name: 'Brownie de Chocolate',
            description: 'Brownie quente com calda de chocolate',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                toppings: [
                    { id: 'tp1', name: 'Calda de Chocolate Extra', price: 0.50, default: false },
                    { id: 'tp2', name: 'Gelado de Baunilha', price: 1.50, default: false },
                    { id: 'tp3', name: 'Chantilly', price: 0.50, default: false },
                    { id: 'tp4', name: 'Nozes', price: 0.75, default: false }
                ]
            }
        }
    ],
    combos: [
        {
            id: 'c1',
            name: 'Menu Clássico',
            description: 'Hambúrguer Clássico, Batatas Médias e Bebida',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                burger: [
                    { id: 'b1', name: 'Hambúrguer Clássico', price: 0, default: true },
                    { id: 'b2', name: 'Cheeseburger Duplo', price: 3.00, default: false },
                    { id: 'b3', name: 'Hambúrguer Vegetariano', price: 1.00, default: false }
                ],
                sides: [
                    { id: 's1', name: 'Batatas Pequenas', price: -1.00, default: false },
                    { id: 's2', name: 'Batatas Médias', price: 0, default: true },
                    { id: 's3', name: 'Batatas Grandes', price: 1.00, default: false },
                    { id: 's4', name: 'Nuggets (6 unidades)', price: 1.00, default: false }
                ],
                drinks: [
                    { id: 'd1', name: 'Refrigerante Pequeno', price: -0.50, default: false },
                    { id: 'd2', name: 'Refrigerante Médio', price: 0, default: true },
                    { id: 'd3', name: 'Refrigerante Grande', price: 0.50, default: false },
                    { id: 'd4', name: 'Água Mineral', price: -0.50, default: false },
                    { id: 'd5', name: 'Sumo Natural Médio', price: 1.50, default: false }
                ]
            }
        },
        {
            id: 'c2',
            name: 'Menu Família',
            description: '2 Hambúrgueres, 2 Batatas Grandes, 2 Bebidas e 1 Sobremesa',
            price: 19.99,
            image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            customizable: true,
            customizationOptions: {
                burgers: [
                    { id: 'b1', name: '2 Hambúrgueres Clássicos', price: 0, default: true },
                    { id: 'b2', name: '2 Cheeseburgers Duplos', price: 6.00, default: false },
                    { id: 'b3', name: '1 Clássico + 1 Duplo', price: 3.00, default: false },
                    { id: 'b4', name: '1 Clássico + 1 Vegetariano', price: 1.00, default: false }
                ],
                sides: [
                    { id: 's1', name: '2 Batatas Médias', price: -2.00, default: false },
                    { id: 's2', name: '2 Batatas Grandes', price: 0, default: true },
                    { id: 's3', name: '1 Batata Grande + 1 Nuggets', price: 0, default: false }
                ],
                drinks: [
                    { id: 'd1', name: '2 Refrigerantes Médios', price: -1.00, default: false },
                    { id: 'd2', name: '2 Refrigerantes Grandes', price: 0, default: true },
                    { id: 'd3', name: '2 Águas Minerais', price: -2.00, default: false },
                    { id: 'd4', name: '2 Sumos Naturais Médios', price: 3.00, default: false }
                ],
                dessert: [
                    { id: 'ds1', name: 'Gelado Médio', price: 0, default: true },
                    { id: 'ds2', name: 'Brownie de Chocolate', price: 1.00, default: false }
                ]
            }
        }
    ]
};