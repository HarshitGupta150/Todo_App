import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserDropdown from "./components/UserDropdown";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const jsonData = await response.json();
        setTodos(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Todo List</h1>
      <div className="my-2">
        <UserDropdown
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <TodoList todos={todos} selectedUser={selectedUser} />
    </Container>
  );
}

export default App;
