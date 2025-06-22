import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Link ,usePage} from '@inertiajs/react';
import { HomeIcon, Users,ChevronDown } from "lucide-react"
import AppLogo from './app-logo';
import useHasAnyPermission from '@/utils/permission';

export function AppSidebar() {
    const [open, setOpen] = React.useState(true);
    const canViewRoles = useHasAnyPermission(['roles index']);
    const canViewPermissions = useHasAnyPermission(['permissions index']);
    const canViewUsers = useHasAnyPermission(['users index']);
    const { url } = usePage();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarGroupContent>
        <SidebarMenu>
             <SidebarMenuItem className={isActiveMenu("/dashboard", url) ? 'active' : ''} >
            <SidebarMenuButton icon={HomeIcon} asChild>
              <Link href="/dashboard">Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Example: Users with nested submenu */}
        {(canViewRoles || canViewPermissions || canViewUsers) && (
            <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton icon={Users}>
                    Role & Permission
                    <ChevronDown
                      className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
                      size={18}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {canViewRoles && (
                      <SidebarMenuSubItem className={isActiveMenu("/dashboard/roles", url) ? 'active' : ''}>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/roles">Role</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                    {canViewPermissions && (
                      <SidebarMenuSubItem className={isActiveMenu("/dashboard/permissions", url) ? 'active' : ''}>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/permissions">Permission</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                    {canViewUsers && (
                      <SidebarMenuSubItem className={isActiveMenu("/dashboard/users", url) ? 'active' : ''}>
                        <SidebarMenuSubButton asChild>
                          <Link href="/dashboard/users">User</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )}

          {/* Example: Other menu items */}
         
         
        </SidebarMenu>
      </SidebarGroupContent>
    </Sidebar>
  );
}

function isActiveMenu(href, url) {
  // match exact
  if (href === url) return true;
  
//   if (url.startsWith(href) && href !== "/") return true;
  return false;
}
