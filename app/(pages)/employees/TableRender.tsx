"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface TableRenderProps {
  data: Employee[];
}

const TableRender = ({ data }: TableRenderProps) => {
  const [employees, setEmployees] = useState<Employee[]>(data);
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
      {employees && employees.length > 0 ? (
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
            {employees.map((employee) => (
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
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-4 border rounded-md bg-muted mt-4">
          <div className="text-center text-muted-foreground animate-pulse">
            <X size={24} className="mx-auto mb-2" />
            <div>
              No employees found. Please add some employees to see them listed
              here.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRender;
