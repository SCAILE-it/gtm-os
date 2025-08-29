import { StageDashboard } from "@/components/dashboard/stage-dashboard";
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

  return <StageDashboard stage={stage as "first-touch" | "qualified" | "opportunity" | "closed"} />;
}

export function generateStaticParams() {
  return validStages.map((stage) => ({
    stage: stage,
  }));
}
