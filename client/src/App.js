import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

const App = () => {
  const { loading, data } = useQuery(TodosQuery);

  if (loading) {
    return null;
  }
  return (
    <>
      <form>
        <input type="text" name="name" placeholder="Enter a task" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {data.todos.map(todo => (
          <li key={`${todo.id}`}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
