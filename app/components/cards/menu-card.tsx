import { Link } from "@remix-run/react";
import { cn } from "@/lib/utils"

interface MenuCardProps {
  title: string
  category: string
  imageUrl: string
  href: string
  className?: string
}

export function MenuCard({ title, category, imageUrl, href, className }: MenuCardProps) {
  return (
    <Link 
      to={href}
      className={cn(
        "group relative flex-shrink-0 overflow-hidden rounded-lg bg-background shadow-lg w-[400px]",
        className
      )}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-6 text-white">
        <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-2 text-sm font-medium text-white/80">{category}</p>
      </div>
    </Link>
  )
}