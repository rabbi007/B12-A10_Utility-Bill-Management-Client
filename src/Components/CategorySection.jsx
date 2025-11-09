import { Link } from "react-router-dom";
import { WiThunderstorm } from "react-icons/wi";   // Electricity
import { GiGasStove } from "react-icons/gi";       // Gas
import { RiWaterFlashFill } from "react-icons/ri"; // Water
import { FiWifi } from "react-icons/fi";           // Internet

const CATEGORIES = [
  {
    name: "Electricity",
    icon: <WiThunderstorm className="text-5xl" />,
    from: "#e3f2fd",
    via: "#ffffff",
    to: "#f1f8e9",
    ring: "#1a73e8",
  },
  {
    name: "Gas",
    icon: <GiGasStove className="text-5xl" />,
    from: "#fff3e0",
    via: "#ffffff",
    to: "#e3f2fd",
    ring: "#fbbc05",
  },
  {
    name: "Water",
    icon: <RiWaterFlashFill className="text-5xl" />,
    from: "#fce8e6",
    via: "#ffffff",
    to: "#e8f5e9",
    ring: "#34a853",
  },
  {
    name: "Internet",
    icon: <FiWifi className="text-5xl" />,
    from: "#ede7f6",
    via: "#ffffff",
    to: "#e3f2fd",
    ring: "#4285f4",
  },
];

const CategoryCard = ({ name, icon, from, via, to, ring }) => (
  <Link
    to={`/bills?category=${encodeURIComponent(name)}`}
    className="
      group relative rounded-2xl p-6 shadow hover:shadow-lg transition
      border border-transparent hover:border-gray-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      flex items-center gap-4
    "
    style={{
      backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
    }}
  >
    {/* Accent ring + icon bubble */}
    <div
      className="grid place-items-center w-16 h-16 rounded-2xl text-white shadow"
      style={{ backgroundColor: ring }}
    >
      {icon}
    </div>

    <div className="flex-1">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm text-gray-700/80">
        View {name.toLowerCase()} related bills and updates
      </p>
    </div>

    <span
      className="absolute right-1 top-1 text-xs font-semibold px-2 py-1 rounded-full"
      style={{ backgroundColor: `${ring}1A`, color: ring }}
    >
      Explore →
    </span>

    {/* Soft blob */}
    <div
      className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-40"
      style={{ backgroundColor: `${ring}` }}
    />
  </Link>
);

const CategorySection = () => {
  return (
    <section className="relative py-10 md:py-14">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2
            className="
              text-2xl md:text-3xl font-extrabold
              bg-clip-text text-transparent
              bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]
            "
          >
            Browse by Category
          </h2>
          <p className="text-gray-700/90 mt-1">
            Quickly filter bills by utility type.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} {...c} />
          ))}
        </div>
      </div>

      {/* Google color underline */}
      <div className="h-1.5 w-full flex mt-8">
        <span className="flex-1 bg-[#4285f4]" />
        <span className="flex-1 bg-[#34a853]" />
        <span className="flex-1 bg-[#fbbc05]" />
        <span className="flex-1 bg-[#ea4335]" />
      </div>
    </section>
  );
};

export default CategorySection;
