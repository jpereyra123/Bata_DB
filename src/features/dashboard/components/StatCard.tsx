import getStats from "../services/getStats";

export default async function StatCard({ label, value, color, bg, alert }: { label: string; value: number; color: string; bg: string; alert?: boolean }) {
    return (
        <div style={{ background: "#18181c", border: `1px solid ${alert ? "rgba(245,166,35,0.3)" : "#2e2e38"}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5c5b6e", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                {label}
            </div>
            <div style={{ fontSize: 42, fontWeight: 700, color, lineHeight: 1 }}>
                {value}
            </div>
        </div>
    );
}