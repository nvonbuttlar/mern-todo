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
        type="text"
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
    borderBottom: "2px solid #3f51b5"
  },
  textField: {
    [`& fieldset`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      border: "none",
      zIndex: 1
    }
  },
  button: {
    borderRadius: "0px 0px 4px 0px",
    boxShadow: "none"
  }
});

export default Form;
