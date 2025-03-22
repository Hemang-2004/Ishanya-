import { cn } from "@/lib/utils"

interface IshanyaLogoProps {
  className?: string
}

export function IshanyaLogo({ className }: IshanyaLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="logo-leaf" style={{ animationDelay: "0.1s" }}>
          <path d="M100 40C90 50 85 65 95 80C105 95 115 85 120 75C125 65 110 30 100 40Z" fill="#E5C85B" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.2s" }}>
          <path d="M120 45C110 55 105 70 115 85C125 100 135 90 140 80C145 70 130 35 120 45Z" fill="#D4B94A" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.3s" }}>
          <path d="M80 45C70 55 65 70 75 85C85 100 95 90 100 80C105 70 90 35 80 45Z" fill="#F6D96A" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.4s" }}>
          <path d="M140 60C130 70 125 85 135 100C145 115 155 105 160 95C165 85 150 50 140 60Z" fill="#E5C85B" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.5s" }}>
          <path d="M60 60C50 70 45 85 55 100C65 115 75 105 80 95C85 85 70 50 60 60Z" fill="#F6D96A" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.6s" }}>
          <path d="M110 70C100 80 95 95 105 110C115 125 125 115 130 105C135 95 120 60 110 70Z" fill="#3D8C40" />
        </g>
        <g className="logo-leaf" style={{ animationDelay: "0.7s" }}>
          <path d="M90 70C80 80 75 95 85 110C95 125 105 115 110 105C115 95 100 60 90 70Z" fill="#2D6830" />
        </g>
        <path
          d="M100 120C110 120 120 110 120 100C120 90 110 80 100 80C90 80 80 90 80 100C80 110 90 120 100 120Z"
          fill="#1A1A1A"
        />
        <path
          d="M95 140C95 140 90 130 100 130C110 130 105 140 105 140L105 160C105 160 95 160 95 160L95 140Z"
          fill="#1A1A1A"
        />
      </svg>
    </div>
  )
}

