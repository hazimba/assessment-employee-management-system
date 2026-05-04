import { createClient } from "@/lib/supabase/client";

const DashboardPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("employees").select("*");

  if (error) {
    console.error("Error fetching employees:", error);
    return <div>Error fetching employees</div>;
  }
  console.log("Employees data:", data);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome to the Employees page! Here you can manage all employee-related
        information.
      </p>
    </div>
  );
};
export default DashboardPage;
