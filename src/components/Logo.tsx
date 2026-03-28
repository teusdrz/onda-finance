import { cn } from "@/lib/utils"

type LogoSize = "sm" | "md" | "lg"

interface LogoProps {
  size?: LogoSize
  className?: string
}

const SIZE_STYLES: Record<LogoSize, { icon: string; text: string }> = {
  sm: { icon: "h-7 w-7", text: "text-lg" },
  md: { icon: "h-9 w-9", text: "text-2xl" },
  lg: { icon: "h-11 w-11", text: "text-4xl" },
}

export function Logo({ size = "sm", className }: LogoProps) {
  const styles = SIZE_STYLES[size]

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoIcon className={styles.icon} />
      <span className={cn("font-bold tracking-tight", styles.text)}>
        <span className="text-foreground">Onda</span>
        <span className="text-primary"> Finance</span>
      </span>
    </div>
  )
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M6 18c3.33-4 6.67-4 10 0s6.67 4 10 0"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 13c3.33-4 6.67-4 10 0s6.67 4 10 0"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}
