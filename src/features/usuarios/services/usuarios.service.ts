import { SetStateAction } from "react";

export interface Usuario {
    id: string;
    email: string;
    role: string;
    createdAt: string;
}

interface PropsFetchUsuarios {
    setUsuarios : React.Dispatch<SetStateAction<Usuario[]>>
    setLoading : React.Dispatch<SetStateAction<boolean>>
}

export const usuariosService = {
    async fetchUsuarios({ setUsuarios, setLoading } : PropsFetchUsuarios) {
        try {
            const res = await fetch("/api/usuarios");
            const body = await res.json();
            setUsuarios(body.data ?? []);
        } catch {
            console.error("Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    },
    

}