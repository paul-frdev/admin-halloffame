import React from "react";
import { Modal as AppModal } from "antd";

interface ModalProps {
  title: string;
  open: boolean;
  hideModal: () => void;
  performAction?: () => void;
}
export const Modal: React.FC<ModalProps> = ({ title, open, hideModal, performAction }) => {
  return (
    <AppModal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </AppModal>
  )
}
