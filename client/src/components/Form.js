import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const Form = props => {
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
    <div>
      <TextField
        fullWidth
        label="Enter a task"
        margin="normal"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        required
        value={text}
        variant="outlined"
      />
      <Button
        color="primary"
        onClick={() => handleSubmit()}
        raised
        variant="contained"
      >
        Git'r Done!
      </Button>
    </div>
  );
};

export default Form;
