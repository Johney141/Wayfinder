import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal 
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  icon
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };


  return (
    <span onClick={onClick} className={className}>
        {icon}
    </span>
  )
}

export default OpenModalButton;