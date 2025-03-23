import Image from "next/image"

interface IshanyaLogoProps {
  className?: string
  showTagline?: boolean
}

export function IshanyaLogo({ className = "", showTagline = true }: IshanyaLogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-16 h-16">
        <Image src="/images/ishanya-logo.png" alt="Ishanya Logo" fill className="object-contain" priority />
      </div>
      {showTagline && <span className="text-xs text-primary mt-1">Journey to Inclusion</span>}
    </div>
  )
}

