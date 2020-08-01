import React from "react";
import EZFormikUI from "ez-formikui";
import { validation } from "@project/common";
import { TableActions } from "../../../common/TableAbstract";
import text from "../../../../helpers/text";

type Props = {
  tableActions: TableActions;
  url: string;
  rowData: any;
};

const ChangePassword: React.FC<Props> = ({ tableActions, url, rowData }) => {
  // TODO add ez-formikui afterDefaultSubmit type
  const afterDefaultSubmit = () => {
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
      validationSchema={validation.forms.auth.changePassword}
      afterDefaultSubmit={afterDefaultSubmit}
    />
  );
};

export default ChangePassword;
