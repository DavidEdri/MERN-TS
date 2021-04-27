/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable, { Column, Options } from "material-table";
import { useDispatch } from "react-redux";
import { constants } from "@project/common";
import {
  openSnackbar,
  openDialog,
  closeDialog,
} from "../../../redux/actions/utilsActions";
import { isRTL } from "../../../helpers/constants";
import hebrewBody from "./hebrew";

const { text } = constants;

type RowData = { _id: string };

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

export type TableActions<T extends RowData> = {
  setTableData: React.Dispatch<React.SetStateAction<T[]>>;
  addNewRow: (newItem: T) => void;
  updateRow: (newData: T) => void;
  deleteRow: (newData: T) => void;
  closeDialog: () => void;
  openDialog: (Form: React.ElementType, rowData?: T) => void;
};

export type Columns<T extends RowData> = (
  tableActions: TableActions<T>,
) => Column<T>[];

type Props<T extends RowData> = {
  title: string;
  urls: Urls;
  columns: Columns<T>;
  AddForm?: React.ElementType;
  EditForm?: React.ElementType;
  addFormFullWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  tableOptions?: Options<{}>;
};

const errorToJSX = (err: any) => {
  try {
    const errObj = err.response.data;
    const errors = (
      <div>
        {Object.keys(errObj).map((e, i) => (
          <p key={i}>{`${e} : ${errObj[e]}\n`}</p>
        ))}
      </div>
    );

    return errors;
  } catch (error) {
    return text.serverError;
  }
};

// TODO fix console errors (errors comes from Material-table package, need to wait for fix)
const TableAbstract = <T extends RowData>({
  title,
  urls,
  columns,
  AddForm,
  EditForm,
  addFormFullWidth = false,
  tableOptions = {},
}: Props<T>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addNewRow: TableActions<T>["addNewRow"] = (newItem) => {
    setTableData((old) => [newItem, ...old]);
  };

  const updateRow: TableActions<T>["updateRow"] = (newData) => {
    const d = [...tableData];
    const index = tableData.findIndex((a) => a._id === newData._id);
    if (index > -1) {
      d[index] = newData;
      setTableData(d);
    }
  };

  const deleteRow: TableActions<T>["deleteRow"] = (oldItem) => {
    const d = [...tableData];
    const index = d.indexOf(oldItem);
    if (index > -1) {
      d.splice(index, 1);
      setTableData(d);
    }
  };

  const closeTableDialog: TableActions<T>["closeDialog"] = () => {
    dispatch(closeDialog());
  };

  const tableActions: TableActions<T> = {
    setTableData,
    addNewRow,
    updateRow,
    deleteRow,
    closeDialog: closeTableDialog,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    openDialog: formDialog,
  };

  function formDialog(Form: React.ElementType, rowData?: T) {
    dispatch(
      openDialog({
        title,
        body: <Form tableActions={tableActions} rowData={rowData} />,
        fullscreen: addFormFullWidth,
      }),
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
      options={
        {
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
        } as any
      }
      columns={columns(tableActions)}
      editable={{
        onRowUpdate: urls.update
          ? (newData, oldData) =>
              new Promise((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Axios.put(urls.update!(newData._id), newData)
                  .then(() => {
                    updateRow(newData);

                    resolve(undefined);
                  })
                  .catch((err) => {
                    const errors = errorToJSX(err);

                    dispatch(openSnackbar({ msg: errors, variant: "error" }));
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
                    deleteRow(oldData);
                    resolve(undefined);
                  })
                  .catch((err) => {
                    const errors = errorToJSX(err);

                    dispatch(openSnackbar({ msg: errors, variant: "error" }));
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
                    addNewRow(res.data);
                    resolve(undefined);
                  })
                  .catch((err) => {
                    const errors = errorToJSX(err);

                    dispatch(openSnackbar({ msg: errors, variant: "error" }));
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
                tooltip: text.tableEdit,
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
