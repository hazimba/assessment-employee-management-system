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
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can manage your account, view your
        activity, and access exclusive features.
      </p>
      {/* Add more dashboard content here */}
    </div>
  );
};
export default DashboardPage;
