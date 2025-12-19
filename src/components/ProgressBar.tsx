interface Props {
    current: number;
    total: number;
    color: string;
}

export const ProgressBar = ({ current, total, color }: Props) => {
    const progress = total > 0 ? ((total - current) / total) * 100 : 0;

    return (
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
                className="h-3 rounded-full transition-all duration-300"
                style={{
                    width: `${Math.max(0, Math.min(100, progress))}%`,
                    backgroundColor: color
                }}
            />
        </div>
    )
}