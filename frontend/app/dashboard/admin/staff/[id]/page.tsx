import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const StaffDetailPage = () => {
  return (
    <div>
      <h1>Staff Detail Page</h1>
      <Input type="text" placeholder="Search..." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>123-456-7890</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane.smith@example.com</TableCell>
            <TableCell>987-654-3210</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default StaffDetailPage

