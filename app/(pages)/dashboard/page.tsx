import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TitlePage from "@/components/title-page";
import { Card } from "@/components/ui/card";

const DashboardPage = async () => {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("employees")
    .select("*", { count: "exact", head: true });

  const { count: departmentsCount, error: deptError } = await supabase
    .from("departments")
    .select("*", { count: "exact", head: true });

  const { count: positionsCount, error: posError } = await supabase
    .from("positions")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching departments:", deptError);
    return <div>Error fetching departments</div>;
  }
  if (posError) {
    console.error("Error fetching positions:", posError);
    return <div>Error fetching positions</div>;
  }

  if (error) {
    console.error("Error fetching employees:", error);
    return <div>Error fetching employees</div>;
  }

  return (
    <div className="md:p-6 p-4 h-screen">
      <TitlePage
        title="Dashboard"
        description="Welcome to the Employees page! Here you can manage all employee-related information."
      />
      <Card className="w-full sm:max-w-md mt-6">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Total Employees: {count}
          </h2>
          <div className="flex space-x-4">
            <Link href="/employees">
              <Button variant="outline">View Employees</Button>
            </Link>
            <Link href="/employees/create">
              <Button variant="outline">Add Employee</Button>
            </Link>
          </div>
        </div>
      </Card>
      <Card className="w-full sm:max-w-md mt-6">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Total Departments: {departmentsCount}
          </h2>
          <div className="flex space-x-4">
            <Link href="/departments">
              <Button variant="outline">View Departments</Button>
            </Link>
            <Link href="/departments/create">
              <Button variant="outline">Add Department</Button>
            </Link>
          </div>
        </div>
      </Card>
      <Card className="w-full sm:max-w-md mt-6">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Total Positions: {positionsCount}
          </h2>
          <div className="flex space-x-4">
            <Link href="/positions">
              <Button variant="outline">View Positions</Button>
            </Link>
            <Link href="/positions/create">
              <Button variant="outline">Add Position</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DashboardPage;
