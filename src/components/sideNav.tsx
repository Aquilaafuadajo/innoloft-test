import {
  InnoAccordionDownLight,
  InnoGroup,
  InnoHome,
  InnoOrganizations,
} from '../assets/icons';

const SideNav: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-[280px] pt-4">
      <div className="flex items-center w-full mb-5">
        <div className="border border-white rounded-full w-16 h-16 overflow-hidden mr-3.5">
          <img
            src="https://img.innoloft.com/users/user_8d48197d.png"
            alt=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Sven Pietsch</p>
          <p className="text-sm">Innoloft GmbH</p>
        </div>
      </div>
      <ul className="w-full">
        <li className="w-full flex items-center mb-5">
          <InnoHome /> <span className="ml-4">Home</span>
          <InnoAccordionDownLight className="ml-auto" />
        </li>
        <li className="w-full flex items-center mb-5">
          <InnoGroup /> <span className="ml-4">Members</span>
        </li>
        <li className="w-full flex items-center mb-5">
          <InnoOrganizations /> <span className="ml-4">Organizations</span>
          <InnoAccordionDownLight className="ml-auto" />
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
