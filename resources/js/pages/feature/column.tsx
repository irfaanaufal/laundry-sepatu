import { ColumnDef } from "@tanstack/react-table";
import { Feature, Variant } from "@/types";
import { ArrowUpDown, Edit2, Eye, Pencil, Plus } from "lucide-react";
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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { useEffect, useState } from "react";

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
                    <img src={`/storage/${feature.picture}`} alt={`Picture of ${feature.name}`} className="h-[6rem]" />
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
                    <h3 className="font-semibold text-md">Rp. {Intl.NumberFormat('id-ID').format(parseInt(feature.price))}</h3>
                </>
            )
        }
    },
    {
        accessorKey: 'variants',
        header: 'Variants',
        cell: ({ row }) => {
            const feature = row.original;
            return (
                <>
                    {feature.variants.length > 0 ?
                    feature.variants.map((variant, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <Badge variant="outline">{variant.name}</Badge>
                                <Link href={`/feature/${feature.id}/variant/${variant.id}/edit`}>
                                    <Badge variant="outline" className="cursor-default hover:bg-primary hover:text-white"><Pencil/></Badge>
                                </Link>
                            </div>
                            <Link href={`/feature/${feature.id}/variant/create`}>
                                <Badge variant="outline" className="cursor-default hover:bg-primary hover:text-white"><Plus/></Badge>
                            </Link>
                        </div>
                    ))
                    :
                    (
                    <div className="flex flex-col gap-2">
                        <Badge variant="outline">There's No Variants</Badge>
                        <Link href={`/feature/${feature.id}/variant/create`}>
                            <Badge variant="outline" className="cursor-default hover:bg-primary hover:text-white"><Plus/></Badge>
                        </Link>
                    </div>
                    )}
                </>
            );
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
                    <DrawerContent className="overflow-y-scroll overflow-x-hidden">
                        <DrawerHeader>
                            <DrawerTitle>Feature Detail</DrawerTitle>
                            <DrawerDescription>this is about feature detail.</DrawerDescription>
                            <>
                            <img src={`/storage/${feature.picture}`} alt={`Image of ${feature.name}`} className="min-w-full min-h-[6rem]" />
                            </>
                            <>
                                <h1 className="font-bold text-md">Name</h1>
                                <Input value={feature.name} readOnly className="border-none shadow-none font-bold"/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Description</h1>
                                <div className="h-auto">
                                    <ReactQuill theme="bubble" value={feature.description}/>
                                </div>
                            </>
                            <>
                                <h1 className="font-bold text-md">Price</h1>
                                <Input value={`Rp. ${Intl.NumberFormat('id-ID').format(parseInt(feature.price))}`} readOnly className="border-none shadow-none font-bold"/>
                            </>
                            <>
                                <h1 className="font-bold text-md">Variants</h1>
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
