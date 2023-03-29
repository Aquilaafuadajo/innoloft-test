import {
  InnoAccordionDownLight,
  InnoMessenger,
  InnoNotifications,
  InnoSearch,
} from '../assets/icons';
import { InnoLogoWhite } from '../assets/images';

const Header: React.FC<{ color: string }> = ({ color }) => {
  return (
    <nav
      style={{ backgroundColor: color }}
      className="w-full h-14 fixed t-0 flex justify-center z-10"
    >
      <div className="w-full md:w-11/12 flex justify-between items-center mx-20">
        <div className="flex justify-between">
          <InnoLogoWhite className="mr-24" />
          <div className="hidden md:flex items-center bg-white rounded px-3">
            <input
              className="w-[400px] focus:outline-none mr-5"
              type="text"
              placeholder="Enter interests, keyword, company name, etc."
            />
            <InnoSearch />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between w-44">
          <InnoMessenger />
          <p className="text-white">EN</p>
          <InnoAccordionDownLight color="white" />
          <InnoNotifications />
          <div className="border border-white rounded-full w-6 h-6 overflow-hidden">
            <img
              src="https://img.innoloft.com/users/user_8d48197d.png"
              alt=""
              className="w-full"
            />
          </div>
          <InnoAccordionDownLight color="white" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
