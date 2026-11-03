import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareProps {
  className?: string;
  url?: string;
  title?: string;
}

export const Share: React.FC<ShareProps> = ({ className = '', url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing', err);
        }
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`relative inline-flex items-center justify-center p-2 rounded-full hover:bg-surface-2 transition-colors group ${className}`}
      aria-label="Share this page"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-4 h-4 text-text-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Share2 className="w-4 h-4 text-inherit transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-2 border border-gold-dim text-text-primary text-[10px] font-mono rounded shadow-lg whitespace-nowrap"
          >
            Link Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
