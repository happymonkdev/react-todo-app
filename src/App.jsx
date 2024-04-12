import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import ListTodos from "./components/todo/ListTodos";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todo from "./components/todo/Todo";
import Register from "./components/Register";
import Login from "./components/Login";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  const [count, setCount] = useState(0);
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodos />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <Todo />
              </AuthenticatedRoute>
            }
          />
          <Route path="/update-todo/:id" element={<Todo />} />
          {/* http://localhost:8080/register  */}
          <Route
            path="/register"
            element={
              <AuthenticatedRoute>
                {" "}
                <Register />{" "}
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
