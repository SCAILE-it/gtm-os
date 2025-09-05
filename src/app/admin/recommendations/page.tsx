import { RecommendationsDashboard } from "@/components/dashboard/recommendations-dashboard";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function RecommendationsPage() {
  return (
    <AdminLayout>
      <RecommendationsDashboard />
    </AdminLayout>
  );
}
