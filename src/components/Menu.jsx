export function Menu({categorias, onSelectCategoria, categoriaActiva}) {
    return (
        <>
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
        </>
    );
}


    