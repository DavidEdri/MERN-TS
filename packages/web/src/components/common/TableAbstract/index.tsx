import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable, { Column, Options } from "material-table";
import { useDispatch } from "react-redux";
import {
  openSnackbar,
  openDialog,
  closeDialog,
} from "../../../redux/actions/utilsActions";
import { isRTL } from "../../../helpers/constants";
import text from "../../../helpers/text";
import hebrewBody from "./hebrew";

export type Urls = {
  mount: string;
  delete?: (id: string) => string;
  update?: (id: string) => string;
  add?: string;
  /**
   * other urls will be ignored by this Component
   */
  [key: string]: any;
};

export type TableActions = {
  setTableData: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  addNewRow: (newItem: any) => void;
  updateRow: (newData: { _id: string; [key: string]: any }) => void;
  closeDialog: () => void;
  openDialog: (Form: React.ElementType, rowData?: any) => void;
};

export type Columns = (
  tableActions: TableActions,
) => Column<{ [key: string]: any }>[];

type Props = {
  title: string;
  urls: Urls;
  columns: Columns;
  AddForm?: React.ElementType;
  EditForm?: React.ElementType;
  addFormFullWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  tableOptions?: Options<{}>;
};

// TODO fix console errors (errors comes from Material-table package, need to wait for fix)
const TableAbstract: React.FC<Props> = ({
  title,
  urls,
  columns,
  AddForm,
  EditForm,
  addFormFullWidth = false,
  tableOptions = {},
}) => {
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addNewRow: TableActions["addNewRow"] = (newItem) => {
    setTableData((old) => [newItem, ...old]);
  };

  const updateRow: TableActions["updateRow"] = (newData) => {
    const d = [...tableData];
    const index = tableData.findIndex((a) => a._id === newData._id);
    if (index > -1) {
      d[index] = newData;
      setTableData(d);
    }
  };

  const closeTableDialog: TableActions["closeDialog"] = () => {
    dispatch(closeDialog());
  };

  const tableActions: TableActions = {
    setTableData,
    addNewRow,
    updateRow,
    closeDialog: closeTableDialog,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    openDialog: formDialog,
  };

  function formDialog(Form: React.ElementType, rowData?: any) {
    dispatch(
      openDialog(
        title,
        <Form tableActions={tableActions} rowData={rowData} />,
        "",
        addFormFullWidth,
      ),
    );
  }

  useEffect(() => {
    const getData = async () => {
      if (urls.mount) {
        setLoading(true);
        const res = await Axios(urls.mount);
        setTableData(res.data);
        setLoading(false);
      }
    };
    getData();
  }, [urls.mount]);

  return (
    <MaterialTable
      title={title}
      data={tableData}
      localization={isRTL ? hebrewBody : undefined}
      isLoading={loading}
      options={{
        selection: false,
        maxBodyHeight: "100vh",
        filtering: true,
        exportButton: true,
        sorting: true,
        columnsButton: true,
        pageSize: 10,
        pageSizeOptions: [10, 100, 1000],
        padding: "dense",
        ...tableOptions,
      }}
      columns={columns(tableActions)}
      editable={{
        onRowUpdate: urls.update
          ? (newData, oldData) =>
              new Promise((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Axios.put(urls.update!(newData._id), newData)
                  .then(() => {
                    const d = [...tableData];
                    const index = tableData.indexOf(oldData || {});
                    if (index > -1) {
                      d[index] = newData;
                      setTableData(d);
                    }

                    resolve();
                  })
                  .catch(() => {
                    dispatch(openSnackbar(text.serverError, "error"));
                    reject();
                  });
              })
          : undefined,
        onRowDelete: urls.delete
          ? (oldData) =>
              new Promise((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Axios.delete(urls.delete!(oldData._id))
                  .then(() => {
                    const d = [...tableData];
                    const index = d.indexOf(oldData);
                    d.splice(index, 1);
                    setTableData(d);
                    resolve();
                  })
                  .catch(() => {
                    dispatch(openSnackbar(text.serverError, "error"));
                    reject();
                  });
              })
          : undefined,
        onRowAdd: urls.add
          ? (newData) =>
              new Promise((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Axios.post(urls.add!, newData)
                  .then((res) => {
                    setTableData((old) => [...old, res.data]);
                    resolve();
                  })
                  .catch((err) => {
                    const errObj = err.response.data;
                    const errors = (
                      <div>
                        {Object.keys(errObj).map((e, i) => (
                          <p key={i}>{`${e} : ${errObj[e]}\n`}</p>
                        ))}
                      </div>
                    );

                    dispatch(openSnackbar(errors, "error"));
                    reject();
                  });
              })
          : undefined,
      }}
      actions={[
        ...(AddForm
          ? [
              {
                icon: "add",
                tooltip: text.tableAdd,
                isFreeAction: true,
                onClick: () => formDialog(AddForm),
              },
            ]
          : []),
        ...(EditForm
          ? [
              {
                icon: "edit",
                tooltip: "ערוך",
                onClick: (e: any, rowData: any) =>
                  formDialog(EditForm, rowData),
              },
            ]
          : []),
      ]}
    />
  );
};

export default TableAbstract;
