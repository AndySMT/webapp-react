import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DefaultLayout}>
          <Route index Component={Home}></Route>
          <Route path="about" Component={About}></Route>
          <Route path=":id" Component={MovieDetail}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
