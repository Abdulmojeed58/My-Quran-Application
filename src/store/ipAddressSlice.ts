import { ipAddressState } from "@/interface/reduxInterface";
import { whitelistedIps } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ipAddressState = { ipLists: whitelistedIps };

const ipAddressSlice = createSlice({
  name: "ipAddress",
  initialState,
  reducers: {
    addNewIpAddress(state, action) {
      const existiingIp = state.ipLists.some(
        (item) => item.ip === action.payload
      );
      const newIpAddress = { ip: action.payload, isRemovable: true };

      if (!existiingIp) {
        state.ipLists.push(newIpAddress);
      } else {
        console.log("This Ip address already exist");
      }

    },

    removeIpAddress(state, action) {
      const itemToRemoveIndex = state.ipLists.findIndex(
        (item) => item.ip === action.payload
      );

      if (itemToRemoveIndex !== -1) {
        state.ipLists.splice(itemToRemoveIndex, 1);
      } else {
        console.log(`Item not found in the array.`);
      }
    },
  },
});

export const ipAddressActions = ipAddressSlice.actions;
export default ipAddressSlice.reducer;
