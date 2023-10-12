import React from 'react';

const Modal = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={`fixed inset-0 h-screen w-screen`} />
    );
};

export default Modal;
