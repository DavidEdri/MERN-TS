import React from "react";
import { useDispatch } from "react-redux";
import { constants } from "@project/common";
import { Button } from "@material-ui/core";
import TableAbstract, {
  TableActions,
  Columns,
} from "../../../common/TableAbstract";
import text from "../../../../helpers/text";
import { openDialog } from "../../../../redux/actions/utilsActions";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const ranksToLookup = (ranks: { label: string; value: any }[]) => {
  const res: { [key: string]: any } = {};
  ranks.forEach((r) => {
    res[r.value] = r.label;
  });

  return res;
};

const urls = {
  mount: "/admins/usersManagement/",
  delete: (id: string) => `/admins/usersManagement/${id}`,
  update: (id: string) => `/admins/usersManagement/${id}`,
  changePass: (id: string) => `/admins/usersManagement/changePass/${id}`,
  // add: "/admins/usersManagement/addUser", add if want to use default add
};

export default function Users() {
  const dispatch = useDispatch();

  const onChangePassClick = (rowData: any, tableActions: TableActions) => {
    dispatch(
      openDialog({
        title: text.adminUsers,
        body: (
          <ChangePassword
            rowData={rowData}
            tableActions={tableActions}
            url={urls.changePass(rowData._id)}
          />
        ),
      }),
    );
  };

  const columns: Columns = (tableActions) => [
    { title: text.usersNameTitle, field: "name", filtering: false },
    {
      title: text.usersEmailTitle,
      field: "email",
      filtering: false,
    },
    {
      title: text.usersRankTitle,
      field: "rank",
      lookup: ranksToLookup(constants.ranks),
    },
    {
      title: text.usersChangePassTitle,
      filtering: false,
      // eslint-disable-next-line react/display-name
      render: (rowData) => (
        <Button onClick={() => onChangePassClick(rowData, tableActions)}>
          {text.clickToEditPass}
        </Button>
      ),
    },
    {
      title: text.usersActiveTitle,
      field: "active",
      type: "boolean",
      filtering: true,
    },
  ];

  return (
    <TableAbstract
      title={text.adminUsers}
      columns={columns}
      urls={urls}
      AddForm={AddUser}
    />
  );
}
