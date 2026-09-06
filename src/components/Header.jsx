export function Header({ categoriaActiva, onSelectCategoria, cartCount = 0 }) {
    const categorias = [
        { id: "todas", label: "Inicio" },
        { id: "hamburguesas", label: "Hamburguesas" },
        { id: "perros", label: "Perros Calientes" },
        { id: "salchipapas", label: "Salchipapas" },
        { id: "bebidas", label: "Bebidas" }
    ];

    return (
        <header className="header-navbar">
            <div className="header-inner">
                {/* Brand / Logo */}
                <div className="header-brand">
                    <div className="brand-logo">⚡</div>
                    <span className="brand-name">Quick<span className="brand-highlight">Order</span></span>
                </div>
                
                {/* Categories Navigation */}
                <nav className="nav-categories">
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-pill ${categoriaActiva === cat.label ? 'active' : ''}`}
                            onClick={() => onSelectCategoria(cat.label)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </nav>

                {/* Cart Action */}
                <div className="header-actions">
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-label">Mi Pedido</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
}


    