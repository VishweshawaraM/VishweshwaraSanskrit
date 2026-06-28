import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald';

interface BaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
  href?: never;
  to?: never;
};

type ButtonAsAnchor = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  href: string;
  to?: never;
};

type ButtonAsLink = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  href?: never;
  to: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant = 'primary', href, to, children, ...props }, ref) => {
    let variantStyles = '';
    
    switch (variant) {
      case 'primary':
        variantStyles = 'text-ground bg-gradient-to-r from-gold-base to-gold-bright shadow-lg shadow-gold-dim hover:shadow-gold-mid hover:from-gold-bright hover:to-gold-glow';
        break;
      case 'secondary':
        variantStyles = 'text-text-secondary bg-surface-2 border border-gold-mid hover:text-text-gold hover:border-text-gold hover:bg-surface-3 hover:shadow-[0_0_15px_rgba(200,134,10,0.15)]';
        break;
      case 'outline':
        variantStyles = 'text-text-gold bg-transparent border border-gold-mid hover:bg-surface-3 hover:text-gold-bright hover:border-gold-bright hover:shadow-[0_0_15px_rgba(200,134,10,0.15)]';
        break;
      case 'ghost':
        variantStyles = 'text-text-secondary hover:text-text-gold bg-transparent hover:bg-surface-2';
        break;
      case 'emerald':
        variantStyles = 'text-ground bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20';
        break;
    }

    const baseStyles = 'inline-flex items-center justify-center space-x-2 px-6 sm:px-8 rounded-md font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-220 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97] md:hover:-translate-y-[3px] disabled:active:scale-100 disabled:hover:translate-y-0 cursor-pointer';

    const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

    if (to) {
      return (
        <Link
          to={to}
          className={combinedClassName}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
