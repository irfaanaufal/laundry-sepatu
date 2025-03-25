import { ColumnDef } from "@tanstack/react-table";
import { Feature } from "@/types";
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
export const columnFeatures: ColumnDef<Feature>[] = [
    {
        id: 'id',
        header: '#',
        cell: ({ row }) => {
        const feature = row.original;
        return (
            <h3 className="font-bold text-md">#{feature.id}</h3>
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
        accessorKey: 'picture',
        header: `Picture`,
        cell: ({ row }) => {
            const feature = row.original;
            return (
                <>
                    <img src={feature.picture} alt={`Picture of ${feature.name}`} className="h-6rem" />
                </>
            )
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const feature = row.original;
            return (
                <>
                    <h3 className="font-semibold text-md">Rp. {Intl.NumberFormat('id_ID').format(parseInt(feature.price))}</h3>
                </>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const feature = row.original
            return (
              <div className="flex gap-2">
                <Link href={`/feature/edit/${feature.id}`}>
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
                            <DrawerTitle>Feature Detail</DrawerTitle>
                            <DrawerDescription>this is about feature detail.</DrawerDescription>
                            <>
                                <h1 className="font-bold text-md">Name</h1>
                                <Input value={feature.name} readOnly/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Description</h1>
                                <Input value={feature.description} readOnly/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Price</h1>
                                <Input value={feature.price} readOnly/>
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
