import IpForm from "@/components/IpForm";
import DenseTable from "@/components/IpTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ipAddressActions } from "@/store/ipAddressSlice";
import { getCurrentIp } from "@/utils/getCurrentIpAddress";
import React from "react";

const IpConfig = () => {
    const isIpForm = useAppSelector((state) => state.ipAddress.isIpForm);
  const { ipLists } = useAppSelector((state) => state.ipAddress);
  const dispatch = useAppDispatch();

  const handleAddCurrentIp = async () => {
    const newIp = await getCurrentIp();

    dispatch(ipAddressActions.addNewIpAddress(newIp));
  };

  const handleToggleForm = () => {
    dispatch(ipAddressActions.handleToggleForm());
  };

  return (
    <>
    {isIpForm && <IpForm />}
    <div className="mt-[3rem] md:mt-0 p-[2rem] md:p-[3rem] mx-auto">
      <h2>Configure your ip</h2>
      <div className=" flex gap-5 mt-5 items-center justify-center md:justify-end">
        <button
          className="uppercase border rounded-[6px] p-2 text-[0.8rem] hover:bg-[#000000c7] hover:text-white transition-colors ease-in-out duration-75"
          onClick={handleAddCurrentIp}
        >
          Add current ip address
        </button>
        <button onClick={handleToggleForm} className="uppercase border rounded-[6px] p-2 text-[0.8rem] bg-black text-white hover:bg-[#000000c7] transition-colors ease-in-out duration-75">
          Add ip address
        </button>
      </div>
      <div className="mt-7">
        <DenseTable data={ipLists} />
      </div>
    </div>
    </>
  );
};

export default IpConfig;
