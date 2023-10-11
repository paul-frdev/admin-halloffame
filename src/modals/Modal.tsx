import React from "react";
import { Modal as AppModal } from "antd";

interface ModalProps {
  title: string;
  open: boolean;
  hideModal: () => void;
  performAction?: (id: string) => void;
}
export const Modal: React.FC<ModalProps> = ({ title, open, hideModal, performAction }) => {
  return (
    <AppModal
      title="Confirmation"
      open={open}
      onOk={() => { }}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </AppModal>
  )
}
