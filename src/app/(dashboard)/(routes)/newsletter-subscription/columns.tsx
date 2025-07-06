import { format } from "date-fns";

export interface NewsBooking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  payStatus: string;
  transactionId: string | null;
  paymentDate: string;
  newsLetterName: string;
  newsLetterId: number;
  countryNames: string[];
}

export const columns = [
  {
    name: "First Name",
    selector: (row: NewsBooking) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: NewsBooking) => row.lastName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: NewsBooking) => row.email,
    sortable: true,
    wrap: true,
    cell: (row: NewsBooking) => <div className="break-all">{row.email}</div>,
  },
  {
    name: "Newsletter",
    selector: (row: NewsBooking) => row.newsLetterName,
    sortable: true,
  },
  {
    name: "Countries",
    selector: (row: NewsBooking) => row.countryNames.join(", "),
    wrap: true,
  },
  {
    name: "Amount",
    selector: (row: NewsBooking) => row.amount,
    sortable: true,
    cell: (row: NewsBooking) => `$${row.amount.toFixed(2)}`,
  },
  {
    name: "Status",
    selector: (row: NewsBooking) => row.payStatus,
    sortable: true,
    cell: (row: NewsBooking) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.payStatus === "Paid"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {row.payStatus}
      </span>
    ),
  },
  {
    name: "Transaction ID",
    selector: (row: NewsBooking) => row.transactionId || "-",
    sortable: true,
  },
  {
    name: "Payment Date",
    selector: (row: NewsBooking) => row.paymentDate,
    sortable: true,
    cell: (row: NewsBooking) => {
      const date = new Date(row.paymentDate);
      return format(date, "MMM dd, yyyy");
    },
  },
];
