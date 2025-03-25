import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { ArrowUpDown, Edit2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
export const columnUsers: ColumnDef<User>[] = [
    {
        id: 'id',
        header: '#',
        cell: ({ row }) => {
        const user = row.original;
        return (
            <h3 className="font-bold text-md">#{user.id}</h3>
        )
        }
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: 'roles',
        header: 'Roles',
        cell: ({ row }) => {
            const roles = row.original.roles;
            return (
                <>
                    {roles?.map((role, idx) => {
                        return(
                            <div key={`${role}-${idx}`}>
                                <Badge>{role.name.substring(0,1).toUpperCase() + role.name.substring(1)}</Badge>
                            </div>
                        )
                    })}
                </>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original
            return (
              <div className="flex gap-2">
                <Link href={`/user/edit/${user.id}`}>
                    <Badge className="p-2" role="button">
                        <Edit2 />
                    </Badge>
                </Link>
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <Badge className="p-2" role="button">
                            <Eye />
                        </Badge>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>User Detail</DrawerTitle>
                            <DrawerDescription>this is about user detail.</DrawerDescription>
                            <>
                                <h1 className="font-bold text-md">Name</h1>
                                <Input value={user.name} readOnly/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Phone Number</h1>
                                <Input value={user.phone} readOnly/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Email</h1>
                                <Input value={user.email} readOnly/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Roles</h1>
                                <Input value={user?.roles?.[0].name} readOnly/>
                            </>
                        </DrawerHeader>
                        <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
              </div>
            )
          },
    }
]
