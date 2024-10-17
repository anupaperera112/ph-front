import React from "react";
import { InventoryProvider } from "../context/InventoryContext";
import { Dashboard, Nav } from "../components/";

const Profile = () => {
  return (
    <div>
      <Nav />
      <InventoryProvider>
        <Dashboard />
      </InventoryProvider>
    </div>
  );
};

export default Profile;
