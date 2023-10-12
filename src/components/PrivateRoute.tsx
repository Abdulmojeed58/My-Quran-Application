import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateRoute = ({
  children,
  configuredIp,
  currentIp,
}: {
  children: React.ReactNode;
  configuredIp: { ip: string }[];
  currentIp: string | null;
}) => {
  const router = useRouter();

  const isIpAddress = configuredIp.some((item) => item.ip === currentIp);

  useEffect(() => {
    if (!isIpAddress) {
      // If the user is not authenticated, redirect to the login page
      router.push("/");
    }
  }, [router]);

  // Render the children (the protected content) if authenticated
  return isIpAddress ? children : null;
};

export default PrivateRoute;
