import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const DepartmentsPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("departments").select("*");

  if (error) {
    console.error("Error fetching departments:", error);
    return <div>Error fetching departments</div>;
  }

  console.log("Departments data:", data);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold mb-4">Departments</h1>
        <Button size="sm" className="cursor-pointer">
          Add Department
        </Button>
      </div>
      <p>
        This is the Departments page. You can manage your company's departments
        here.
      </p>
    </div>
  );
};
export default DepartmentsPage;
