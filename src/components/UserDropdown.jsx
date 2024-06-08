import { useState } from "react";
import { Form } from "react-bootstrap";

const UserDropdown = ({ users, selectedUser, setSelectedUser }) => {
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <Form.Group controlId="userSelect">
      <Form.Label>Select User</Form.Label>
      <Form.Control
        as="select"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">All Users</option>
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default UserDropdown;
