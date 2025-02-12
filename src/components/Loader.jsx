import React from 'react';

//loader para inicio de sesión
const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
        </div>
    );
};

export default Loader;
