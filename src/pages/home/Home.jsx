import banner from "../../assets/images/banner.jpeg";
import bannerSm from "../../assets/images/banner-sm.jpeg";

const Home = () => {
  window.scrollTo(0, 0);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative flex flex-col items-center w-full">
        <img
          src={bannerSm}
          className="w-screen object-cover rounded-lg md:hidden h-screen"
          alt="banner image"
        />
        <img
          src={banner}
          className="w-screen object-cover rounded-lg hidden md:block h-[90vh] "
          alt="banner image"
        />
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <p
            data-aos="flip-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="text-2xl lg:text-4xl font-semibold text-gray-100 uppercase mb-4 text-center"
          >
            Welcome to
          </p>
          <p
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="title text-3xl lg:text-5xl font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent uppercase"
          >
            ATN Medical Transportation (LLC)
          </p>
          <p className="text-gray-100 text-base lg:text-xl mt-4 px-10 text-center lg:max-w-[70%]">
            Our banquet roster system simplifies the organization process,
            ensuring every detail is seamlessly coordinated for your special
            occasions. Let us help you create memorable moments that will be
            cherished.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
