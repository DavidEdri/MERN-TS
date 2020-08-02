import React from "react";
import EZFormikUI, { Fields } from "ez-formikui";
import { useDispatch } from "react-redux";
import { validation } from "@project/common";
import { UserPayload } from "@project/types";
import Grid from "@material-ui/core/Grid";
import { isProduction } from "../../../../helpers/functions";
import { refreshJwt } from "../../../../redux/actions/authActions";
import text from "../../../../helpers/text";
import EditPassword from "./EditPassword";
import { useGuaranteedUserSelector } from "../../../../redux";

const fields = (user: UserPayload): Fields => [
  {
    fieldName: "email",
    label: text.emailLabel,
    type: "text",
    options: "email",
    props: { disabled: true },
    initialValue: user.email,
  },
  {
    fieldName: "name",
    label: text.fullNameLabel,
    type: "text",
    options: "text",
    initialValue: user.name,
  },
  {
    fieldName: "passwords",
    type: "other",
    label: text.changePassword,
    component: EditPassword,
    initialValue: { password: "", password2: "" },
  },
];

export default function EditInfo() {
  const user = useGuaranteedUserSelector();
  const dispatch = useDispatch();

  const afterDefaultSubmit = async () => {
    await refreshJwt(dispatch);
    window.location.href = "/dashboard/profile/home";
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item md={6} xs={12}>
        <EZFormikUI
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fields={fields(user)}
          title={text.editProfileInfo}
          onSubmit="/users/userActions/editInfo"
          afterDefaultSubmit={afterDefaultSubmit}
          validationSchema={validation.users.editInfo}
          useCaptcha={isProduction()}
        />
      </Grid>
    </Grid>
  );
}
