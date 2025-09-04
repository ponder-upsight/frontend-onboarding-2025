import CustomToast from "./ui/CustomToast";
import CustomConfirmModal from "./ui/CustonComfirmModal";
import FetchingSpinner from "./ui/FetchingSpinner";
import ImageDetailViewersModal from "./ui/ImageDetailViewersModal";

const Modals = () => {
  return (
    <>
      <ImageDetailViewersModal />
      <FetchingSpinner />
      <CustomConfirmModal />
      <CustomToast />
    </>
  );
};
export default Modals;
