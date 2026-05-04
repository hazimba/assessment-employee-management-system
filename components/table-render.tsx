"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Position } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";

interface TableRenderProps {
  data: Position[];
  entity: string;
}

const TableRender = ({ data, entity }: TableRenderProps) => {
  const [entities, setEntities] = useState<Position[]>(data);
  const router = useRouter();

  useEffect(() => {
    const refetchEntities = async () => {
      const supabase = createClient();
      const { data: newData, error } = await supabase.from(entity).select("*");
      if (error) {
        console.error(`Error refetching ${entity}:`, error);
      } else {
        setEntities(newData);
      }
    };
    refetchEntities();
  }, [data, entity]);

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    try {
      const { error } = await supabase.from(entity).delete().eq("id", id);
      if (error) {
        console.error(`Error deleting ${entity}:`, error);
        toast.error(`Failed to delete ${entity}. Please try again.`);
      } else {
        toast.success(`${entity} deleted successfully.`);
        setEntities((prev) => prev.filter((en) => en.id !== id));
      }
    } catch (error) {
      console.error(`Unexpected error deleting ${entity}:`, error);
      toast.error(`Failed to delete ${entity}. Please try again.`);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your company&apos;s {entity}.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entities.map((en) => (
            <TableRow key={en.id}>
              <TableCell>{en.name}</TableCell>
              <TableCell>{format(new Date(en.created_at), "PPP")}</TableCell>
              <TableCell>{format(new Date(en.updated_at), "PPP")}</TableCell>
              <TableCell className="flex items-center">
                <Eye size={14} className="mr-4 cursor-pointer" />
                <Pencil
                  size={14}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/${entity}/${en.id}`);
                  }}
                />
                <Popover>
                  <PopoverTrigger>
                    <Trash2 size={14} className="ml-4 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto">
                    <PopoverTitle>Delete {entity}</PopoverTitle>
                    <PopoverDescription>
                      Are you sure you want to delete this {entity}?
                    </PopoverDescription>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(en.id)}
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
    </>
  );
};
export default TableRender;
