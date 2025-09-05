import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function HomePage() {
  return (
    <DashboardLayout>
      <OverviewDashboard />
    </DashboardLayout>
  );
}