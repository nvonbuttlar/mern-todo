import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`;

const App = () => {
  const { loading, data } = useQuery(TodosQuery);
  const [updateTodo] = useMutation(UpdateMutation);

  const removeTodo = todo => {};

  if (loading) {
    return null;
  }

  return (
    <div>
      <form style={{ textAlign: "center" }}>
        <input type="text" name="name" placeholder="Enter a task" />
        <input type="submit" value="Submit" />
      </form>

      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto", width: 400 }}>
          <List>
            {data.todos.map(todo => {
              return (
                <ListItem
                  key={todo.id}
                  role={undefined}
                  dense
                  button
                  onClick={() =>
                    updateTodo({
                      variables: { id: todo.id, complete: !todo.complete }
                    })
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.complete}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={todo.text} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => removeTodo(todo)}>
                      <CancelIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default App;
