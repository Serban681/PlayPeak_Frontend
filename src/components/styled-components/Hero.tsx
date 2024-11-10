export default function Hero() {
    return (
        <div className="flex justify-between flex-col my-8 md:mt-14 xl:mt-24 md:mb-2 xl:mb-32 8 md:flex-row">
            <div className="mb-4 xl:w-[25rem] md:translate-y-full md:mb-auto">
                <h1 className="text-3xl xl:text-4xl sm:text-4xl font-normal">Find Your Perfect Fit</h1>
                <h3 className="text-2xl xl:text-3xl">Gear up for any sport</h3>
            </div>
            <img className="sm:w-1/2 xl:w-1/3 xl:mr-5" src="https://media.istockphoto.com/id/175005911/ro/fotografie/bile-izolate-pe-alb.jpg?s=612x612&w=0&k=20&c=AyvauV1iYsM1lqk-Fas0gFdNd_7y59A0c6SSqYzRi8Q=" />
            {/* <div className="w-full md:w-80 h-80 bg-slate-200" /> */}
            {/* <HeroItems /> */}
            {/* <div></div> */}
        </div>
        
    )
}
