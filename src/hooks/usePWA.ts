import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('Before install prompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      console.log('PWA install prompt available');
    };

    const handleAppInstalled = () => {
      console.log('App installed event fired');
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log('PWA installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;

    if (isStandalone || isIOSStandalone) {
      setIsInstallable(false);
      console.log('App is already installed');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    console.log('Install PWA function called');

    if (!deferredPrompt) {
      console.log('No deferred prompt available - trying fallback');

      // Fallback for browsers that don't support beforeinstallprompt
      if ('serviceWorker' in navigator && 'caches' in window) {
        console.log('Service worker and caches available - app should be installable');
        alert('Untuk menginstall aplikasi, gunakan menu browser Anda (biasanya titik tiga di kanan atas) dan pilih "Add to Home Screen" atau "Install App"');
      } else {
        alert('Browser Anda tidak mendukung instalasi PWA. Coba gunakan Chrome, Edge, atau Safari terbaru.');
      }
      return;
    }

    try {
      console.log('Prompting user for installation');
      await deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice outcome:', outcome);

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Error installing PWA:', error);
      alert('Terjadi kesalahan saat menginstall aplikasi. Silakan coba lagi.');
    }
  };

  return { isInstallable, installPWA };
};
