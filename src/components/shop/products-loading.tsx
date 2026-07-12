export default function ProductsLoading() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="animate-pulse">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                            <div className="h-6 bg-zinc-200 rounded w-1/2 mb-6" />
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="w-4 h-4 bg-zinc-200 rounded mr-3" />
                                        <div className="h-4 bg-zinc-200 rounded w-3/4" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                                    <div className="h-52 bg-zinc-200" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-5 bg-zinc-200 rounded w-3/4" />
                                        <div className="h-4 bg-zinc-200 rounded" />
                                        <div className="h-4 bg-zinc-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
