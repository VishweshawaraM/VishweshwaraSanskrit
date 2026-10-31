import React, { useEffect } from 'react';

const SCRIPT_ID = 'razorpay-embed-btn-js';
const SCRIPT_SRC = 'https://cdn.razorpay.com/static/embed_btn/bundle.js';

interface RazorpayEmbedButtonProps {
  /** Your Razorpay Payment Page link, e.g. https://pages.razorpay.com/pl_XXXX/view */
  pageUrl: string;
  /** Button label */
  text?: string;
  /** Button colour (hex). Defaults to the site's gold. */
  color?: string;
  size?: 'small' | 'large';
  className?: string;
}

/**
 * Razorpay "Payment Page" embed button.
 *
 * Razorpay's snippet is plain HTML + an inline <script>, which cannot be pasted
 * into React/JSX (it breaks the build). This component does the same two things
 * the snippet does, the React way:
 *   1. renders <div class="razorpay-embed-btn" data-...> that the Razorpay bundle turns into the button
 *   2. loads the bundle once (guarded by an id, so no duplicate scripts); if it is
 *      already loaded (e.g. you navigate back to this page) it re-runs its init()
 *      so the new div gets its button.
 */
export const RazorpayEmbedButton: React.FC<RazorpayEmbedButtonProps> = ({
  pageUrl,
  text = 'Guru Dakshinam',
  color = '#C8860A',
  size = 'large',
  className = '',
}) => {
  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.defer = true;
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      document.body.appendChild(script);
    } else {
      const rzp = (window as any)['__rzp__'];
      if (rzp && rzp.init) rzp.init();
    }
  }, []);

  return (
    <div
      className={`razorpay-embed-btn ${className}`.trim()}
      data-url={pageUrl}
      data-text={text}
      data-color={color}
      data-size={size}
    />
  );
};
