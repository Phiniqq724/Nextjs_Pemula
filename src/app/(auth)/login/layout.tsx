export const metadata = {
  title: "Login | Food Ordering System",
  description: "Praktikum SMK Telkom Malang",
};

type PropsLayout = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: PropsLayout) => {
  return <div>{children}</div>;
};

export default LoginLayout;
