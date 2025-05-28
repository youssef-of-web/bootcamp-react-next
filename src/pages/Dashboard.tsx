import { useAuth } from "../components/AuthContext.tsx";

export default function Dashboard() {
  const { data } = useAuth();
  return <div>{JSON.stringify(data)}</div>;
}
