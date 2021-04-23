import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import * as axios from "axios";
import { config, TodosUrl } from "./config";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
export default function Items(props) {
  const id = props.data.id;
  const todoId = props.data.todo_id;
  const [data, setData] = useState(props.data);
  const [percentage, setPercentage] = useState(props.data.progress_percentage);
  // const index =
  const [color, setColor] = useState("blue");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState(props.data.name);
  //   const [nameNext, setNameNext] = useState(props.data.name);
  //   const [Progress_percentageNext, setProgress_percentageNext] = useState(
  //     props.data.progress_percentage
  //   );
  const [done, setDone] = useState(props.data.done);
  const [progress_percentage, setProgress_percentage] = useState(
    props.data.progress_percentage
  );
  const nextId = todoId + 1;
  const prevId = todoId - 1;
  //   console.log(todoId);
  const Percentage = () => {
    if (percentage >= "100") {
      setColor("green");
      setDone(true);
    } else {
      setColor("blue");
      setDone(false);
    }
  };

  const callData = () => {
    axios.get(`${TodosUrl}${todoId}/items/${id}`, config).then((result) => {
      setData(result.data);

      setPercentage(result.data.progress_percentage);
    });
  };

  useEffect(() => {
    callData();
    Percentage();
  }, [percentage]);

  // open options
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // props.idChild(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // open options end

  // Dialog Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteTask = async () => {
    handleCloseDelete();
    axios.delete(`${TodosUrl}${todoId}/items/${id}`, config);
    props.refreshData();
  };

  // handle delete end

  // Dialog Edit start
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangePercentage = (e) => {
    setProgress_percentage(e.target.value);
  };

  const bodyParameters = {
    name: name,
    progress_percentage: progress_percentage,
    target_todo_id: todoId,
  };

  const bodyParametersNext = {
    name: name,
    progress_percentage: progress_percentage,
  };

  const handleEditTask = async () => {
    handleCloseEdit();
    axios.patch(`${TodosUrl}${todoId}/items/${id}`, bodyParameters, config);
    callData();
  };
  // handle edit end

  // handle move right

  const handleNext = async () => {
    axios.post(`${TodosUrl}${nextId}/items`, bodyParametersNext, config);
    handleDeleteTask();
    props.refreshData();
  };

  const handlePrev = async () => {
    axios.post(`${TodosUrl}${prevId}/items`, bodyParametersNext, config);
    handleDeleteTask();
    props.refreshData();
  };

  return (
    <div key={data.name} className="TodosItem">
      <h1>{data.name}</h1>
      <div className="ProgressContainer">
        <div className="ProgressSubContainer">
          <div className="Progress">
            <div
              style={{
                height: "100%",
                width: percentage,
                maxWidth: "100%",
                backgroundColor: color,
                borderRadius: "8px",
              }}
            ></div>
          </div>
          <div
            style={
              done ? { display: "none" } : { margin: "8px", color: "green" }
            }
          >
            {percentage}%
          </div>
          <div
            style={
              done ? { padding: "8px", color: "green" } : { display: "none" }
            }
          >
            <CheckCircleIcon />
          </div>
        </div>

        <Button onClick={handleClick} className="MenuButton">
          <MoreHorizIcon />
        </Button>

        {/* Menu */}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            style={{ width: "158px", paddingRight: "12px" }}
            onClick={handleNext}
          >
            <ArrowForwardIcon style={{ marginRight: "12px" }} />
            Move Right
          </MenuItem>
          <MenuItem
            style={{ width: "158px", paddingRight: "12px" }}
            onClick={handlePrev}
          >
            <ArrowBackIcon style={{ marginRight: "12px" }} />
            Move Left
          </MenuItem>
          <MenuItem
            style={{ width: "158px", paddingRight: "12px" }}
            onClick={handleOpenEdit}
          >
            <BorderColorIcon style={{ marginRight: "12px" }} />
            Edit
          </MenuItem>
          <MenuItem
            style={{ width: "158px", paddingRight: "12px" }}
            onClick={handleOpenDelete}
          >
            <DeleteOutlineIcon style={{ marginRight: "12px" }} /> Delete
          </MenuItem>
        </Menu>

        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="DeleteModal">
            <div className="Container">
              <ErrorOutlineIcon />
              <div className="TextWrapper">
                <h1>Delete Task</h1>
                <p>
                  Are you sure want to delete this task? your action can’t be
                  reverted.
                </p>

                <DialogActions>
                  <Button
                    onClick={handleCloseDelete}
                    style={{
                      width: "77px",
                      height: "32px",
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteTask}
                    style={{
                      width: "77px",
                      height: "32px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </div>
            </div>
          </div>
        </Dialog>

        {/* Dialog for Edit */}

        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="EditModal">
            <div className="Container">
              <div className="TextWrapper">
                <h1>Edit Task</h1>
                <form className="CreateForm" noValidate autoComplete="off">
                  <p>Task Name</p>
                  <TextField
                    style={{
                      width: "505px",
                      margin: "0px 33px 27px 33px",
                    }}
                    type="text"
                    value={name}
                    id="outlined-basic"
                    placeholder="example: Build rocket to Mars."
                    variant="outlined"
                    onChange={handleOnChangeName}
                  />
                  <p>Percentage</p>
                  <TextField
                    onChange={handleOnChangePercentage}
                    style={{
                      width: "99px",
                      margin: "0 0 27px 33px",
                    }}
                    defaultValue={progress_percentage}
                    type="text"
                    id="outlined-basic"
                    placeholder="0%"
                    variant="outlined"
                  />
                </form>
                <DialogActions>
                  <Button
                    onClick={handleCloseEdit}
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
                    onClick={handleEditTask}
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
      </div>
    </div>
  );
}
