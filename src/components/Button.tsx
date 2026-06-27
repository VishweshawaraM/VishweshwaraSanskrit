import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald';

interface BaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
  href?: never;
};

type ButtonAsAnchor = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant = 'primary', href, children, ...props }, ref) => {
    let variantStyles = '';
    
    switch (variant) {
      case 'primary':
        variantStyles = 'text-ground bg-gradient-to-r from-gold-base to-gold-bright shadow-lg shadow-gold-dim hover:shadow-gold-mid';
        break;
      case 'secondary':
        variantStyles = 'text-text-secondary bg-surface-2 border border-gold-mid hover:text-text-gold hover:border-text-gold hover:bg-surface-3';
        break;
      case 'outline':
        variantStyles = 'text-text-gold bg-transparent border border-gold-mid hover:bg-surface-3 hover:text-gold-bright hover:border-gold-bright';
        break;
      case 'ghost':
        variantStyles = 'text-text-secondary hover:text-text-gold bg-transparent';
        break;
      case 'emerald':
        variantStyles = 'text-ground bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20';
        break;
    }

    // The active:scale-[0.97], md:hover:-translate-y-[3px], and min-h-[52px] satisfy the unified interaction requirements
    const baseStyles = 'inline-flex items-center justify-center space-x-2 px-6 sm:px-8 rounded-md font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-220 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97] md:hover:-translate-y-[3px] disabled:active:scale-100 disabled:hover:translate-y-0';

    const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

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
