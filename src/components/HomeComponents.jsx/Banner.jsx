import { FaSearch } from 'react-icons/fa';
import bannerBg from '../../assets/bannerBg.jpg'
const Banner = () => {
    return (
        <div
            className={`h-96 md:h-[90vh] md:w-full bg-cover bg-`}
            style={{
                backgroundImage: `url(${bannerBg})`
            }}
        >
            <div className='h-full w-full bg-black bg-opacity-50 flex items-center justify-center'>
                <div>
                    <h1
                        className='text-center font-bold md:font-extrabold text-2xl md:text-3xl lg:text-6xl flex flex-col text-white py-10 '
                    >
                        <span>Delivering Your World,</span>
                        <span>One Parcel at a Time</span></h1>

                    <div className='text-white p-5'>
                        <label className="input input-bordered flex items-center gap-2 bg-transparent backdrop-blur-sm w-4/5 md:w-1/3  mx-auto border-white">
                            <input type="text" className="grow" placeholder="Search" />
                            <FaSearch className='text-white' />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;