import { useEffect, useState } from "react";
import { Button, colors } from "@mui/material";
import AddModal from "./AddModal";
import EditModal from "./editModal-2";
import ShowModal from "./showModal";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import Edit from "./editModal-2";

const App = () => {
  const Api = "https://to-dos-api.softclub.tj/api/categories";
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({});

  const [show, setShow] = useState({});
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [openE, setOpenE] = useState(false);

  const openModalE = () => setOpenE(true);
  const closeModalE = () => setOpenE(false);
  const [openS, setOpenS] = useState(false);

  const openModalS = () => setOpenS(true);
  const closeModalS = () => setOpenS(false);

  async function get() {
    try {
      const response = await fetch(Api);
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function deleteUser(id) {
    try {
      await fetch(`${Api}?id=${id}`, {
        method: "DELETE",
      });
      get();
    } catch (error) {
      console.error(error);
    }
  }
  async function postUser(user) {
    try {
      await fetch(Api, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      get();
    } catch (error) {
      console.error(error);
    }
  }
  async function putUser(user) {
    try {
      await fetch(Api, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: user.name, id: user.id }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  function editUser(user) {
    setEdit(user);
    openModalE();
  }
  function showUser(user) {
    setShow(user);
    openModalS();
  }

  return (
    <>
      <div className="lg:w-[90%] lg:py-3  py-[20px]lg:h-[80px] flex items-center justify-center lg:justify-between px-[20px] py-[10px] m-auto rounded-b-2xl">
        <Button onClick={openModal} variant="contained">
          + Add New
        </Button>
        <h1 className="text-[30px] hidden lg:block text-[#fff] font-bold">
          TodoList With SWAGGER
        </h1>
        <AddModal open={open} closeModal={closeModal} postUser={postUser} />
      </div>

      <div className="flex gap-[10px] flex-wrap lg:mt-[20px] w-[90%] lg:w-[90%%] m-auto">
        {users.length == 0 ? (
          <h1 className="absolute left-[15%] lg:left-[40%] text-[50px] text-[red]">
            NOT FOUND
          </h1>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className=" flex items-center gap-[10px] border-2 border-white w-full lg:w-[250px] justify-between p-2 my-[10px]"
            >
              <h1 className="text-white  text-[20px]">{user.name}</h1>
              <div className="">
                <DeleteFilled
                  style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                  onClick={() => deleteUser(user.id)}
                />
                {/* <EditFilled
                style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
                onClick={() => editUser(user)}
              /> */}
                <Edit id={user.id} category={user} setData={setUsers} />
                <EyeFilled
                  onClick={() => showUser(user)}
                  style={{
                    color: "#00aaff",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <ShowModal open={openS} closeModal={closeModalS} user={show} />
    </>
  );
};

export default App;
