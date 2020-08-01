import React, { useState } from "react";
import { OtherComponent } from "ez-formikui";
import { TextField, Button } from "@material-ui/core";
import text from "../../../../helpers/text";

const EditPassword: OtherComponent = ({ value, errorMsg, setValue }) => {
  const [editPass, setEditPass] = useState(false);

  return (
    <div style={{ marginBottom: 10 }}>
      {!editPass ? (
        <Button onClick={() => setEditPass(true)}>
          {text.clickToEditPass}
        </Button>
      ) : (
        <>
          <TextField
            error={errorMsg !== undefined && "password" in errorMsg}
            label={text.passLabel}
            margin="dense"
            helperText={
              errorMsg !== undefined && "password" in errorMsg
                ? errorMsg.password
                : ""
            }
            name="password"
            type="password"
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            fullWidth
          />
          <TextField
            error={errorMsg !== undefined && "password2" in errorMsg}
            label={text.passConfirmLabel}
            margin="dense"
            helperText={errorMsg !== undefined ? errorMsg.password2 : ""}
            name="password2"
            type="password"
            value={value.password2}
            onChange={(e) => setValue({ ...value, password2: e.target.value })}
            fullWidth
          />
        </>
      )}
    </div>
  );
};

export default EditPassword;
