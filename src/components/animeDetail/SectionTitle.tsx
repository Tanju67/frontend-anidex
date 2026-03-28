import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

type SectionTitleProps = {
  children: React.ReactNode;
  link?: string;
  title: string;
  subTitle?: string;
};
function SectionTitle({ children, link, title, subTitle }: SectionTitleProps) {
  return (
    <section className="relative p-4 md:px-10">
      <h2 className="mb-2 text-base capitalize sm:text-lg md:text-xl lg:text-2xl">
        {title}
      </h2>
      {link && (
        <Link
          to={link}
          className="hover:text-main-btn mb-4 flex items-center gap-2 text-xs capitalize transition-colors duration-300 sm:text-sm md:text-base"
        >
          <span>
            <FaEye />
          </span>
          <span>View All {link} &rarr;</span>
        </Link>
      )}
      {subTitle && (
        <p className="mb-2 text-xs sm:text-sm md:text-base">{subTitle}</p>
      )}
      {children}
    </section>
  );
}

export default SectionTitle;
