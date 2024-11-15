import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Docs = () => {
    return (
        <div style={{ padding: '20px' }}>
            <SwaggerUI url="/swagger.json" />
        </div>
    );
};

export default Docs;
