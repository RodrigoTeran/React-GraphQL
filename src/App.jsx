import React, { createContext, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import NavBar from "./components/NavBar";
import { messagesReducer, messagesInitialState } from "./store/index";
import { GET_MESSAGES } from "./graphql/query";
import { useQuery } from "@apollo/react-hooks";

export const MessagesContext = createContext();
const App = () => {
  const [messages, dispatch] = useReducer(
    messagesReducer,
    messagesInitialState
  );
  const { loading, error, data } = useQuery(GET_MESSAGES);
  useEffect(() => {
    if (data) {
      dispatch({
        type: "addEverything",
        payload: { messages: data.messages },
      });
    }
  }, [data]);
  return (
    <MessagesContext.Provider
      value={{
        messagesData: messages,
        messagesDispatch: dispatch,
        loading,
        error,
        data,
      }}
    >
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={MessageList} />
          <Route exact path="/new-message" component={MessageForm} />
        </Switch>
      </Router>
    </MessagesContext.Provider>
  );
};

export default App;
