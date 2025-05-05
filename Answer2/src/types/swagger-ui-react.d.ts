declare module 'swagger-ui-react' {
    import * as React from 'react';
  
    interface SwaggerUIProps {
      url: string;
    }
  
    const SwaggerUI: React.FC<SwaggerUIProps>;
    export default SwaggerUI;
  }
  