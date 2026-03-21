"use client";
import { SetStateAction } from "react";
import { AlumnoData } from "@/features/alumnos/types"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface PropsSaveNotas {
    alumnoId: string
    notasValue: string
    router: AppRouterInstance
    setSavingNotas: React.Dispatch<SetStateAction<boolean>>
    setNotasSaved: React.Dispatch<SetStateAction<boolean>>
}

type PropsSubmit = {
    e: React.FormEvent
    setError: any
    router: AppRouterInstance
    setLoading: any
    form: AlumnoData
}

type PropsSubmitEdit = {
    e: React.FormEvent
    setError: any
    router: AppRouterInstance
    setLoading: any
    form: AlumnoData
    id: string
}

export const fichaAlumnosService = {
    async handleDelete(alumnoId : string, router: AppRouterInstance) {
        if (!confirm("Eliminar este alumno? Esta accion no se puede deshacer.")) return;
        const res = await fetch(`/api/alumnos/${alumnoId}`, { method: "DELETE" });
        if (res.ok) router.push("/alumnos");
        else alert("Error al eliminar");
    },
    async handleEstado(alumnoId: string, nuevoEstado: string, router: AppRouterInstance) { 
        console.log("HandleEstado");
        const res = await fetch(`/api/alumnos/${alumnoId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: nuevoEstado }),
        });
        if (res.ok) router.refresh();
        else alert("Error al actualizar estado");
        console.log("HandleEstadoGOOOOD");
    },
    async handleSaveNotas({ alumnoId, notasValue, router, setSavingNotas, setNotasSaved }: PropsSaveNotas) {
        setSavingNotas(true);
        setNotasSaved(false);
        try {
            const res = await fetch(`/api/alumnos/${alumnoId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notas: notasValue }),
            });
            if (res.ok) {
                setNotasSaved(true);
                setTimeout(() => setNotasSaved(false), 2000);
                router.refresh();
            } else {
                alert("Error al guardar notas");
            }
        } catch {
            alert("Error de conexion");
        } finally {
            setSavingNotas(false);
        }
    },
    async handleSubmit({e, router, setError, setLoading, form} : PropsSubmit) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formEnviar = {
            ...form, tutores: form.tutores.map(({ id_tutor, ...resto }) => resto)
        };
        try {
            const res = await fetch("/api/alumnos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formEnviar),
            });
            const body = await res.json();
            if (!res.ok) {
                setError(body.error ?? "Error inesperado");
                return;
            }
            router.push("/alumnos");
            router.refresh();
        } catch {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    },
    async handleSubmitEdit({e, router, setError, setLoading, form, id} : PropsSubmitEdit) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`/api/alumnos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const body = await res.json();
            if (!res.ok) {
                setError(body.error ?? "Error inesperado");
                return;
            }
            router.push("/alumnos");
            router.refresh();
        } catch {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    }
}