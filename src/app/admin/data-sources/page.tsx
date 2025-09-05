import { DataSourcesDashboard } from "@/components/dashboard/data-sources-dashboard";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function DataSourcesPage() {
  return (
    <AdminLayout>
      <DataSourcesDashboard />
    </AdminLayout>
  );
}
