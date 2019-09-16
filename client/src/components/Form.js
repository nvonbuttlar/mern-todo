import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const Form = props => {
  const [text, setText] = useState("");
  const { error, submit } = props;

  const handleSubmit = () => {
    submit(text);
    setText("");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      submit(text);
      setText("");
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Enter a task"
        margin="normal"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        value={text}
      />
      <Button
        color="primary"
        onClick={() => handleSubmit()}
        variant="contained"
      >
        Git'r Done!
      </Button>
    </>
  );
};

export default Form;
