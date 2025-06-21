import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from "lucide-react";
import { route } from 'ziggy-js';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}
interface Props {
    product: Product;
}
export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }
    return (
        <AppLayout breadcrumbs={[ { title: 'Edit a product', href: `/products/${product.id}` } ]}>
            <Head title="Update Product" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Display Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="gap-1.5">
                        <Label htmlFor="product_name">Name</Label>
                        <Input placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_price">Price</Label>
                        <Input placeholder="Product Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_description">Description</Label>
                        <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>
                    <Button type="submit" disabled={processing}>Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}