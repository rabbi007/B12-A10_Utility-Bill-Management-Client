import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "Power Outage Updates",
    desc: "Track electricity issues and get notified when service is restored.",
    img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1400&auto=format&fit=crop",
    badge: "Electricity",
    bg: "from-[#e3f2fd] via-white to-[#e8f5e9]",
  },
  {
    id: 2,
    title: "Water Supply Notices",
    desc: "Stay informed about low-pressure schedules and maintenance windows.",
    img: "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?q=80&w=1400&auto=format&fit=crop",
    badge: "Water",
    bg: "from-[#fff3e0] via-white to-[#e3f2fd]",
  },
  {
    id: 3,
    title: "Gas & Internet Alerts",
    desc: "Log issues quickly and monitor resolution progress in real-time.",
    img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1400&auto=format&fit=crop",
    badge: "Gas / Internet",
    bg: "from-[#fce8e6] via-white to-[#f1f8e9]",
  },
];

const Banner = () => {
  return (
    <section className="relative mt-28">

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          spaceBetween={24}
          slidesPerView={1}
          className="rounded-2xl shadow-lg overflow-hidden"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div
                className={`relative bg-gradient-to-br ${s.bg} dark:from-[#0b1220] dark:via-[#0f1526] dark:to-[#0b1220]`}
              >
                {/* Background image */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-[380px] md:h-[460px] object-cover opacity-70"
                />
                {/* Overlay content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 md:px-12 max-w-3xl">
                    <span className="inline-block text-xs md:text-sm font-semibold bg-white/90 text-gray-900 dark:bg-white/20 dark:text-white px-3 py-1 rounded-full shadow">
                      {s.badge}
                    </span>

                    <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]">
                      {s.title}
                    </h2>

                    <p className="mt-3 text-sm md:text-base text-gray-900/90 dark:text-gray-100/90 max-w-2xl">
                      {s.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="/bills"
                        className="btn bg-[#1a73e8] hover:bg-[#185abc] text-white border-none rounded-xl"
                      >
                        Explore Bills
                      </a>
                      <a
                        href="/mybills"
                        className="btn bg-[#34a853] hover:bg-[#2c8e46] text-white border-none rounded-xl"
                      >
                        My Pay Bills
                      </a>
                    </div>
                  </div>
                </div>

                {/* Soft corner blobs */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl bg-[#4285f4]/30" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl bg-[#34a853]/30" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
