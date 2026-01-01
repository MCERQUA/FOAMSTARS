// Global type declarations for external libraries

// Swiper CSS modules
declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    google: GoogleAPI;
    FB: FacebookAPI;
    bootstrap: BootstrapAPI;
  }
}

// Bootstrap types
interface BootstrapAPI {
  Tooltip: {
    getOrCreateInstance: (element: Element) => void;
  };
}

// Google API types
interface GoogleAPI {
  accounts: {
    id: {
      initialize: (config: GoogleInitConfig) => void;
      renderButton: (element: Element, config: GoogleButtonConfig) => void;
      prompt: () => void;
    };
    oauth2: {
      initTokenClient: (config: GoogleOAuth2Config) => GoogleTokenClient;
    };
  };
}

interface GoogleInitConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
}

interface GoogleButtonConfig {
  theme: string;
  size: string;
}

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleOAuth2Config {
  client_id: string;
  scope: string;
  callback: (response: GoogleTokenResponse) => void;
}

interface GoogleTokenResponse {
  access_token: string;
}

interface GoogleTokenClient {
  requestAccessToken: () => void;
}

// Facebook API types
interface FacebookAPI {
  init: (config: FacebookInitConfig) => void;
  login: (callback: (response: FacebookLoginResponse) => void, options?: FacebookLoginOptions) => void;
  getLoginStatus: (callback: (response: FacebookLoginResponse) => void) => void;
  api: (path: string, fields: { fields: string }, callback: (response: FacebookUserResponse) => void) => void;
  logout: () => void;
}

interface FacebookInitConfig {
  appId: string;
  cookie: boolean;
  xfbml: boolean;
  version: string;
}

interface FacebookLoginOptions {
  scope: string;
}

interface FacebookAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  graphDomain: string;
  signedRequest: string;
  userID: string;
}

interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse | null;
  status: 'connected' | 'not_authorized' | 'unknown';
}

interface FacebookUserResponse {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export {};
