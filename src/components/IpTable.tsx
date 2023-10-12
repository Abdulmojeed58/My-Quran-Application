import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData(name: string, status: string, isRemovable: boolean) {
  return { name, status, isRemovable };
}

export default function DenseTable({
  data,
}: {
  data: { ip: string; isRemovable: boolean }[];
}) {
  const rows = data.map((item) =>
    createData(item.ip, "Active", item.isRemovable)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ip Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <span className="h-[.7rem] w-[.7rem] inline-block rounded-full bg-green-400 mr-2"></span>
                {row.status}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  type="button"
                  disabled={!row.isRemovable}
                  sx={{ backgroundColor: "#000000", color: "white" }}
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
