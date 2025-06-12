import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import styles

NProgress.configure({ showSpinner: false }); 

const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); 

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default RouteChangeHandler;
