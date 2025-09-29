import { useState } from 'react';

// CSS Modules simulados como objetos (en un proyecto real serían archivos .module.css)
const sidebarStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  },
  overlayOpen: {
    opacity: 1,
    visibility: 'visible',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarOpen: {
    transform: 'translateX(0)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  },
  closeButtonHover: {
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#6b7280',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.2s ease',
  },
  cartItemHover: {
    backgroundColor: '#f9fafb',
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#111827',
    margin: '0 0 0.25rem 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  itemPrice: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: 0,
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  quantityButton: {
    width: '24px',
    height: '24px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    transition: 'all 0.2s ease',
  },
  quantityButtonHover: {
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
  },
  quantity: {
    fontSize: '0.85rem',
    fontWeight: '500',
    minWidth: '20px',
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  removeButtonHover: {
    backgroundColor: '#fecaca',
    borderColor: '#f87171',
  },
  footer: {
    padding: '1.5rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1rem',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginBottom: '0.5rem',
  },
  checkoutButtonHover: {
    backgroundColor: '#2563eb',
  },
  clearButton: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  clearButtonHover: {
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'relative',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cartButtonHover: {
    backgroundColor: '#2563eb',
  },
};

const SidebarCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          ...sidebarStyles.overlay,
          ...(isOpen ? sidebarStyles.overlayOpen : {})
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        style={{
          ...sidebarStyles.sidebar,
          ...(isOpen ? sidebarStyles.sidebarOpen : {})
        }}
      >
        {/* Header */}
        <div style={sidebarStyles.header}>
          <h2 style={sidebarStyles.title}>
            🛒 Carrito ({getTotalItems()})
          </h2>
          <button
            style={{
              ...sidebarStyles.closeButton,
              ...(hoveredButton === 'close' ? sidebarStyles.closeButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('close')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={sidebarStyles.content}>
          {cartItems.length === 0 ? (
            <div style={sidebarStyles.emptyState}>
              <div style={sidebarStyles.emptyIcon}>🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  ...sidebarStyles.cartItem,
                  ...(hoveredItem === item.id ? sidebarStyles.cartItemHover : {})
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={sidebarStyles.itemImage}
                />
                
                <div style={sidebarStyles.itemInfo}>
                  <h4 style={sidebarStyles.itemTitle}>{item.title}</h4>
                  <p style={sidebarStyles.itemPrice}>
                    ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <div style={sidebarStyles.quantityControls}>
                    <button
                      style={{
                        ...sidebarStyles.quantityButton,
                        ...(hoveredButton === `minus-${item.id}` ? sidebarStyles.quantityButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`minus-${item.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    
                    <span style={sidebarStyles.quantity}>{item.quantity}</span>
                    
                    <button
                      style={{
                        ...sidebarStyles.quantityButton,
                        ...(hoveredButton === `plus-${item.id}` ? sidebarStyles.quantityButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`plus-${item.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  style={{
                    ...sidebarStyles.removeButton,
                    ...(hoveredButton === `remove-${item.id}` ? sidebarStyles.removeButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredButton(`remove-${item.id}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => onRemoveItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={sidebarStyles.footer}>
            <div style={sidebarStyles.total}>
              <span>Total:</span>
              <span>${calcularTotal()}</span>
            </div>
            
            <button
              style={{
                ...sidebarStyles.checkoutButton,
                ...(hoveredButton === 'checkout' ? sidebarStyles.checkoutButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('checkout')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => alert('Procesando compra...')}
            >
              💳 Proceder al Pago
            </button>
            
            <button
              style={{
                ...sidebarStyles.clearButton,
                ...(hoveredButton === 'clear' ? sidebarStyles.clearButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('clear')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={onClearCart}
            >
              🗑️ Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Componente principal de demostración
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Smartphone Samsung Galaxy",
      price: 699.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Auriculares Bluetooth Premium",
      price: 199.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Laptop MacBook Pro 13\"",
      price: 1299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
    }
  ]);
  const [hoveredButton, setHoveredButton] = useState(null);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const addSampleItem = () => {
    const newItem = {
      id: Date.now(),
      title: "Producto de Ejemplo",
      price: Math.floor(Math.random() * 500) + 50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    };
    setCartItems(items => [...items, newItem]);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header de ejemplo */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0, color: '#111827' }}>🛍️ Mi Tienda</h1>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
            onClick={addSampleItem}
          >
            ➕ Agregar Producto
          </button>
          
          <button
            style={{
              ...sidebarStyles.cartButton,
              ...(hoveredButton === 'cart' ? sidebarStyles.cartButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('cart')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => setIsCartOpen(true)}
          >
            🛒 Carrito
            {getTotalItems() > 0 && (
              <span style={sidebarStyles.badge}>
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2>Bienvenido a nuestra tienda</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Haz clic en el botón del carrito para ver tus productos
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h3>Producto {i}</h3>
              <p style={{ color: '#6b7280' }}>Descripción del producto {i}</p>
              <button
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
                onClick={addSampleItem}
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Cart */}
      <SidebarCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;