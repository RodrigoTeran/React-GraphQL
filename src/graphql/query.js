import { gql } from "apollo-boost";
export const GET_MESSAGES = gql`
  {
    messages {
      title
      _id
      content
      author
    }
  }
`;