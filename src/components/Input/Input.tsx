import { AlumnoData, TutorData } from "@/app/(panel)/alumnos/nuevo/types"

interface InputProps<T> {
    field: keyof T
    data: T
    setData: React.Dispatch<React.SetStateAction<T>>
    id?: string
    type?: string
    placeholder?: string
    required?: boolean
    classDiv?: string
}

export default function Input<T>({field, data, setData, id, type = "text", placeholder = "", required=true, classDiv=""} : InputProps<T>) {
    let fieldText = String(field).charAt(0).toUpperCase() + String(field).slice(1)
    let isCheckbox = type == "checkbox";
    return (
        <div className={classDiv}>
            <label htmlFor={id ?? String(field)}>{fieldText}</label>
            <input
                id={id ?? String(field)}
                
                type={type}
                checked={isCheckbox ? Boolean(data[field]) : undefined}
                value={!isCheckbox ? String(data[field] ?? "") : undefined}
                onChange={(e) =>
                setData({
                    ...data,
                    [field]: isCheckbox ? e.target.checked : e.target.value
                    })
                }
                placeholder={placeholder}
                required={required}
            />
        </div>)
}