import TablaAlumnos from "./TablaAlumnos";
import AlumnosHeader from "./AlumnosHeader";
export const dynamic = "force-dynamic";

export default async function Alumnos() {
    return (
        <>
            <AlumnosHeader />
            <TablaAlumnos/>
        </>
    );
}