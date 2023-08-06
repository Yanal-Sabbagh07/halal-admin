"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const session = useSession();
  const { data } = session;
  const pathName = usePathname();
  const params = useParams();
  const adminRoutes = [
    {
      href: `/mall`,
      label: "Mall",
      active: pathName === `/mall`,
    },
    {
      href: `/store/${params.storeId}`,
      label: "Dashboard",
      active: pathName === `/store/${params.storeId}`,
    },
    {
      href: `/store/${params.storeId}/owner`,
      label: "Owner",
      active: pathName === `/store/${params.storeId}/owner`,
    },
    {
      href: `/store/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/store/${params.storeId}/billboards`,
    },

    {
      href: `/store/${params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/store/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/store/${params.storeId}/sizes`,
    },
    {
      href: `/store/${params.storeId}/colors`,
      label: "Colors",
      active: pathName === `/store/${params.storeId}/colors`,
    },
    {
      href: `/store/${params.storeId}/products`,
      label: "Products",
      active: pathName === `/store/${params.storeId}/products`,
    },
    {
      href: `/store/${params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/store/${params.storeId}/orders`,
    },
    {
      href: `/store/${params.storeId}/settings`,
      label: "settings",
      active: pathName === `/store/${params.storeId}/settings`,
    },
  ];
  const ownerRoutes = [
    {
      href: `/store/${params.storeId}`,
      label: "Dashboard",
      active: pathName === `/store/${params.storeId}`,
    },
    {
      href: `/store/${params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/store/${params.storeId}/orders`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {data?.user.role === "admin"
        ? adminRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))
        : ownerRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
    </nav>
  );
};

export default MainNav;
