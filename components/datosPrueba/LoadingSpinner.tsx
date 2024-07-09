// LoadingSpinner.js
export default function LoadingSpinner() {
    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="loader"></div>
        <p className="text-white text-xl">Verificando datos...</p>
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #fff; /* White */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  