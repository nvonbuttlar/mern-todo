import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const Form = props => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { submit } = props;

  const handleSubmit = () => {
    if (text !== "" && text.length > 2) {
      submit(text);
      setText("");
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && text !== "" && text.length > 2) {
      submit(text);
      setText("");
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        fullWidth
        label="Enter a task"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        value={text}
        variant="outlined"
      />
      <Button
        className={classes.button}
        color="primary"
        onClick={() => handleSubmit()}
        size="large"
        variant="contained"
      >
        Add
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "10px 0px",
    borderRadius: 6,
  },
  textField: {
    [`& fieldset`]: {
      border: "1px solid whitesmoke",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
  }
});

export default Form;
