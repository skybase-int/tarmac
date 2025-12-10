interface Window {
  cookie3?: {
    setTrackingConsentGiven: () => void;
    forgetTrackingConsentGiven: () => void;
    isTrackingConsentGiven?: () => boolean;
  };
}
