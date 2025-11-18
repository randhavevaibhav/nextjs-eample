import { LogoutButton } from "./features/home/components/logout-button";
import { Test } from "./features/home/components/test";

export default async function Home() {
  return (
    <div>
      <h2 className="text-2xl"> Home Page</h2>
      <Test />
      <LogoutButton/>
    </div>
  );
}
