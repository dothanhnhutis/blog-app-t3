import AdminLayout from "@/app/_components/Layouts/AdminLayout";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const ManagerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }
  return <AdminLayout session={session}>{children}</AdminLayout>;
};

export default ManagerLayout;
