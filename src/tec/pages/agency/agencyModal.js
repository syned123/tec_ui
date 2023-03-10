import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAgencyStore } from "../../../hooks/useAgencyStore";
import { useUiStore } from "../../../hooks/useUiStore";
import EditIcon from "@mui/icons-material/Edit";
import { useCompanyStore } from "../../../hooks/useCompanyStore";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "1px solid #002a02",
  boxShadow: 24,
  p: 4,
};
export const AgencyModal = () => {
  const { rows } = useCompanyStore();
  const { activeRows, startSavingRow } = useAgencyStore();
  const { isTecModalOpen, openTecModal, closeTecModal } = useUiStore();
  const [agency, setAgency] = useState(null);
  const [formValues, setFormValues] = useState({
    nameAgency: "",
    adress1: "",
    department: "",
    city: "",
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
      [target.name]:
        target.value.charAt(0).toUpperCase() + target.value.slice(1),
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

  // var rowsMap = {};
  // rows.map((elem) => {
  //   rowsMap[elem.id] = elem;
  //   console.log(rowsMap);
  // });
  // console.log(agency);
  return (
    <>
      <IconButton onClick={openTecModal} style={{ color: "#00ff2a" }}>
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
            Agencia
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="contForm">
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Nombre Agencia"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="nameAgency"
                    value={formValues.nameAgency}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Direccion"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="adress1"
                    value={formValues.adress1}
                    onChange={onInputChanged}
                  />
                </div>
              </div>
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Departamento"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="department"
                    value={formValues.department}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Ciudad"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="city"
                    value={formValues.city}
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
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: "#007c15",
                  paddingBottom: "5px",
                }}
                type=""
              >
                Guardar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
