import { Fingerprint } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { width } from "@mui/system";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
export const Pdf = (props) => {
  console.log(props.name.details);

  return (
    <>
      <Document>
        <Page size="A4">
          <View style={{ margin: 20, height: "90vh" }}>
            <View
              style={{
                width: "100%",
                height: "60px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* <Text style={{ width: "30%" }}>
                <Image
                  style={{ width: "1200px" }}
                  src="https://scontent.flpb1-2.fna.fbcdn.net/v/t39.30808-6/294993862_717746322832195_669602131163846827_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jQ4Xx1MQZhIAX9N5nde&_nc_ht=scontent.flpb1-2.fna&oh=00_AfDJx4ZTllD9e4kwtyRWMX3AEyvRAUKb1wT3gaSPaLRN4g&oe=640EB6D9"
                ></Image>
              </Text> */}
              <View>
                <Image
                  style={{ width: "120px" }}
                  src="https://scontent.flpb1-2.fna.fbcdn.net/v/t39.30808-6/294993862_717746322832195_669602131163846827_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jQ4Xx1MQZhIAX9N5nde&_nc_ht=scontent.flpb1-2.fna&oh=00_AfDJx4ZTllD9e4kwtyRWMX3AEyvRAUKb1wT3gaSPaLRN4g&oe=640EB6D9"
                ></Image>
              </View>
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: "10px",
                  }}
                >
                  PLANILLA DE CONTROL DEL DEPARTAMENTO TECNICO
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    paddingLeft: "50px",
                  }}
                >
                  SERVICIO DE MANTENIMIENTO
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ width: "33%", fontSize: "11px" }}>
                Tipo Servicio: {props.name.typeService}
              </Text>
              <Text style={{ width: "33%", fontSize: "11px" }}>
                Codigo: {props.name.code}
              </Text>
              <Text style={{ width: "34%", fontSize: "11px" }}>
                Estado: {props.name.status}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "80px",
                marginTop: "15px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Nombre De Empresa: {props.name.company}
                </Text>
                <Text
                  style={{
                    width: "50%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Contacto: {props.name.contactName}{" "}
                  {props.name.contactLastname}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Ciudad:{props.name.city}
                </Text>
                <Text
                  style={{
                    width: "50%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Nombre De Agencia: {props.name.agency}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "33%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Tipo De Equipo: {props.name.type}
                </Text>
                <Text
                  style={{
                    width: "33%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Marca: {props.name.make}
                </Text>
                <Text
                  style={{
                    width: "34%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Modelo: {props.name.model}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "35%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Serie:{props.name.serie}
                </Text>
                <Text
                  style={{
                    width: "35%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  CNT: {props.name.cnt}
                </Text>
                <Text
                  style={{
                    width: "30%",
                    fontSize: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Fecha De Entrega:
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                flexDirection: "column",
                marginTop: "5px",
              }}
            >
              <Text style={{ fontSize: "12px", marginTop: "15px" }}>
                DESCRIPCION DE LA FALLA
              </Text>
              <Text
                style={{
                  marginTop: "5px",
                  border: "1px solid black",
                  fontSize: "10px",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                {props.name.details[0].value}
              </Text>
            </View>
            <View>
              <View>
                <Text style={{ fontSize: "12px", marginTop: "15px" }}>
                  REPORTE DE MANTENIMIENTO
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{ width: "50%", marginTop: "5px" }}>
                  <Text style={{ fontSize: "11px" }}>
                    1. Limpieza de Roller de Goma
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    2. Limpieza de Rodamientos Metalicos
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    3. Limpieza de sensores externos
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    4. Limpieza de sensores internos
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    5. Limpieza de sensores de rodamientos plasticos
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    6. Limpieza de DISPLAY y panel de opciones
                  </Text>
                  <Text style={{ fontSize: "11px" }}>7. Limpieza de case</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontSize: "11px" }}>
                    8. Limpieza de sensores UV
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    9. Calibracion de sensores IR
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    10. Calibracion de sensores MG
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    11. Calibracion de CIS
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    12. Calibracion sensor de espresor
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    13. Calibracion de regleta
                  </Text>
                  <Text style={{ fontSize: "11px" }}>
                    14. Prueba de papel blanco de 90Grs
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                flexDirection: "column",
                marginTop: "15px",
              }}
            >
              <Text style={{ fontSize: "12px", marginTop: "5px" }}>
                DESCRIPCION DEL SERVICIO PRESTADO
              </Text>
              <Text
                style={{
                  marginTop: "5px",
                  border: "1px solid black",
                  fontSize: "10px",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                {props.name.details[0].value}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                flexDirection: "column",
                marginTop: "15px",
              }}
            >
              <Text style={{ fontSize: "12px" }}>OBSERVACIONES</Text>
              <Text
                style={{
                  marginTop: "5px",
                  border: "1px solid black",
                  fontSize: "10px",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                {props.name.details[0].value}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: "9px" }}>
                Nota.- El equipo se entrega funcionando con el visto bueno por
                parte del JEFE OPERATIVO responsable de la agencia respectiva.
              </Text>
              <Text style={{ fontSize: "9px" }}>
                TECNOGENIA actua como centro de servicio autorizado DMC - DMC no
                se responsabiliza por los trabajos realizados por TECNOGENIA
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: "100px",
              }}
            >
              <Text style={{ borderTop: "1px dotted black", fontSize: "11px" }}>
                TECNICO DE MANTENIMIENTO
              </Text>
              <Text style={{ borderTop: "1px dotted black", fontSize: "11px" }}>
                SOLICITANTE CONFORME
              </Text>
              <Text style={{ borderTop: "1px dotted black", fontSize: "11px" }}>
                AUTORIZADO POR
              </Text>
            </View>
            <View style={{ marginTop: "100px" }}>
              <Text
                style={{
                  fontSize: "8px",
                  borderTop: "1px solid black",
                  paddingTop: "5px",
                }}
              >
                Departamento de Operaciones TECNOGENIA tecnologia Genial Tel:
                +591 77221284 - 77266051 - Tel.: de referencia o whatsapp
                63173500
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
