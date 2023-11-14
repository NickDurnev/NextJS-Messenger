const ConversetionSkeleton = () => {
    return (
        <div className="w-full relative flex items-center p-3 space-x-3 bg-skin-base rounded-lg">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-skin-additional h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-2">
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-20">
                            <div className="h-2 bg-skin-additional rounded col-span-2"></div>
                            <div className="h-2 bg-skin-additional rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-skin-additional rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversetionSkeleton;
