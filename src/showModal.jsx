import { Modal } from "antd";
const ShowModal = ({ open, closeModal, user }) => {
  return (
    <Modal
      open={open}
      title="Show User"
      onCancel={closeModal}
    >
        <p className="text-[25px]">Name : {user.name}</p>
        <p className="text-[20px]">ID : {user.id}</p>
    </Modal>
  );
};

export default ShowModal;
