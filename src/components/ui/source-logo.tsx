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
            <path fill="#F9AB00" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      
      case "hubspot":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#FF7A59" d="M18.164 7.931V5.61a1.611 1.611 0 1 0-3.223 0v2.321a5.612 5.612 0 0 0-3.302 1.471l-3.222-3.222a1.611 1.611 0 1 0-2.278 2.278l3.222 3.222a5.612 5.612 0 0 0 1.471 3.302H8.511a1.611 1.611 0 1 0 0 3.223h2.321a5.612 5.612 0 0 0 10.055-3.222 5.612 5.612 0 0 0-2.723-4.832z"/>
          </svg>
        );
      
      case "mixpanel":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#7856FF" d="M21.769 12.453c-.901 5.25-5.725 9.058-11.269 8.403-3.678-.434-6.915-2.941-8.403-6.511l8.403-8.403c3.57 1.488 6.077 4.725 6.511 8.403l4.758.108z"/>
            <path fill="#FF856B" d="M12.453 2.231c5.25.901 9.058 5.725 8.403 11.269-.434 3.678-2.941 6.915-6.511 8.403l-8.403-8.403c1.488-3.57 4.725-6.077 8.403-6.511l.108-4.758z"/>
            <path fill="#87D96C" d="M2.231 11.547c-.901-5.25 3.153-10.074 8.403-10.975 3.678-.634 7.415 1.373 9.403 4.943l-8.403 8.403c-3.57-1.488-6.577-5.225-6.011-8.903l-3.392.532z"/>
          </svg>
        );
      
      case "stripe":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#635BFF" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.274 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
          </svg>
        );

      case "mailchimp":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#FFE01B" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fill="#000" d="M15.5 9.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-7 0C7.672 9.5 7 10.172 7 11s.672 1.5 1.5 1.5S10 11.828 10 11s-.672-1.5-1.5-1.5z"/>
          </svg>
        );

      case "salesforce":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#00A1E0" d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm6.5 8.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z"/>
          </svg>
        );

      case "facebook":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );

      case "google ads":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path fill="#FFF" d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/>
          </svg>
        );

      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );

      case "klaviyo":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#FF6900" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 18h-3l-3-6 3-6h3l-3 6 3 6z"/>
          </svg>
        );

      case "intercom":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#1F8DED" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        );

      case "amplitude":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#1F77B4" d="M12 0L0 24h6l6-12 6 12h6L12 0z"/>
          </svg>
        );

      case "pipedrive":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#FF6900" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            <path fill="#FFF" d="M8 8h8v8H8z"/>
          </svg>
        );

      case "zendesk":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#03363D" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "shopify":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#7AB55C" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "segment":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#52BD95" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "typeform":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#262627" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "airtable":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#FCB400" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        );

      case "notion":
        return (
          <svg viewBox="0 0 24 24" className={className}>
            <path fill="#000" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
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
