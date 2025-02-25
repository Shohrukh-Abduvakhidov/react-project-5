import { EditFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";

function EditModal({ id, category, setData }) {
  const Api = "https://to-dos-api.softclub.tj/api/categories";

  const [isOpenEdit, setEdit] = useState(false);
  const [editName, setName] = useState("");

  // Предзаполняем инпут текущим именем категории при открытии модального окна
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const ModalOpen = () => {
    setEdit(true);
  };

  const editUser = async () => {
    if (!editName.trim()) {
      alert("Введите новое имя!");
      return;
    }

    try {
      const response = await fetch(`${Api}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, id }),
      });

      const updatedUser = await response.json();

      if (updatedUser.data) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, name: editName } : item
          )
        );
      } else {
        console.error("Не удалось обновить данные:", updatedUser);
      }

      setEdit(false);
    } catch (error) {
      console.error(error);
    }  
  };

  return (
    <> 
      <EditFilled   style={{ color: "blue", fontSize: "20px", cursor: "pointer" }} onClick={ModalOpen}>Edit</EditFilled>

      <Modal title={"Edit User"} open={isOpenEdit} onOk={editUser} onCancel={() => setEdit(false)}>
        <div className="inpAdd">
          <label htmlFor="">Edit the name: </label>
          <input
            value={editName}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
          />
        </div>
      </Modal>
    </>
  );
}

export default EditModal;
