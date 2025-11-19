import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSettings?: {
      hideMessageBubble?: boolean;
      position?: 'left' | 'right';
      locale?: string;
      type?: string;
    };
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: {
      toggle: (state?: 'open' | 'close') => void;
      setUser?: (userId: string, user: { email?: string; name?: string; avatar_url?: string }) => void;
      reset?: () => void;
    };
  }
}

interface ChatwootWidgetProps {
  websiteToken: string;
  baseUrl?: string;
  locale?: string;
  position?: 'left' | 'right';
}

export function ChatwootWidget({
  websiteToken,
  baseUrl = 'https://app.chatwoot.com',
  locale = 'en',
  position = 'right',
}: ChatwootWidgetProps) {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: position,
      locale: locale,
      type: 'expanded_bubble',
    };

    const existingScript = document.querySelector(`script[src="${baseUrl}/packs/js/sdk.js"]`);
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.async = true;

    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: websiteToken,
          baseUrl: baseUrl,
        });
      }
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.querySelector(`script[src="${baseUrl}/packs/js/sdk.js"]`);
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }

      if (window.$chatwoot) {
        delete window.$chatwoot;
      }
      if (window.chatwootSettings) {
        delete window.chatwootSettings;
      }
    };
  }, [websiteToken, baseUrl, locale, position]);

  return null;
}
