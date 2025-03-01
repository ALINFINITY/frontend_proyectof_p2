import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Inicio } from "./pages/Inicio";
import { Roles } from "./pages/Roles";
import { Empresac } from "./pages/Empresas";
import { Productosc } from "./pages/Productos";
import { Usuarioc } from "./pages/Ususarios";
import { Categoriac } from "./pages/Categorias";

export const App:React.FC=()=> {
  return(
    <Router>
      <Navbar/>
      <div className="p-4-m">
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/empresas" element={<Empresac/>}/>
          <Route path="/categorias" element={<Categoriac/>}/>
          <Route path="/productos" element={<Productosc/>}/>
          <Route path="/roles" element={<Roles/>}/>
          <Route path="/usuarios" element={<Usuarioc/>}/>
        </Routes>
      </div>
    </Router>
  );
}
