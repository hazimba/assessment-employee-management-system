"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import NoDataFound from "@/components/no-data-found";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { Employee } from "@/types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TableRenderProps {
  data: Employee[];
}

const TableRender = ({ data }: TableRenderProps) => {
  const [employees, setEmployees] = useState<Employee[]>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const supabase = await createClient();
      const { data: employees, error } = await supabase
        .from("employees")
        .select("*, department: departments(name), position: positions(name)");

      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(employees);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("Delete employee with id:", id);
    const supabase = await createClient();
    try {
      const { error } = await supabase.from("employees").delete().eq("id", id);
      if (error) {
        console.error("Error deleting employee:", error);
      } else {
        console.log("Employee deleted successfully");
      }
      toast.success("Employee deleted successfully.");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Unexpected error deleting employee:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Employee List</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Position</TableHead>
            <TableHead className="hidden md:table-cell">Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <NoDataFound entity="employees" />
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee?.position?.name || "N/A"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee?.department?.name || "N/A"}
                </TableCell>
                <TableCell className="flex items-center">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                      <Eye size={14} className="mr-4 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Employee Details</DialogTitle>
                        <DialogDescription>
                          Here are the details of the employee. You can edit
                          them by clicking the pencil icon or delete the
                          employee by clicking the trash icon.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Name
                            </p>
                            <p>{employee.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Email
                            </p>
                            <p>{employee.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Phone
                            </p>
                            <p>{employee.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Position
                            </p>
                            <p>{employee?.position?.name || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Department
                            </p>
                            <p>{employee?.department?.name || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Status
                            </p>
                            <p>{employee.status}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Address
                            </p>
                            <p>{employee.address}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Created At
                            </p>
                            <p>
                              {new Date(employee.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Updated At
                            </p>
                            <p>
                              {new Date(employee.updated_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                          <Link
                            href={`/employees/${employee.id}`}
                            type="submit"
                          >
                            <Button>Edit</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </DialogContent>
                  </Dialog>
                  <Pencil
                    size={14}
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(`/employees/${employee.id}`);
                    }}
                  />
                  <Popover>
                    <PopoverTrigger>
                      <Trash2 size={14} className="ml-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto">
                      <PopoverTitle>Delete Employee</PopoverTitle>
                      <PopoverDescription>
                        Are you sure you want to delete this employee?
                      </PopoverDescription>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableRender;
