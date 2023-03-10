import {
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";

export default function ReportDetails(props) {
  var inputOption = null;
  var classesTypes = {
    BOOLEANOPTION: "boolean",
  };
  var classForType = classesTypes[props.detail.type];
  const labelHtml = (
    <div className={"template-detail-label " + classForType}>
      {props.detail.label}
    </div>
  );
  if (props.detail.type === "TEXTAREA") {
    inputOption = (
      // <div className="template-detail-option textarea">
      // 	<FloatingLabel controlId="floatingTextarea2" label="">
      // 		<Form.Control
      // 			as="textarea"
      // 			value={props.value}
      // 			onChange={(event)=>{
      // 				props.onChangeValues(props.detail.code, event.target.value)
      // 			}}
      // 		/>
      // 	</FloatingLabel>
      // </div>
      <TextareaAutosize
        value={props.value}
        minRows={3}
        style={{ width: "100%", fontFamily: "GoticN", padding: "5px" }}
        onChange={(event) => {
          props.onChangeValues(
            props.detail.code,
            event.target.value.charAt(0).toUpperCase() +
              event.target.value.slice(1)
          );
        }}
      />
    );
  }
  if (props.detail.type === "CHECK" || props.detail.type === "CHECKONE") {
    inputOption = (
      <>
        {/* <div className="div-check">
          <div className="div-check-left">
            <input
              onChange={(event) => {
                //console.log(event.target)
                props.onChangeValues(props.detail.code, !props.value);
              }}
              type="checkbox"
              id="flexCheckChecked"
              value={props.value}
              checked={props.value}
            />
            <label className="form-check-label" for="flexCheckChecked">
              {labelHtml}
            </label>
          </div>
        </div> */}
        <div className="div-check">
          <div className="check-number">{props.position + 1 + "."}</div>
          <div>
            <input
              className="check-css"
              onChange={(event) => {
                //console.log(event.target)
                props.onChangeValues(props.detail.code, !props.value);
              }}
              type="checkbox"
              id="flexCheckChecked"
              value={props.value}
              checked={props.value}
            />
          </div>
          <div className="check-title">{labelHtml}</div>
        </div>
      </>
    );
  }

  if (props.detail.type === "TABLE") {
    inputOption = (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Cantidad</TableCell>
                <TableCell>Tipo De Respuesto</TableCell>
                <TableCell>Codigo</TableCell>
                <TableCell>Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                <TextField
                  sx={{ width: 100 }}
                  id="outlined-basic"
                  label="Cantidad"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: 100 }}>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Tipo"
                    //onChange={handleChange}
                  >
                    <MenuItem value={"Consumible"}>Consumible</MenuItem>
                    <MenuItem value={"Repuesto"}>Repuesto</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                {/* <FormControl sx={{width: 100}}>
						<InputLabel id="demo-simple-select-label">Codigo</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							//value={age}
							label="Codigo"
							//onChange={handleChange}
						>
							{list.map(item=>(
						<MenuItem key={item.id} value={item.id}>{item.productName}</MenuItem>
						))}
						</Select>
					</FormControl> */}
                <Autocomplete
                  // options={list.map((option) => option.productName)}
                  renderInput={(params) => (
                    <TextField {...params} label="Nombre" />
                  )}
                />
              </TableCell>
              <TableCell>
                {/* <FormControl sx={{width: 100}}>
						<InputLabel id="demo-simple-select-label">Nombre</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							//value={age}
							label="Nombre"
							//onChange={handleChange}
						>
							{list.map(item=>(
						<MenuItem key={item.id} value={item.id}>{item.productCode}</MenuItem>
						))}
						</Select>
					</FormControl> */}
                <TextField />
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </>
      // <div className="template-detail-option table">
      // 	<Table striped bordered hover>
      // 		<thead>
      // 		<tr>
      // 			<th>CANTIDAD</th>
      // 			<th>TIPO DE RESPUESTO</th>
      // 			<th>DETALLE</th>
      // 		</tr>
      // 		</thead>
      // 		<tbody>
      // 			<tr>
      // 				<td><input className="form-control inpu"></input></td>
      // 				<td>
      // 					<Form.Select aria-label="Default select example" onChange={(event)=>{
      // 						props.onChangeValues(props.detail.code, event.target.value)
      // 					}}
      // 					>
      // 						<option>Seleccione el tipo</option>
      // 						<option value="1">Consumible</option>
      // 						<option value="2">Repuesto</option>
      // 					</Form.Select>
      // 				</td>
      // 				<td>

      // 					<Form.Select onChange={(event)=>{
      // 						props.onChangeValues(props.detail.code, event.target.value)
      // 					}}>
      // 						{list.map(item=>(
      // 							<option key={item.id} value={item.id}>{item.productName}</option>
      // 						))}
      // 					</Form.Select>

      // 				</td>
      // 				<td>
      // 				<Form.Select onChange={(event)=>{
      // 						props.onChangeValues(props.detail.code, event.target.value)
      // 					}}>
      // 						{list.map(item=>(
      // 							<option key={item.id} value={item.id}>{item.productCode}</option>
      // 						))}
      // 					</Form.Select>
      // 				</td>
      // 			</tr>
      // 		</tbody>
      // 	</Table>
      // </div>
    );
  }
  return <div>{inputOption}</div>;
}
