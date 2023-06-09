import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React from 'react';

function TableProducts({ items }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">
              <b>Brand</b>
            </TableCell>
            <TableCell align="left">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, index) => (
            <TableRow
              key={row.itemNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">
                <IconButton edge="end" aria-label="comments">
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />+
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const itemPropType = PropTypes.shape({
  itemNo: PropTypes.string,
});
const itemsPropType = PropTypes.arrayOf(itemPropType);

TableProducts.propTypes = {
  // eslint-disable-next-line react/require-default-props
  items: itemsPropType,
};

export default TableProducts;
