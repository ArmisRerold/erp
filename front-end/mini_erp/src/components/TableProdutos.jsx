import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'id', label: 'ID', minWidth: 70 },

    { id: 'nome', label: 'Produto', minWidth: 200 },

    {
        id: 'quantidade',
        label: 'Quantidade',
        minWidth: 120,
        align: 'right',
    },

    {
        id: 'valor',
        label: 'Valor (R$)',
        minWidth: 120,
        align: 'right',
        format: (value) =>
            value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
    },

    {
        id: 'categoria',
        label: 'Categoria',
        minWidth: 150,
    },
];


function createData(id, nome, quantidade, valor, categoria) {
    return { id, nome, quantidade, valor, categoria };
}


const rows = [
    createData(1, 'Teclado Mecânico', 15, 299.90, 'Periféricos'),
    createData(2, 'Mouse Gamer', 32, 149.90, 'Periféricos'),
    createData(3, 'Monitor 24"', 8, 899.99, 'Monitores'),
    createData(4, 'Notebook i5', 5, 3499.00, 'Computadores'),
    createData(5, 'HD Externo 1TB', 0, 389.90, 'Armazenamento'),
    createData(6, 'SSD NVMe 512GB', 20, 459.90, 'Armazenamento'),
    createData(7, 'Headset', 12, 219.90, 'Áudio'),
];


export default function TableProdutos() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
