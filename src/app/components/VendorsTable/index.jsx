import React from 'react';
import MaterialTable from '@material-table/core';
function VendorsTable({ title, columns, data, deleteHandler }) {
    return (
        <div>
            <MaterialTable
                // other props
                title={title}
                // options={{
                //     sorting: true,
                //     // search: true,
                //     //   selection: true,
                //     // pageSize: 50,
                //     // pageSizeOptions: [50, 100, 500],
                //     headerStyle: {
                //         fontWeight: 'bold',
                //     },
                // }}
                columns={columns}
                data={data}
                style={{ padding: '0px 10px' }}
            />
        </div>
    );
}

export default VendorsTable;
