import React, { useState, useContext } from "react";
import FormInput from "./FormInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_MESSAGE } from "../graphql/mutation";
import { Redirect } from "react-router-dom";
import { MessagesContext } from "../App";

const MessageForm = () => {
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const [isError, setIsError] = useState(false);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [isRedirected, setIsRedirected] = useState(false);

  const messagesContext = useContext(MessagesContext);

  return (
    <div className="container-page">
      {isRedirected ? <Redirect to="/"></Redirect> : null}
      {isError ? (
        <div style={{ color: "#f00" }}>
          Por favor llena todas las entradas...
        </div>
      ) : null}
      <div
        className="row-message-list"
        style={{
          boxShadow: "none",
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              inputAuthor === "" ||
              inputTitle === "" ||
              inputContent === ""
            ) {
              setIsError(true);
            } else {
              const result = await createMessage({
                variables: {
                  title: inputTitle,
                  content: inputContent,
                  author: inputAuthor,
                },
              });
              messagesContext.messagesDispatch({
                type: "addOne",
                payload: { message: result.data.createMessage },
              });
              setIsRedirected(true);
            }
          }}
          style={{
            width: "100%",
          }}
        >
          <FormInput
            id="row-message-form-input-author"
            text="Autor"
            inputValue={inputAuthor}
            setInputValue={setInputAuthor}
          ></FormInput>
          <FormInput
            id="row-message-form-input-title"
            text="Título"
            inputValue={inputTitle}
            setInputValue={setInputTitle}
          ></FormInput>
          <FormInput
            id="row-message-form-input-content"
            text="Contenido"
            inputValue={inputContent}
            setInputValue={setInputContent}
          ></FormInput>
          <button
            title="Mandar mensajes"
            className="row-message-form-input-button"
            type="submit"
          >
            Mandar
          </button>
        </form>
      </div>
    </div>
  );
};
export default MessageForm;
