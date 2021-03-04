import React from "react";
import EZFormikUI, { AfterDefaultSubmit } from "ez-formikui";
import { validation } from "@project/common";
import { UserFields } from "@project/types";
import { TableActions } from "../../../common/TableAbstract";
import text from "../../../../helpers/text";

type Props = {
  tableActions: TableActions;
  url: string;
  rowData: UserFields;
};

const ChangePassword: React.FC<Props> = ({ tableActions, url, rowData }) => {
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
