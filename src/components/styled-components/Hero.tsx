import HeroItems from "../3D-scene/HeroItems";

export default function Hero() {
    return (
        <div className="flex justify-between flex-col my-8 md:mt-14 md:mb-28 md:flex-row">
            <div className="mb-4 xl:w-[25rem] md:translate-y-full md:mb-auto">
                <h1 className="text-3xl sm:text-4xl font-normal">Find Your Perfect Fit</h1>
                <h3 className="text-2xl">Gear up for any sport</h3>
            </div>
            {/* <div className="w-full md:w-80 h-80 bg-slate-200" /> */}
            <HeroItems />
        </div>
        
    )
}
