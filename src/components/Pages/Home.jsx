import React, { useState, useEffect } from "react";
import { FaRegSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import Todo from "../Utilities/Todo";
import Modal from "../Utilities/Modal";
import EmptyPage from "../Utilities/EmptyPage";
import "../Styles/Home.css";
import { useModal } from "../Providers/ModalProvider";
import { useTodos } from "../Providers/TodoProvider";
import { useTheme } from "../Providers/ThemeProvider";
import { storeInLocalStorage } from "../Utilities/localStorage";

const Home = () => {
  const { modalOpen, setModalOpen } = useModal();
  const { todos } = useTodos();
  const { theme, setTheme } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [colorId, setColorId] = useState("");

  const initialForm = {
    todoId: "",
    todoTitle: "",
    todoDesc: "",
    todoAlloted: "",
    todoTags: "",
    todoCreatedAt: "",
  };

  const toggleModal = (e) => {
    setModalOpen(
      modalOpen.status === false
        ? {
            ...modalOpen,
            status: true,
            data: { ...modalOpen.data, ...initialForm },
          }
        : {
            ...modalOpen,
            status: false,
            data: { ...modalOpen.data, ...initialForm },
          }
    );
  };

  useEffect(() => {
    setRotation(modalOpen.status === true ? 45 : 0);
  }, [modalOpen]);

  useEffect(() => {
    setColorId(theme === "dark" ? "" : "black-color");
  }, [theme]);

  return (
    <div id={colorId}>
      <nav className="navbar flex-center" id={colorId}>
        <div className="navbar-left flex-center">
          <h1>
            <span className="todoro">To-Do</span>
          </h1>
          <input
            type="search"
            placeholder="Search by tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {theme === "dark" ? (
          <FaRegSun
            className="theme-btn"
            onClick={(e) => {
              storeInLocalStorage("light");
              setTheme("light");
            }}
          />
        ) : (
          <BsMoonStarsFill
            className="theme-btn"
            onClick={(e) => {
              storeInLocalStorage("dark");
              setTheme("dark");
            }}
          />
        )}
      </nav>
      <div className="container flex flex-col align-center justify-start">
        <div className="todos-container flex flex-col align-center justify-center">
          {todos.todos.length !== 0 ? (
            todos.todos.map(
              (todo) =>
                todo.tags.filter((tag) => tag.indexOf(searchQuery) !== -1)
                  .length > 0 && <Todo key={todo.id} todo={todo} />
            )
          ) : (
            <EmptyPage />
          )}
        </div>
        {modalOpen.status && <Modal data={modalOpen.data} />}
        <button
          className="btn add-todo flex-center"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
          onClick={toggleModal}
        >
          {" "}
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
