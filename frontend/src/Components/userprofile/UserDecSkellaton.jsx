const UserDescSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto mt-8 p-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-pulse">

                {/* Header Section Skeleton */}
                <div className="relative bg-gradient-to-r from-gray-400 to-gray-500 p-8">
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        {/* Avatar Skeleton */}
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-white bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-30">
                                <div className="w-full h-full rounded-full bg-gray-300"></div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                        </div>

                        {/* Text Skeleton */}
                        <div className="flex-1 space-y-3">
                            <div className="h-8 bg-white bg-opacity-30 rounded-lg w-64"></div>
                            <div className="h-6 bg-white bg-opacity-20 rounded-full w-24"></div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white bg-opacity-10 backdrop-blur-sm"></div>
                    <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white bg-opacity-5 backdrop-blur-sm"></div>
                </div>

                {/* Content Section Skeleton */}
                <div className="p-8 space-y-8">

                    {/* Personal Information Section */}
                    <div>
                        {/* Section Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-48"></div>
                        </div>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            <div className="h-5 bg-gray-200 rounded w-32"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wallet Section */}
                    <div>
                        {/* Section Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-40"></div>
                        </div>

                        {/* Wallet Card */}
                        <div className="relative p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200"></div>
                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="space-y-1">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                        {/* Stats Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gray-200 rounded"></div>
                            <div className="h-5 bg-gray-200 rounded w-32"></div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="text-center space-y-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto"></div>
                                    <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Loading Elements */}
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Animation Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-blue-200 rounded-full animate-ping"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-purple-200 rounded-full animate-ping animation-delay-300"></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-indigo-200 rounded-full animate-ping animation-delay-700"></div>
            </div>
        </div>
    );
};

export default UserDescSkeleton;