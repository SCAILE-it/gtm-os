"use client";

interface SourceLogoProps {
  source: string;
  className?: string;
}

export function SourceLogo({ source, className = "w-4 h-4" }: SourceLogoProps) {
  const getLogoComponent = (sourceName: string) => {
    switch (sourceName.toLowerCase()) {
      case "google analytics":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="#6b7280" strokeWidth="2"/>
            <path fill="#6b7280" d="M8 16h8l-4-8-4 8z"/>
            <circle cx="12" cy="8" r="1" fill="#6b7280"/>
          </svg>
        );
      
      case "hubspot":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="#6b7280" strokeWidth="2"/>
            <path fill="#6b7280" d="M12 6h4v4h-4z"/>
            <path fill="#6b7280" d="M8 10h4v4H8z"/>
            <path fill="#6b7280" d="M12 14h4v4h-4z"/>
          </svg>
        );
      
      case "mixpanel":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72807856FF" d="M21.769 12.453c-.901 5.25-5.725 9.058-11.269 8.403-3.678-.434-6.915-2.941-8.403-6.511l8.403-8.403c3.57 1.488 6.077 4.725 6.511 8.403l4.758.108z"/>
            <path fill="#6b7280FF856B" d="M12.453 2.231c5.25.901 9.058 5.725 8.403 11.269-.434 3.678-2.941 6.915-6.511 8.403l-8.403-8.403c1.488-3.57 4.725-6.077 8.403-6.511l.108-4.758z"/>
            <path fill="#6b728087D96C" d="M2.231 11.547c-.901-5.25 3.153-10.074 8.403-10.975 3.678-.634 7.415 1.373 9.403 4.943l-8.403 8.403c-3.57-1.488-6.577-5.225-6.011-8.903l-3.392.532z"/>
          </svg>
        );
      
      case "stripe":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280" d="M2 12h20M6 8h12M8 16h8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );

      case "mailchimp":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280FFE01B" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fill="#6b7280000" d="M15.5 9.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-7 0C7.672 9.5 7 10.172 7 11s.672 1.5 1.5 1.5S10 11.828 10 11s-.672-1.5-1.5-1.5z"/>
          </svg>
        );

      case "salesforce":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b728000A1E0" d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm6.5 8.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z"/>
          </svg>
        );

      case "facebook":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72801877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );

      case "google ads":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72804285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path fill="#6b7280FFF" d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/>
          </svg>
        );

      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72800A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );

      case "klaviyo":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280FF6900" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 18h-3l-3-6 3-6h3l-3 6 3 6z"/>
          </svg>
        );

      case "intercom":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72801F8DED" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        );

      case "amplitude":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72801F77B4" d="M12 0L0 24h6l6-12 6 12h6L12 0z"/>
          </svg>
        );

      case "pipedrive":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280FF6900" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fill="#6b7280FFF" d="M8 8h8v8H8z"/>
          </svg>
        );

      case "zendesk":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b728003363D" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "shopify":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b72807AB55C" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "segment":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b728052BD95" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "typeform":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280262627" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "airtable":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280FCB400" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "notion":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280000" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "gmail":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="#6b7280" strokeWidth="2"/>
            <path fill="#6b7280" d="M2 8l10 6 10-6"/>
          </svg>
        );

      case "slack":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280" d="M6 2h4v4H6zM14 2h4v4h-4zM6 10h4v4H6zM14 10h4v4h-4zM6 18h4v4H6zM14 18h4v4h-4z"/>
          </svg>
        );

      case "outlook":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <circle cx="12" cy="12" r="8" fill="none" stroke="#6b7280" strokeWidth="2"/>
            <path fill="#6b7280" d="M8 12c0-2 1-3 4-3s4 1 4 3-1 3-4 3-4-1-4-3z"/>
          </svg>
        );

      case "adobe analytics":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b7280FF0000" d="M12 0L0 24h6l2-4h8l2 4h6L12 0zm0 8l2 8H10l2-8z"/>
          </svg>
        );

      case "woocommerce":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#6b728096588A" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fill="#6b7280FFF" d="M8 8h8v8H8z"/>
          </svg>
        );
      
      default:
        return (
          <div className={`${className} bg-muted-foreground/20 rounded flex items-center justify-center`}>
            <span className="text-xs font-bold">{source.charAt(0).toUpperCase()}</span>
          </div>
        );
    }
  };

  return getLogoComponent(source);
}
