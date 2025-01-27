import { useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const userPerPage = 5; // Number of users per page

    // Fetch paginated users using the correct useQuery syntax
    const { data: response = {}, isLoading, error, refetch } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/all-users?page=${currentPage}&size=${userPerPage}`);
            return res.data;
        },
        keepPreviousData: true,
    });
    const users = response.result || []
    const totalUsers = response?.totalUsers || 0; // Total users from backend
    const totalPages = Math.ceil(totalUsers / userPerPage); // Calculate total pages
    const pages = [...Array(totalPages).keys()].map(i => i + 1)
    const handleSetRole = (role, id) => {
        axiosSecure.patch(`/update-role/${id}`, { role })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success"
                    });
                }
            })
    }

    // Pagination handler
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users</div>;

    return (
        <div>
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Number of Parcels</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.name}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.numberOfParcels}</TableCell>
                            <TableCell>{user.totalSpent} TK</TableCell>
                            <TableCell>
                                <div className="grid gap-2">
                                    <Select onValueChange={(value) => handleSetRole(value, user._id)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="deliveryMan">Deliveryman</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            {/* Pagination Component */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {pages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => handlePageChange(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default AllUsers;
