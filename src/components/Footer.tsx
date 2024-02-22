import { FcCopyright } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="bg-dark text-center fixed-bottom mt-5">
      <span className="text-light fw-bold">
        <FcCopyright size={"20px"} /> Copyright by Srishti Majumder
      </span>
    </div>
  );
};

export default Footer;
