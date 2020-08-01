import React from "react";
import { AxiosResponse } from "axios";
import EZFormikUI from "ez-formikui";
import { constants, validation } from "@project/common";
import { TableActions } from "../../../common/TableAbstract";
import text from "../../../../helpers/text";

type Props = {
  tableActions: TableActions;
};

const AddUser: React.FC<Props> = ({ tableActions }) => {
  // TODO add ez-formikui afterDefaultSubmit type
  const afterDefaultSubmit = (res?: AxiosResponse<any>) => {
    tableActions.setTableData((old) => [...old, res?.data]);
    tableActions.closeDialog();
  };

  return (
    <EZFormikUI
      fields={[
        {
          fieldName: "name",
          label: text.fullNameLabel,
          type: "text",
          options: "text",
          initialValue: "",
        },
        {
          fieldName: "email",
          label: text.emailLabel,
          type: "text",
          options: "email",
          initialValue: "",
        },
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
        {
          fieldName: "rank",
          label: text.rankLabel,
          type: "select",
          options: constants.ranks,
          isMulti: false,
          initialValue: constants.ranks[0].value,
        },
        {
          fieldName: "active",
          label: text.isActiveLabel,
          type: "switch",
          initialValue: false,
        },
      ]}
      onSubmit="/admins/usersManagement/"
      title={text.adminUsers}
      validationSchema={validation.forms.admins.adminAddUser}
      afterDefaultSubmit={afterDefaultSubmit}
    />
  );
};

export default AddUser;
