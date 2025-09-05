import { SettingsDashboard } from "@/components/dashboard/settings-dashboard";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <SettingsDashboard />
    </AdminLayout>
  );
}
