const Modal = ({
  children,
  handleChange,
}: {
  children: React.ReactNode;
  handleChange: () => void;
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 h-screen w-screen bg-[#0000008c] z-30`}
        onClick={handleChange}
      />
      <div className="flex items-center justify-center mt-[5rem]">{children}</div>
    </>
  );
};

export default Modal;
