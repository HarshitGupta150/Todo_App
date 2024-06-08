import { useState } from "react";
import { ListGroup, Form, Modal, Button } from "react-bootstrap";
import '../index.css';

const TodoList = ({ todos, selectedUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (todo) => {
    setSelectedTodo(todo);
    setShow(true);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesUser = selectedUser
      ? todo.userId === parseInt(selectedUser)
      : true;
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      // || todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUser && matchesSearch;
  });

  return (
    <>
      <div className="search-todo-form">
        <Form.Group controlId="search">
          <Form.Label>Search Todos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </div>

      <ListGroup>
        {filteredTodos.map((todo) => (
          <ListGroup.Item key={todo.id} action onClick={() => handleShow(todo)}>
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedTodo && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTodo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedTodo.description}</p>
            <p>
              Status: {selectedTodo.completed ? "Completed" : "Not Completed"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TodoList;
