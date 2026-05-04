import TableRender from "@/components/table-render";
import TitlePage from "@/components/title-page";
import { createClient } from "@/lib/supabase/client";

const DepartmentsPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("departments").select("*");

  if (error) {
    console.error("Error fetching departments:", error);
    return <div>Error fetching departments</div>;
  }

  return (
    <div className="md:p-6 p-0">
      <TitlePage
        title="Departments"
        description="This is the Departments page. You can manage your company's departments here."
        linkHref="/departments/create"
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Department List</h2>
        <TableRender data={data} entity="departments" />
      </div>
    </div>
  );
};
export default DepartmentsPage;
