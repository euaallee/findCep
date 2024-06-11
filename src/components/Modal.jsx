import styled from "styled-components"
import { IoCloseCircle } from "react-icons/io5"

const BgModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: ${p => p.hidden ? "none" : "flex"};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`
const ContainerModal = styled.div`
  width: 35rem;
  height: 20rem;
  padding: .7rem;
  background: #fff;
  border-radius: .8rem;
  box-shadow: .1rem .1rem 1rem .05rem rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: rotate .2s linear;
`
export default function Modal({ children, isOpen, onClose }) {

  return (
    <BgModal hidden={!isOpen}>
      <ContainerModal>
        <IoCloseCircle
          style={
            {
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer"
            }}
          size={24}
          onClick={onClose}
        />
        {children}
      </ContainerModal>
    </BgModal>
  )
}
