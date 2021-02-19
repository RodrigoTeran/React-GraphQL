import React, { useContext } from "react";
import { MessagesContext } from "../App";
import { DELETE_MESSAGE } from "../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const MessageList = () => {
  const messagesContext = useContext(MessagesContext);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  if (messagesContext.loading) {
    return (
      <div className="container-page">
        <div className="loader">Cargando mensajes...</div>
      </div>
    );
  }
  if (messagesContext.error) {
    return (
      <div className="container-page">
        <div className="error">Error al cargar mensajes</div>
      </div>
    );
  }
  if (messagesContext.messagesData.length === 0) {
    return (
      <div className="container-page">
        <div className="loader">No hay mensajes</div>
      </div>
    );
  }
  const _deleteMessage = async (_id) => {
    const result = await deleteMessage({
      variables: {
        _id,
      },
    });
    // console.log(result.data.deleteMessage)
    messagesContext.messagesDispatch({
      type: "addEverything",
      payload: { messages: result.data.deleteMessage },
    });
  };
  return (
    <div className="container-page">
      {messagesContext.messagesData.map(({ _id, title, content, author }) => (
        <div key={_id} className="row-message-list">
          <div
            className="row-message-list__svg"
            onClick={async () => {
              await _deleteMessage(_id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
            </svg>
          </div>
          <div className="row-message-list-title">{title}</div>
          <div className="row-message-list-content">{content}</div>
          <div className="row-message-list-author">- {author}</div>
        </div>
      ))}
    </div>
  );
};
export default MessageList;
