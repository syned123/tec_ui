import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useUiStore } from "../../../hooks/useUiStore";
import { useContactStore } from "../../../hooks/useContactStore";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ContactModal = () => {
  const { activeRows, startSavingRow } = useContactStore();
  const { isTecModalOpen, openTecModal, closeTecModal } = useUiStore();
  const [agency, setAgency] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    charge: "",
    company: "",
  });
  const agencyData = () => {
    axios({
      url: "http://localhost:4000/api/company/getCompany",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response);
      setAgency(response.data.company);
    });
  };
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    await startSavingRow(formValues);
    closeTecModal();
  };
  useEffect(() => {
    agencyData();
    if (activeRows !== null) {
      setFormValues({ ...activeRows });
    }
  }, [activeRows]);

  return (
    <>
      <IconButton onClick={openTecModal}  style={{ color: "#00ff2a" }}>
        <EditIcon />
      </IconButton>
      <Modal
        open={isTecModalOpen}
        onClose={closeTecModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Contactos
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="contForm">
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Nombres"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="name"
                    value={formValues.name}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Apellidos"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="lastname"
                    value={formValues.lastname}
                    onChange={onInputChanged}
                  />
                </div>
              </div>
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Celular"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="phone"
                    value={formValues.phone}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Cargo"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="charge"
                    value={formValues.charge}
                    onChange={onInputChanged}
                  />
                </div>
              </div>
              <div className="conDivCom">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={formValues.company}
                  options={agency}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  onChange={(event, newValue) => {
                    setFormValues({
                      ...formValues,
                      company: newValue.id,
                    });
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entidad Financiera"
                      color="success"
                    />
                  )}
                />
              </div>
            </div>
            <div className="contButton">
              <Button variant="contained" color="success" type="">
                Guardar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
