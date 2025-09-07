import { format } from "date-fns";

export interface WebinarBooking {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  amount: number;
  payStatus: string;
  transactionId: string | null;
  paymentDate: string;
  nameService: string;
  description: string;
  priceIndividual: number;
}

export const columns = [
  {
    name: "First Name",
    selector: (row: WebinarBooking) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: WebinarBooking) => row.lastName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: WebinarBooking) => row.email,
    sortable: true,
    wrap: true,
    cell: (row: WebinarBooking) => <div className="break-all">{row.email}</div>,
  },
  {
    name: "Phone",
    selector: (row: WebinarBooking) => row.phoneNumber,
  },
  {
    name: "Country",
    selector: (row: WebinarBooking) => row.country || "N/A",
  },
  {
    name: "Service",
    selector: (row: WebinarBooking) => row.nameService,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: WebinarBooking) => row.amount,
    sortable: true,
    cell: (row: WebinarBooking) => `$${row.amount.toFixed(2)}`,
  },
  {
    name: "Status",
    selector: (row: WebinarBooking) => row.payStatus,
    sortable: true,
    cell: (row: WebinarBooking) => (
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
    name: "Payment Date",
    selector: (row: WebinarBooking) => row.paymentDate,
    sortable: true,
    cell: (row: WebinarBooking) => {
      const date = new Date(row.paymentDate);
      return date.getFullYear() > 1
        ? format(date, "MMM dd, yyyy")
        : "Not paid yet";
    },
  },
];
