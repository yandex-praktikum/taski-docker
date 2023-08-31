import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const TaskEditModal = ({ taskData, toggle, onSave }) => {
  const [item, setItem] = useState(taskData);

  useEffect(() => {
    setItem(taskData);
  }, [taskData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setItem({ ...item, [name]: value });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="task-title">Title</Label>
            <Input
              type="text"
              id="task-title"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="task-description">Description</Label>
            <Input
              type="text"
              id="task-description"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Task description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={item.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskEditModal;