import React, { useCallback, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import * as axios from "axios";
import { config, TodosUrl } from "./config";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Items from "./Items";
export default function TodosItem(props) {
  const id = props.data.id;
  const [data, setData] = useState([]);
  // const [percentage, setPercentage] = useState("10%");

  const refreshData = () => {
    axios.get(`${TodosUrl}${id}/items`, config).then((result) => {
      setData(result.data);
      // console.log(result.data);
    });
    // props.callData();
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Dialog add
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const [name, setName] = useState("");
  const [progress_percentage, setProgress_percentage] = useState();

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangePercentage = (e) => {
    setProgress_percentage(e.target.value);
  };

  const bodyParameters = {
    name: name,
    progress_percentage: progress_percentage,
  };

  const handleCreateNewTask = async () => {
    handleCloseCreate();
    axios.post(`${TodosUrl}${id}/items`, bodyParameters, config);
    refreshData();
  };

  return (
    <div>
      {data.map((data) => (
        <Items refreshData={refreshData} key={data.id} data={data} />
      ))}
      <div>
        <Dialog
          open={openCreate}
          refresh={handleCloseCreate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="CreateModal">
            <div className="Container">
              <div className="TextWrapper">
                <h1>Create Task</h1>
                <form className="CreateForm" noValidate autoComplete="off">
                  <p>Task Name</p>
                  <TextField
                    onChange={handleOnChangeName}
                    style={{
                      width: "505px",
                      margin: "0px 33px 27px 33px",
                    }}
                    id="outlined-basic"
                    placeholder="example: Build rocket to Mars."
                    variant="outlined"
                  />
                  <p>Percentage</p>
                  <TextField
                    onChange={handleOnChangePercentage}
                    style={{
                      width: "99px",
                      margin: "0 0 27px 33px",
                    }}
                    id="outlined-basic"
                    placeholder="0%"
                    variant="outlined"
                  />
                </form>
                <DialogActions>
                  <Button
                    onClick={handleCreateNewTask}
                    style={{
                      textTransform: "none",
                      width: "96px",
                      height: "32px",
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateNewTask}
                    style={{
                      textTransform: "none",
                      width: "96px",
                      height: "32px",
                      backgroundColor: "green",
                      color: "white",
                    }}
                    autoFocus
                  >
                    Save Task
                  </Button>
                </DialogActions>
              </div>
            </div>
          </div>
        </Dialog>
        <Button onClick={handleOpenCreate} className="NewTaskButton">
          <AddCircleOutlineIcon />
          <p>New Task</p>
        </Button>
      </div>
    </div>
  );
}
