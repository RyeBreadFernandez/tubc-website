import Link from 'next/link'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: undefined }
type LinkProps = BaseProps & { href: string }
type Props = ButtonProps | LinkProps

const styles: Record<Variant, string> = {
  primary: 'bg-terra hover:bg-terra-dark text-parchment font-semibold',
  secondary: 'bg-sand hover:bg-border text-bark font-semibold',
  ghost: 'bg-transparent hover:bg-parchment-dark text-soil hover:text-bark border border-border',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-full',
  md: 'px-5 py-2.5 text-sm rounded-full',
  lg: 'px-7 py-3 text-base rounded-full',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 transition-colors ${styles[variant]} ${sizes[size]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href } = props as LinkProps
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const { href: _href, ...rest } = props as ButtonProps & { href?: undefined }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
