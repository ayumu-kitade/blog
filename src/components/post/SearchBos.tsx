'use client'
import { Input } from "@/components/ui/input";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500)
        return () => clearTimeout(timer)
    }, [search]
    );

    useEffect(() => {
        if (debouncedSearch) {
            router.push(`/?search=${debouncedSearch.trim()}`);
        } else {
            router.push('/');
        }
    }, [debouncedSearch, router]);

    return (
        <>
            <Input
                type="text"
                placeholder="Search..."
                className="md:w-64 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    )
}
