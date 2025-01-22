import { Button } from "../ui/button";

const ErrorPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <p className="text-gray-500 mt-2">It might have been moved or deleted.</p>
        <Button
          variant="default" 
          className="mt-6"
          onClick={() => window.location.href = '/'}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;