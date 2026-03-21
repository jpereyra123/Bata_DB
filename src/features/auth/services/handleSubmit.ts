import { signIn } from "next-auth/react";
import { SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface Props {
    e: React.FormEvent
    email: string
    password: string
    setError: React.Dispatch<SetStateAction<string>>
    setLoading: React.Dispatch<SetStateAction<boolean>>
}

export default async function handleSubmit({e, email, password, setError, setLoading}: Props) {
    const router = useRouter();
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) { setError("Credenciales inválidas"); return; }
        router.push("/dashboard");
        router.refresh();
    } catch {
        setError("Error inesperado");
    } finally {
        setLoading(false);
    }
}