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
      <div className="flex items-center justify-center fixed top-[5rem] z-40 left-[50%] translate-x-[-50%]">
        {children}
      </div>
    </>
  );
};

export default Modal;
