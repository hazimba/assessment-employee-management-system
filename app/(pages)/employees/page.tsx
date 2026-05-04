import TitlePage from "@/components/title-page";
import { createClient } from "@/lib/supabase/client";
import TableRender from "./TableRender";

const EmployeesPage = async () => {
  const supabase = await createClient();
  const { data: employees, error } = await supabase
    .from("employees")
    .select("*, department: departments(name), position: positions(name)");

  if (error) {
    console.error("Error fetching employees:", error);
    return <div>Error fetching employees</div>;
  }

  console.log("Fetched employees:", employees);

  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Employees"
        description="This is the Employees page. You can manage your company's employees here."
        linkHref="/employees/create"
      />
      <TableRender employees={employees} />
    </div>
  );
};
export default EmployeesPage;
