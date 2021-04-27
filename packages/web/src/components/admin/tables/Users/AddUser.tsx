import React from "react";
import EZFormikUI, { AfterDefaultSubmit } from "ez-formikui";
import { constants, validation } from "@project/common";
import { UserFields } from "@project/types";
import { TableActions } from "../../../common/TableAbstract";

const { text } = constants;

type Props = {
  tableActions: TableActions<UserFields>;
};

const AddUser = ({ tableActions }: Props) => {
  const afterDefaultSubmit: AfterDefaultSubmit = (res) => {
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
      validationSchema={validation.admins.adminAddUser}
      afterDefaultSubmit={afterDefaultSubmit}
    />
  );
};

export default AddUser;
