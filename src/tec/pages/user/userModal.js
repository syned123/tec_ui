import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useUserStore } from "../../../hooks/useUserStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { useEffect, useState } from "react";
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
export const UserModal = () => {
  const { activeRows, startSavingRow } = useUserStore();
  const { isTecModalOpen, openTecModal, closeTecModal } = useUiStore();
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
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
    if (activeRows !== null) {
      setFormValues({ ...activeRows });
    }
  }, [activeRows]);
  return (
    <>
      <IconButton onClick={openTecModal}>
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
            Usuario
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
                    label="Correo Electronico"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="email"
                    value={formValues.email}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Contraseña"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="password"
                    value={formValues.password}
                    onChange={onInputChanged}
                  />
                </div>
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
