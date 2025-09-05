import { StageDashboard } from "@/components/dashboard/stage-dashboard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { notFound } from "next/navigation";

const validStages = ["first-touch", "qualified", "opportunity", "closed"];

interface StagePageProps {
  params: Promise<{
    stage: string;
  }>;
}

export default async function StagePage({ params }: StagePageProps) {
  const { stage } = await params;
  
  if (!validStages.includes(stage)) {
    notFound();
  }

  return (
    <DashboardLayout>
      <StageDashboard stage={stage as "first-touch" | "qualified" | "opportunity" | "closed"} />
    </DashboardLayout>
  );
}

export function generateStaticParams() {
  return validStages.map((stage) => ({
    stage: stage,
  }));
}
