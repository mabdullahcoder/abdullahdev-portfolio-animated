import Experience from "@/components/experience/Experience";
import { getProjectShots } from "@/lib/projectShots";

export default function Home() {
  return <Experience projectShots={getProjectShots()} />;
}
