import {
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
import { useCompanyStore } from "../../../hooks/useCompanyStore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CompanyModal = () => {
  const { activeRows, startSavingRow } = useCompanyStore();
  const { isTecModalOpen, openTecModal, closeTecModal } = useUiStore();
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    entityType: "",
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
            Entidades Financieras
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="contForm">
              <div className="contText">
                <TextField
                  id="outlined-basic"
                  label="Nombre Entidad"
                  variant="outlined"
                  // size="small"
                  color="success"
                  fullWidth
                  name="name"
                  value={formValues.name}
                  onChange={onInputChanged}
                />
              </div>
              <div className="contText">
                <TextField
                  id="outlined-basic"
                  label="Codigo entidad"
                  variant="outlined"
                  // size="small"
                  color="success"
                  fullWidth
                  name="code"
                  value={formValues.code}
                  onChange={onInputChanged}
                />
              </div>
              <div className="contText">
                <TextField
                  id="outlined-basic"
                  label="Tipo"
                  variant="outlined"
                  // size="small"
                  color="success"
                  fullWidth
                  name="entityType"
                  value={formValues.entityType}
                  onChange={onInputChanged}
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
