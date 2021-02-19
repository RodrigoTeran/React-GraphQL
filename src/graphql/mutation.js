import { gql } from "apollo-boost";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($title: String!, $content: String!, $author: String!) {
    createMessage(title: $title, content: $content, author: $author) {
      _id
      title
      content
      author
    }
  }
`;
export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($_id: String!) {
    deleteMessage(_id: $_id) {
      _id
      title
      content
      author
    }
  }
`;
