import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadContact,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/contactSlice";

export const useContactStore = () => {
  const dispatch = useDispatch();
  const { rowsContact, activeRows } = useSelector((state) => state.contact);
  const setActiveRow = (contactRow) => {
    dispatch(onSetActiveRows(contactRow));
  };
  const startSavingRow = async (contactRow) => {
    if (contactRow.id) {
      await tecApi.put(`/contact/updateContact/${contactRow.id}`, contactRow);
      dispatch(onUpdateRow({ ...contactRow }));
    } else {
      const { data } = await tecApi.post("/contact/postContact", contactRow);
      console.log(data);
      dispatch(onAddNewRow({ ...contactRow, id: data.contact.id }));
    }
  };
  const deleteRow = async () => {
    try {
      await tecApi.delete(`/contact/deleteContact/${activeRows.id}`);
      dispatch(onDeleteRow());
    } catch (error) {
      console.log(error);
    }
  };
  const startLoadingContact = async () => {
    try {
      const { data } = await tecApi.get("/contact/getContact");
      console.log(data.contactList);
      const contact = [];
      data.contactList.map((elem) => {
        contact.push({
          id: elem.id,
          name: elem.name,
          lastname: elem.lastname,
          phone: elem.phone,
          charge: elem.charge,
          company: elem.company.name,
        });
      });
      dispatch(onLoadContact(contact));
    } catch (error) {
      console.log("error cargando compañias");
      console.log(error);
    }
  };
  return {
    rowsContact,
    activeRows,
    setActiveRow,
    startSavingRow,
    deleteRow,
    startLoadingContact,
  };
};
