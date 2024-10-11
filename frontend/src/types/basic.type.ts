export type TNext = {
    next: () => void;
  };
  
  export type TError = {
    message: string;
    messages?: string[];
    status: number;
  };
  
  export type TFail = {
    fail: (error: TError) => void;
  };
  
  export interface ResponseGenerator {
    config?: any;
    data: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
    error?: any;
  }
  
  
  // auth
  export type TSignedOut = {
    signedOut: () => void;
  }
  
