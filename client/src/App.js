import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Form from "./components/Form";

import { makeStyles } from "@material-ui/core/styles";

import { Checkbox } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemSecondaryAction } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import { borderLeft } from "@material-ui/system";

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

const RemoveMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`;

const CreateMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`;

const App = () => {
  const classes = useStyles();
  const { data, error, loading } = useQuery(TodosQuery);
  const [updateTodo] = useMutation(UpdateMutation);
  const [removeTodo] = useMutation(RemoveMutation);
  const [createTodo] = useMutation(CreateMutation);

  const handleCheckbox = async todo => {
    await updateTodo({
      variables: { id: todo.id, complete: !todo.complete },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.map(x =>
          x.id === todo.id
            ? {
                ...todo,
                complete: !todo.complete
              }
            : x
        );
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  const handleRemove = async todo => {
    await removeTodo({
      variables: { id: todo.id },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.filter(x => x.id !== todo.id);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  const handleCreate = async text => {
    await createTodo({
      variables: { text },
      update: (store, { data: { createTodo } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos.unshift(createTodo);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p> A error has occured 😕 </p>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleCtnr}>
        <h1 className={classes.title}>Candoo</h1>
        <h5 className={classes.caption}>
          That's right... just <i>another</i> ordinary todo list!
        </h5>
      </div>

      <div className={classes.main}>
        <Form submit={handleCreate} />
        <List className={classes.list}>
          {data.todos.map(todo => {
            return (
              <ListItem
                button
                className={classes.listItem}
                key={todo.id}
                onClick={() => {
                  handleCheckbox(todo);
                }}
                role={undefined}
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
                  <IconButton onClick={() => handleRemove(todo)}>
                    <CancelIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2.5em"
  },
  titleCtnr: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "6px 0px 6px 6px"
  },
  title: { color: "#3f51b5" },
  caption: { margin: "0px 0px 20px 0px" },
  main: {
    width: "45%",
    margin: "20px 0px",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottom: "2px solid #3f51b5"
  },
  list: {
    borderRadius: 6
  },
  listItem: {
    borderBottomRightRadius: 6
  }
});

export default App;
