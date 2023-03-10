import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import ReportSections from "./report/ReportSections";
export default class TemplateFormBoleta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        company: "",
        agency: "",
        city: "",
        contact: "",
        equipment: "",
        cnt: "",
        typeService: "",
        entity: "",
        code: 0,
        status: "",
      },
      companies: [],
      agencies: [],
      cities: [],
      contacts: [],
      equipments: [],
      codeCompany: [],
      ticket: [],
      template: null,
      values: {},
    };
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.handleInputsChanges = this.handleInputsChanges.bind(this);
  }
  onChangeModel(value, key) {
    var response = this.state.model;
    response[key] = value;
    console.log(response);
    // console.log("valorrrrr", value);
    // console.log("key", key);
    this.setState({ model: response });
  }
  handleInputsChanges(key, value) {
    var response = this.state.values;
    response[key] = value;
    // console.log("Inputs", response);
    this.setState({
      values: response,
    });
  }
  getCompanies = () => {
    axios({
      url: "http://localhost:4000/api/company/getCompany",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response);
      this.companiesMap = {};
      response.data.company &&
        response.data.company.map(
          (company) => (this.companiesMap[company.id] = company)
        );
      this.setState({
        companies: response.data.company,
      });
    });
  };
  getAgencies = () => {
    axios({
      url: "http://localhost:4000/api/agency/getAgency",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.agencyMap = {};
      response.data.agencyList.map(
        (agency) => (this.agencyMap[agency.id] = agency)
      );
      var listCity = [];
      for (var i = 0; i < response.data.agencyList.length; i++) {
        if (listCity.indexOf(response.data.agencyList[i].city) === -1) {
          listCity.push(response.data.agencyList[i].city);
        }
      }
      this.setState({
        cities: listCity,
        agencies: response.data.agencyList,
      });
    });
  };
  getContact = () => {
    axios({
      url: "http://localhost:4000/api/contact/getContact",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.contactMap = {};
      response.data.contactList.map(
        (contact) => (this.contactMap[contact.id] = contact)
      );

      this.setState({
        contacts: response.data.contactList,
      });
    });
  };
  getEquipment = () => {
    axios({
      url: "http://localhost:4000/api/equipment/getEquipment",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.equipmentMap = {};
      response.data.equipment.map(
        (equipment) => (this.equipmentMap[equipment.id] = equipment)
      );
      // console.log(this.equipmentMap);
      this.setState({
        equipments: response.data.equipment,
      });
    });
  };
  getTicket = () => {
    axios({
      url: "http://localhost:4000/api/ticket",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data.ticket);
    });
  };
  onClickSaveButton() {
    var detailsList = [];
    const keys = Object.keys(this.state.values);
    // console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      detailsList.push({
        templateDetail: keys[i],
        value: this.state.values[keys[i]],
      });
    }
    var url = "http://localhost:4000/api/ticket";
    if (this.editMode) {
      url = url + "/" + this.ticketId;
    }

    axios({
      url: url,
      method: this.editMode ? "PUT" : "POST",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
      data: {
        company: this.state.model.company,
        agency: this.state.model.agency,
        city: this.state.model.city,
        contact: this.state.model.contact,
        cnt: this.state.model.cnt,
        equipment: this.state.model.equipment,
        typeService: this.state.model.typeService,
        entity: this.state.model.entity,
        code: this.state.model.code,
        status: this.state.model.status,
        template: "TEMPLATE_SERVICIO_MANTENIMIENTO",
        details: detailsList,
      },
    }).then((response) => {
      console.log(response.data);
    });
  }
  componentDidMount() {
    this.getCompanies();
    this.getAgencies();
    this.getContact();
    this.getEquipment();
    this.getTicket();
    axios({
      url: "http://localhost:4000/api/template/bycode/TEMPLATE_SERVICIO_MANTENIMIENTO",
      method: "GET",
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({
        template: response.data,
      });
    });
    if (window.location.pathname.split("/")[3]) {
      this.ticketId = window.location.pathname.split("/")[3];
      axios({
        url: "http://localhost:4000/api/ticket/" + this.ticketId,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response.data.ticket);
        var detailsMap = {};
        response.data.ticket.details.map(
          (detail) => (detailsMap[detail.templateDetail] = detail.value)
        );
        this.setState({
          values: detailsMap,
          model: {
            company: response.data.ticket.company,
            agency: response.data.ticket.agency,
            city: response.data.ticket.city,
            contact: response.data.ticket.contact,
            equipment: response.data.ticket.equipment,
            cnt: response.data.ticket.cnt,
            typeService: response.data.ticket.typeService,
            entity: response.data.ticket.entity,
            code: response.data.ticket.code,
            status: response.data.ticket.status,
          },
        });
      });
    }
  }

  render() {
    var listSection = [];
    if (this.state.template) {
      for (var i = 0; i < this.state.template.sections.length; i++) {
        listSection.push(
          <ReportSections
            sectionData={this.state.template.sections[i]}
            onChangeValues={this.handleInputsChanges}
            values={this.state.values}
          />
        );
      }
    }

    return (
      <div className="div-form">
        <div className="div-cont-form">
          <div>
            <Button
              onClick={this.onClickSaveButton}
              sx={{
                color: "#fff",
                backgroundColor: "#007c15",
                paddingBottom: "5px",
              }}
            >
              Guardar
            </Button>
          </div>
          <div className="div-cont">
            <div className="div-cont-left">
              <div className="div-cont-top">
                <div>
                  <span className="text-Info">Informacion</span>
                </div>
              </div>
              <div className="div-cont-sub">
                <span className="text-Info">
                  Informacion de la entidad financiera
                </span>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <Autocomplete
                    value={
                      this.state.model.company && this.companiesMap
                        ? this.companiesMap[this.state.model.company].name
                        : ""
                    }
                    options={this.state.companies}
                    isOptionEqualToValue={(option, value) =>
                      option.company === value.company
                    }
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
                      if (newValue === null) {
                        return newValue;
                      }
                      return this.onChangeModel(newValue.id, "company");
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option.name}</li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Entidad Financiera"
                        color="success"
                      />
                    )}
                  />
                </div>
                <div className="div-cont-textField-right">
                  <Autocomplete
                    value={
                      this.state.model.agency && this.agencyMap
                        ? this.agencyMap[this.state.model.agency].nameAgency
                        : ""
                    }
                    options={this.state.agencies}
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
                      // if (newValue === null) {
                      //   return newValue;
                      // }
                      // if (typeof newValue === "string") {
                      //   setTimeout(() => {
                      //     this.handleClickModal(true, "modalHandleDevice");
                      //   });
                      // } else if (newValue && newValue.inputValue) {
                      //   this.handleClickModal(true, "modalHandleDevice");
                      // }
                      return this.onChangeModel(newValue.id, "agency");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Agencia" color="success" />
                    )}
                  />
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <Autocomplete
                    value={this.state.model.city}
                    options={this.state.cities}
                    onChange={(event, newValue) => {
                      // if (newValue === null) {
                      //   return newValue;
                      // }
                      // if (typeof newValue === "string") {
                      //   setTimeout(() => {
                      //     this.handleClickModal(true, "modalHandleDevice");
                      //   });
                      // } else if (newValue && newValue.inputValue) {
                      //   this.handleClickModal(true, "modalHandleDevice");
                      // }
                      return this.onChangeModel(newValue, "city");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Ciudad" color="success" />
                    )}
                  />
                </div>
                <div className="div-cont-textField-right">
                  <Autocomplete
                    value={
                      this.state.model.contact && this.contactMap
                        ? this.contactMap[this.state.model.contact].name
                        : ""
                    }
                    options={this.state.contacts}
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
                      // if (newValue === null) {
                      //   return newValue;
                      // }
                      // if (typeof newValue === "string") {
                      //   setTimeout(() => {
                      //     this.handleClickModal(true, "modalHandleDevice");
                      //   });
                      // } else if (newValue && newValue.inputValue) {
                      //   this.handleClickModal(true, "modalHandleDevice");
                      // }
                      return this.onChangeModel(newValue.id, "contact");
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Contaco" color="success" />
                    )}
                  />
                </div>
              </div>
              <div className="div-cont-sub">
                <span className="text-Info">Informacion De Equipo</span>
              </div>
              <div className="div-cont-equip">
                <Autocomplete
                  value={
                    this.state.model.equipment && this.equipmentMap
                      ? this.equipmentMap[this.state.model.equipment].serie
                      : ""
                  }
                  options={this.state.equipments}
                  isOptionEqualToValue={(option, value) =>
                    option.serie === value.serie
                  }
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
                    // if (newValue === null) {
                    //   return newValue;
                    // }
                    // if (typeof newValue === "string") {
                    //   setTimeout(() => {
                    //     this.handleClickModal(true, "modalHandleDevice");
                    //   });
                    // } else if (newValue && newValue.inputValue) {
                    //   this.handleClickModal(true, "modalHandleDevice");
                    // }
                    return this.onChangeModel(newValue.id, "equipment");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entidad Financiera"
                      color="success"
                    />
                  )}
                />
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <TextField
                    id="outlined-basic"
                    color="success"
                    label="Tipo"
                    variant="outlined"
                    fullWidth
                    value={
                      this.state.model.equipment && this.equipmentMap
                        ? this.equipmentMap[this.state.model.equipment].type
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="div-cont-textField-right">
                  <TextField
                    color="success"
                    label="Marca"
                    value={
                      this.state.model.equipment && this.equipmentMap
                        ? this.equipmentMap[this.state.model.equipment].make
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <TextField
                    color="success"
                    id="outlined-basic"
                    label="Modelo"
                    variant="outlined"
                    fullWidth
                    value={
                      this.state.model.equipment && this.equipmentMap
                        ? this.equipmentMap[this.state.model.equipment].model
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="div-cont-textField-right">
                  <TextField
                    label="CNT"
                    color="success"
                    variant="outlined"
                    fullWidth
                    type="Number"
                    value={this.state.model.cnt}
                    onChange={(event) => {
                      return this.onChangeModel(event.target.value, "cnt");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="div-cont-rigth">
              <div className="div-cont-top">
                <div className="div-cont-span">
                  <span className="text-Info">
                    Informacion de mantenimiento
                  </span>
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de servicio
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.model.typeService}
                      color="success"
                      label="Tipo de servicio"
                      onChange={(event) => {
                        return this.onChangeModel(
                          event.target.value,
                          "typeService"
                        );
                      }}
                    >
                      <MenuItem value="Correctivo">Correctivo</MenuItem>
                      <MenuItem value="Preventivo">Preventivo</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="div-cont-textField-right">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Entidad
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.model.entity}
                      label="Entidad"
                      color="success"
                      onChange={(event) => {
                        return this.onChangeModel(event.target.value, "entity");
                      }}
                    >
                      <MenuItem value={"DMC"}>DMC</MenuItem>
                      <MenuItem value={"Tecnogenia"}>Tecnogenia</MenuItem>
                      <MenuItem value={"Otros"}>Otros</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="div-cont-textField">
                <div className="div-cont-textField-left">
                  <TextField
                    label="Codigo"
                    variant="outlined"
                    fullWidth
                    color="success"
                    value={
                      this.state.model.code ||
                      (this.state.model.company && this.companiesMap
                        ? this.companiesMap[this.state.model.company].code
                        : "") +
                        "-" +
                        this.state.model.city +
                        "-"
                    }
                    onChange={(event) => {
                      return this.onChangeModel(
                        event.target.value.toUpperCase(),
                        "code"
                      );
                    }}
                  />
                </div>
                <div className="div-cont-textField-right">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color="success"
                      value={this.state.model.status}
                      label="Estado"
                      onChange={(event) => {
                        return this.onChangeModel(event.target.value, "status");
                      }}
                    >
                      <MenuItem value={"Concluido"}>Concluido</MenuItem>
                      <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                      <MenuItem value={"Reincidencia"}>Reincidencia</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="div-list">{listSection}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
