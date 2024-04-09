import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import ListTodos from "./components/todo/ListTodos";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./components/todo/Todo";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/todos" element={<ListTodos />}></Route>
          <Route path="/add-todo" element={<Todo />} />
          <Route path="/update-todo/:id" element={<Todo />} />
          {/* http://localhost:8080/register  */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
