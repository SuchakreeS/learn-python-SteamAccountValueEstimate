type Dot = {
    top: string;
    left: string;
    size: number;
}

const dots: Dot[] = [
    { top: "5.5%", left: "3.6%", size: 120 },
    { top: "14.3%", left: "76.9%", size: 120 },
    { top: "24.6%", left: "34.4%", size: 90 },
    { top: "0%", left: "21%", size: 50 },
    { top: "9.4%", left: "59.4%", size: 90 },
    { top: "35.4%", left: "0.8%", size: 50 },
    { top: "37.9%", left: "60.8%", size: 50 },
    { top: "45.9%", left: "87.6%", size: 50 },
    { top: "61.9%", left: "46.9%", size: 90 },
    { top: "62.4%", left: "96.25%", size: 90 },
    { top: "66.8%", left: "12.6%", size: 120 },
    { top: "77.7%", left: "65.8%", size: 120 },
    { top: "84.1%", left: "28.1%", size: 90 },
    { top: "94.2%", left: "43.75%", size: 90 },
]

export default function ConfettiBg(){
    return(
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {dots.map((dot, index) => (
                <div 
                key={index}
                className="absolute rounded-full bg-accent2"
                style={{
                    top: dot.top,
                    left: dot.left,
                    width: dot.size,
                    height: dot.size
                }}>
                </div>
            ))}
        </div>
    )
}