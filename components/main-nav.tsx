"use client";

// import { cn } from "@/lib/utils";
// import { Menu, MenuSquare, XSquare } from "lucide-react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";

// export function MainNav({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLElement>) {
//   const pathname = usePathname();
//   const params = useParams();

//   const routes = [
//     {
//       href: `/${params.storeId}`,
//       label: "Overview",
//       active: pathname === `/${params.storeId}`,
//     },
//     {
//       href: `/${params.storeId}/billboards`,
//       label: "Billboards",
//       active: pathname === `/${params.storeId}/billboards`,
//     },
//     {
//       href: `/${params.storeId}/categories`,
//       label: "Categories",
//       active: pathname === `/${params.storeId}/categories`,
//     },
//     {
//       href: `/${params.storeId}/pots`,
//       label: "Materials",
//       active: pathname === `/${params.storeId}/pots`,
//     },
//     {
//       href: `/${params.storeId}/sizes`,
//       label: "Sizes",
//       active: pathname === `/${params.storeId}/sizes`,
//     },
//     {
//       href: `/${params.storeId}/colors`,
//       label: "Colors",
//       active: pathname === `/${params.storeId}/colors`,
//     },
//     {
//       href: `/${params.storeId}/products`,
//       label: "Products",
//       active: pathname === `/${params.storeId}/products`,
//     },
//     {
//       href: `/${params.storeId}/orders`,
//       label: "Orders",
//       active: pathname === `/${params.storeId}/orders`,
//     },
//     {
//       href: `/${params.storeId}/reviews`,
//       label: "Reviews",
//       active: pathname === `/${params.storeId}/reviews`,
//     },
//     {
//       href: `/${params.storeId}/settings`,
//       label: "Settings",
//       active: pathname === `/${params.storeId}/settings`,
//     },
//   ];
//   return (
//     <>
//       <nav
//         className={cn(
//           "lg:flex md:flex items-center space-x-4 lg:space-x-6 hidden",
//           className
//         )}
//       >
//         {routes.map((route) => (
//           <Link
//             key={route.href}
//             href={route.href}
//             className={cn(
//               "text-sm font-medium transition-colors hover:text-primary",
//               route.active
//                 ? "text-black dark:text-white"
//                 : "text-muted-foreground"
//             )}
//           >
//             {route.label}
//           </Link>
//         ))}
//       </nav>
//       <MenuSquare className="text-4xl text-black block"/>
//       <XSquare className="text-4xl text-black block" />
//     </>
//   );
// }

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, XSquare } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/pots`,
      label: "Materials",
      active: pathname === `/${params.storeId}/pots`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/reviews`,
      label: "Reviews",
      active: pathname === `/${params.storeId}/reviews`,
    },
    {
      href: `/${params.storeId}/subscribers`,
      label: "Subscribers",
      active: pathname === `/${params.storeId}/subscribers`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <>
        <Menu
          className="lg:hidden text-black block cursor-pointer ml-auto mr-2"
          onClick={() => setIsOpen(!isOpen)}
          size={28}
        />
      <div
        className={`lg:flex items-center space-x-4 lg:space-x-6 ml-2 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm lg:text-md font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="absolute inset-x-0 top-0 bg-white">
            <div className="flex justify-end p-4">
              <XSquare
                className="text-black block cursor-pointer"
                onClick={() => setIsOpen(false)}
                size={40}
              />
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-lg font-semibold py-2 px-4 rounded-md transition-colors hover:text-primary text-center",
                    route.active
                      ? "text-white bg-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )} 
                  onClick={() => setIsOpen(false)}
                > 
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
