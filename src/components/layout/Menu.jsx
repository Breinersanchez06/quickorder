export function Menu({ categorias = [], onSelectCategoria, categoriaActiva }) {
    const categoriasActivas = categorias.filter(
        (cat) => cat.estado === undefined || cat.estado === 1 || cat.estado === '1' || cat.estado === true || cat.estado === 'true'
    );

    return (
        <nav className="nav-categories">
            {categoriasActivas.map((cat) => {
                const nombreCat = cat.nombre || cat.label;
                return (
                    <button
                        key={cat.id}
                        className={`category-pill ${categoriaActiva === nombreCat ? 'active' : ''}`}
                        onClick={() => onSelectCategoria(nombreCat)}
                    >
                        {nombreCat}
                    </button>
                );
            })}
        </nav>
    );
}