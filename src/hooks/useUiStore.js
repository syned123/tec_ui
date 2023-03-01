import { useDispatch, useSelector } from "react-redux";
import { onCloseTecModal, onOpenTecModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isTecModalOpen } = useSelector((state) => state.ui);
  const openTecModal = () => {
    dispatch(onOpenTecModal());
  };
  const closeTecModal = () => {
    dispatch(onCloseTecModal());
  };
  return {
    isTecModalOpen,
    openTecModal,
    closeTecModal,
  };
};
