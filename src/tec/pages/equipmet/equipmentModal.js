import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useEquipStore } from "../../../hooks/useEquimentStore";
import { useUiStore } from "../../../hooks/useUiStore";
import EditIcon from "@mui/icons-material/Edit";
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
export const EquipmentModal = () => {
  const { activeRows, startSavingRow } = useEquipStore();
  const { isTecModalOpen, openTecModal, closeTecModal } = useUiStore();
  const [formValues, setFormValues] = useState({
    type: "",
    make: "",
    model: "",
    serie: "",
  });
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
    if (activeRows !== null) {
      setFormValues({ ...activeRows });
    }
  }, [activeRows]);
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
            Equipos
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="contForm">
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Tipo de equipo"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="type"
                    value={formValues.type}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Marca"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="make"
                    value={formValues.make}
                    onChange={onInputChanged}
                  />
                </div>
              </div>
              <div className="contDivTex">
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Modelo"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="model"
                    value={formValues.model}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="texFiel">
                  <TextField
                    id="outlined-basic"
                    label="Serie"
                    variant="outlined"
                    // size="small"
                    color="success"
                    fullWidth
                    name="serie"
                    value={formValues.serie}
                    onChange={onInputChanged}
                  />
                </div>
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
