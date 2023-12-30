import React, { ReactNode, FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={close}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
