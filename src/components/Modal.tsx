import React from 'react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom d-flex justify-content-center align-items-center">
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
