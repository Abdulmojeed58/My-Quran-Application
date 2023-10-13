import React, { useRef } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ipAddressActions } from "@/store/ipAddressSlice";
import { TextField, Button } from "@mui/material";

const IpForm = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleForm = () => {
    dispatch(ipAddressActions.handleToggleForm());
  };

  const handleAddIp = async () => {
    if (inputRef.current) {
      dispatch(ipAddressActions.addNewIpAddress(inputRef.current.value));
      dispatch(ipAddressActions.handleToggleForm());
    }
  };
  return (
    <Modal handleChange={handleToggleForm}>
      <form
        className="p-5 max-w-[95vw] w-[500px] bg-white relative z-40 modal rounded-md"
        onSubmit={handleAddIp}
      >
        <h1>Input your Ip Address</h1>
        <TextField
          id="outlined-basic"
          label="Ip Address"
          type="text"
          variant="outlined"
          required
          inputRef={inputRef}
          sx={{ display: "block", marginTop: "1rem", marginBottom: "1rem" }}
          fullWidth
        />
        <Button type="submit" variant="outlined">
          Add IP ADDRESS
        </Button>
      </form>
    </Modal>
  );
};

export default IpForm;
