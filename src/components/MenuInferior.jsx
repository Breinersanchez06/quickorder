export function MenuInferior({setCategoriaActiva}) {
    return (
        <>
        <div className="footer-column">
              <h4 className="footer-heading">Categorías</h4>
              <ul className="footer-list">
                <li><button onClick={() => setCategoriaActiva("Hamburguesas")}>Hamburguesas</button></li>
                <li><button onClick={() => setCategoriaActiva("Salchipapas")}>Salchipapas</button></li>
                <li><button onClick={() => setCategoriaActiva("Perros Calientes")}>Perros Calientes</button></li>
                <li><button onClick={() => setCategoriaActiva("Bebidas")}>Bebidas</button></li>
              </ul>
            </div>
        </>
    );
}


    