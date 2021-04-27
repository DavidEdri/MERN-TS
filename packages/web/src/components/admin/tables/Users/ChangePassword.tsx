import React from "react";
import EZFormikUI, { AfterDefaultSubmit } from "ez-formikui";
import { constants, validation } from "@project/common";
import { UserFields } from "@project/types";
import { TableActions } from "../../../common/TableAbstract";

const { text } = constants;

type Props = {
  tableActions: TableActions<UserFields>;
  url: string;
  rowData: UserFields;
};

const ChangePassword = ({ tableActions, url, rowData }: Props) => {
  const afterDefaultSubmit: AfterDefaultSubmit = () => {
    tableActions.closeDialog();
  };

  return (
    <EZFormikUI
      fields={[
        {
          fieldName: "password",
          label: text.passLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
        {
          fieldName: "password2",
          label: text.passConfirmLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
      ]}
      onSubmit={url}
      paragraph={text.usersChangePassFor(rowData.email)}
      validationSchema={validation.auth.changePassword}
      afterDefaultSubmit={afterDefaultSubmit}
    />
  );
};

export default ChangePassword;
