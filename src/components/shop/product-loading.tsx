export default function ProductLoading() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="animate-pulse">
                <div className="h-4 bg-zinc-200 rounded w-1/4 mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-200 rounded-[2rem]" />
                        <div className="flex space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 h-20 bg-zinc-200 rounded-xl" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="h-8 bg-zinc-200 rounded w-3/4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-zinc-200 rounded w-1/3" />
                            <div className="h-4 bg-zinc-200 rounded w-1/4" />
                            <div className="h-4 bg-zinc-200 rounded w-1/2" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-zinc-200 rounded" />
                            <div className="h-4 bg-zinc-200 rounded" />
                            <div className="h-4 bg-zinc-200 rounded w-5/6" />
                        </div>
                        <div className="h-32 bg-zinc-200 rounded-2xl" />
                        <div className="h-40 bg-zinc-200 rounded-2xl" />
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex space-x-8 border-b border-zinc-200">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-10 w-24 bg-zinc-200 rounded-t-lg" />
                        ))}
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="h-4 bg-zinc-200 rounded w-full" />
                        <div className="h-4 bg-zinc-200 rounded w-5/6" />
                        <div className="h-4 bg-zinc-200 rounded w-4/6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
