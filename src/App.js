import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddProducto from "./components/add-producto.component";
import ListaProductos from "./components/list-productos.component";

function App() {
  return (
    <div>
      <div style={{ margin: "20px", color: "blue"}}>
        <h3>Lista de productos</h3>
        <AddProducto />
        
        
      </div>
    </div>
  );
}
//<ListaProductos />
export default App;
