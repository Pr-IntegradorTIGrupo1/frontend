import DataTable from 'react-data-table-component';
import { Transaction } from '@/app/interface/Transaction';
const columns = [
    {
      name: 'Reference Number',
      selector: (row: Transaction) => row.referenceNumber,
      sortable: true,
    },
    {
      name: 'Pay Date',
      selector: (row: Transaction) => row.payDate,
      sortable: true,
    },
    {
      name: 'Transaction Type',
      selector: (row: Transaction) => row.transactionType,
      sortable: true,
    },
    {
      name: 'Sender',
      selector: (row: Transaction) => row.sender,
      sortable: true,
    },
    {
      name: 'Receiver',
      selector: (row: Transaction) => row.receiver,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: Transaction) => row.amount,
      sortable: true,
    },
];

export default function PayRecordsTable({data}: {data: any[]}) {
    return (
        <DataTable
            title="Pay Records"
            columns={columns}
            data={data}
            pagination
        />
    )
}