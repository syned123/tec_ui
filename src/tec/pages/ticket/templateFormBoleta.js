import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAgencyStore } from "../../../hooks/useAgencyStore";
import { useCompanyStore } from "../../../hooks/useCompanyStore";
import { useContactStore } from "../../../hooks/useContactStore";
import { useEquipStore } from "../../../hooks/useEquimentStore";
import { useTicketStore } from "../../../hooks/useTicketStore";

export const TemplateFormBoleta = () => {
  const top100Films = [{ label: "La Paz", year: 1994 }];
  const { rows } = useCompanyStore();
  const { rowsAgency } = useAgencyStore();
  const { rowsContact } = useContactStore();
  const { rowsEquipment } = useEquipStore();
  const { activeRows, startSavingRow } = useTicketStore();
  const [formValues, setFormValues] = useState({
    company: "",
    agency: "",
    contact: "",
    city: "",
    equipment: "",
    cnt: "",
    typeService: "",
    entity: "",
    code: "",
    status: "",
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    await startSavingRow(formValues);
  };
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    if (activeRows !== null) {
      setFormValues({ ...activeRows });
    }
  }, [activeRows]);
  var rowsMap = {};
  rows.map((elem) => {
    rowsMap[elem.id] = elem;
  });
  var rowsEquipmentMap = {};
  rowsEquipment.map((elem) => {
    rowsEquipmentMap[elem.id] = elem;
  });

  // console.log(rowsEquipmentMap);
  return (
    <div className="contegrip">
      <form onSubmit={onSubmit}>
        <div className="content-div">
          <div className="div-cont-button">
            <Button variant="contained" size="small" type="">
              Guardar
            </Button>
          </div>
          <div className="div-cont-textfield">
            <div className="div-cont-left">
              <div>
                <div>
                  <span>Informacion</span>
                </div>
                <div>
                  <span>Informacion De La Entidad Financiera</span>
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={
                      formValues.company && rowsMap
                        ? rowsMap[formValues.company].name
                        : ""
                    }
                    options={rows}
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
                      <TextField {...params} label="Entidad Financiera" />
                    )}
                  />
                </div>
                <div className="div-cont-textField-rigth">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    fullWidth
                    options={rowsContact}
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
                        contact: newValue.id,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Contacto" />
                    )}
                  />
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    onChange={(event, newValue) => {
                      setFormValues({
                        ...formValues,
                        city: newValue.label,
                      });
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Ciudad" />
                    )}
                  />
                </div>
                <div className="div-cont-textField-rigth">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={rowsAgency}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.nameAgency;
                    }}
                    onChange={(event, newValue) => {
                      setFormValues({
                        ...formValues,
                        agency: newValue.id,
                      });
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Agencia" />
                    )}
                  />
                </div>
              </div>
              <div>
                <span>Informacion De Equipo</span>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-autoco">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={
                      formValues.equipment && rowsEquipmentMap
                        ? rowsEquipmentMap[formValues.equipment].serie
                        : ""
                    }
                    options={rowsEquipment}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.serie;
                    }}
                    onChange={(event, newValue) => {
                      setFormValues({
                        ...formValues,
                        equipment: newValue.id,
                      });
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Serie Equipo" />
                    )}
                  />
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-texField-left">
                  <TextField
                    value={
                      formValues.equipment && rowsEquipmentMap
                        ? rowsEquipmentMap[formValues.equipment].type
                        : ""
                    }
                    label="tipo"
                  />
                </div>
                <div className="div-cont-texField-left">
                  <TextField
                    value={
                      formValues.equipment && rowsEquipmentMap
                        ? rowsEquipmentMap[formValues.equipment].make
                        : ""
                    }
                    label="Marca"
                  />
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-texField-left">
                  <TextField
                    value={
                      formValues.equipment && rowsEquipmentMap
                        ? rowsEquipmentMap[formValues.equipment].model
                        : ""
                    }
                    label="Modelo"
                  />
                </div>
                <div className="div-cont-texField-left">
                  <TextField
                    value={formValues.cnt}
                    label="CNT"
                    onChange={onInputChanged}
                    name="cnt"
                  />
                </div>
              </div>
            </div>
            <div className="div-cont-rigth">
              <div className="div-cont-span">
                <span className="div-span">Informacion De Mantenimiento</span>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo De Servicio
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Age"
                      onChange={(event) => {
                        setFormValues({
                          ...formValues,
                          typeService: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"Correctivo"}>Correctivo</MenuItem>
                      <MenuItem value={"Preventivo"}>Preventivo</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="div-cont-textField-rigth">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Entidad
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Age"
                      onChange={(event) => {
                        setFormValues({
                          ...formValues,
                          entity: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"DMC"}>DMC</MenuItem>
                      <MenuItem value={"TECNOGENIA"}>TECNOGENIA</MenuItem>
                      <MenuItem value={"OTROS"}>OTROS</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <TextField
                    id="outlined-basic"
                    label="Codigo"
                    variant="outlined"
                    name="code"
                    value={formValues.code}
                    onChange={onInputChanged}
                  />
                </div>
                <div className="div-cont-textField-rigth">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Age"
                      onChange={(event) => {
                        setFormValues({
                          ...formValues,
                          status: event.target.value,
                        });
                      }}
                    >
                      <MenuItem value={"Concluido"}>Concluido</MenuItem>
                      <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
