export default function DataField({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ background: "#222228", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5c5b6e", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                {label}
            </div>
            <div style={{ fontSize: 14, color: "#f0eff4", fontWeight: 500 }}>
                {value}
            </div>
        </div>
    );
}