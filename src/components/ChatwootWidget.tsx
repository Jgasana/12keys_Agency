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
    console.log('Chatwoot Widget: Initializing with token:', websiteToken);
    console.log('Chatwoot Widget: Base URL:', baseUrl);

    window.chatwootSettings = {
      hideMessageBubble: false,
      position: position,
      locale: locale,
      type: 'expanded_bubble',
    };

    const existingScript = document.querySelector(`script[src="${baseUrl}/packs/js/sdk.js"]`);
    if (existingScript) {
      console.log('Chatwoot Widget: Script already exists');
      return;
    }

    console.log('Chatwoot Widget: Creating script element');
    const script = document.createElement('script');
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.async = true;

    script.onload = () => {
      console.log('Chatwoot Widget: Script loaded successfully');
      if (window.chatwootSDK) {
        console.log('Chatwoot Widget: Running SDK');
        window.chatwootSDK.run({
          websiteToken: websiteToken,
          baseUrl: baseUrl,
        });
      } else {
        console.error('Chatwoot Widget: SDK not found on window');
      }
    };

    script.onerror = (error) => {
      console.error('Chatwoot Widget: Failed to load script', error);
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.body.appendChild(script);
    }
    console.log('Chatwoot Widget: Script element added to DOM');

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
