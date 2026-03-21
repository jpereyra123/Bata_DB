import AccesosRapidos from "./components/AccesosRapidos";
import Alerts from "./components/Alerts";
import DashboardHeader from "./components/DashboardHeader";
import InscriptosPorEtapa from "./components/InscriptosPorEtapa";
import Stats from "./components/Stats";
import getStats from "./services/getStats";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
    const stats = await getStats();

    return (
        <>
            <DashboardHeader />
            <Stats stats={stats}/>
            <Alerts stats={stats}/>
            <InscriptosPorEtapa stats={stats}/>
            <AccesosRapidos/>
        </>
    );
}

