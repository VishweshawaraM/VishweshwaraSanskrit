import React, { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
  /**
   * The payment_button_id from your Razorpay Dashboard:
   * Payments → Payment Buttons → (your button) → Share → copy the
   * data-payment_button_id value out of the embed snippet.
   * It looks like: pl_XXXXXXXXXXXXXX
   */
  paymentButtonId: string;
  className?: string;
}

/**
 * Mounts a Razorpay Payment Button inside a <form>, the way Razorpay's
 * own embed snippet expects:
 *
 *   <form>
 *     <script src="https://checkout.razorpay.com/v1/payment-button.js"
 *             data-payment_button_id="pl_XXXX" async></script>
 *   </form>
 *
 * Browsers do not execute <script> tags injected via innerHTML or
 * dangerouslySetInnerHTML, so the script element is created imperatively
 * with document.createElement and appended to a ref'd form — the
 * reliable way to mount a third-party script widget inside React.
 *
 * Two guards included:
 *  1. Skips re-injection if a script is already mounted in this form
 *     (React 18 StrictMode runs effects twice in dev, which would
 *     otherwise render two buttons).
 *  2. Cleans up on unmount so navigating away and back doesn't stack
 *     buttons on remount.
 *
 * This is independent of the Razorpay Checkout.js SDK already loaded
 * in index.html (used for a different, order-based flow) — no conflict,
 * nothing to change there.
 */
export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  paymentButtonId,
  className = '',
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    if (form.querySelector('script[data-payment_button_id]')) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', paymentButtonId);
    script.async = true;
    form.appendChild(script);

    return () => {
      form.innerHTML = '';
    };
  }, [paymentButtonId]);

  // The form itself carries layout classes from the design system;
  // Razorpay renders its button inside it once the script loads.
  // For it to fill this width, enable "Full Width" for the button
  // in the Razorpay Dashboard (Payment Button → Customize → Width).
  return <form ref={formRef} className={className} />;
};
