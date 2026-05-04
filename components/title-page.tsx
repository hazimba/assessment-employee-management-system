"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TitlePageProps {
  title: string;
  description: string;
  linkHref: string;
}

const TitlePage = ({ title, description, linkHref }: TitlePageProps) => {
  const [countDept, setCountDept] = useState<number>(0);
  const [countPos, setCountPos] = useState<number>(0);

  useEffect(() => {
    const fetchDepartmentsCount = async () => {
      const supabase = await createClient();
      const { count, error } = await supabase
        .from("departments")
        .select("*", { count: "exact", head: true });

      const { count: posCount, error: posError } = await supabase
        .from("positions")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching departments count:", error);
      } else {
        setCountDept(count || 0);
      }

      if (posError) {
        console.error("Error fetching positions count:", posError);
      } else {
        setCountPos(posCount || 0);
      }
    };

    fetchDepartmentsCount();
  }, []);

  console.log("title:", title);

  console.log("Departments count:", countDept);
  console.log("Positions count:", countPos);

  return (
    <>
      <div className="flex md:items-center items-start justify-between md:mb-4">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>

        {title === "Employees" && (countDept === 0 || countPos === 0) ? (
          <Tooltip>
            <TooltipTrigger>
              <Button disabled variant="outline">
                Add {title}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                Please add at least one department and one position before
                adding employees.
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link href={linkHref} className="cursor-pointer">
            <Button variant="outline">Add {title}</Button>
          </Link>
        )}
      </div>
      <p>{description}</p>
    </>
  );
};
export default TitlePage;
