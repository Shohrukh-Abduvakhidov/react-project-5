import { Modal } from "antd";
import { Input } from "antd";
import { useState } from "react";
const AddModal = ({ open, closeModal, postUser }) => {
  const [name, setName] = useState("");
  function addForm() {
    let newUser = {
      name: name,
    };
    postUser(newUser);
    closeModal();
    setName("")
  }
  return (
    <Modal
      open={open}
      title="Add User"
      onCancel={closeModal}
      onOk={addForm}
    >
      <Input
        placeholder="Name..."
        value={name}
        onChange={(e)=> setName(e.target.value)}
        style={{ color: "black", border: "2px solid black" }}
      />
    </Modal>
  );
};

export default AddModal;
