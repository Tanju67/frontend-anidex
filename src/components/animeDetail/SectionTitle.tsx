import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

type SectionTitleProps = {
  children: React.ReactNode;
  link?: string;
  title: string;
  subTitle?: string;
  skeleton?: boolean;
};
function SectionTitle({
  children,
  link,
  title,
  subTitle,
  skeleton = false,
}: SectionTitleProps) {
  return (
    <section className="section-padding main-text-size relative">
      <h2 className="section-title-size mb-1 font-bold capitalize sm:mb-2">
        {title}
      </h2>
      {link && !skeleton && (
        <Link
          to={link}
          className="hover:text-main-btn section-subtitle-size capitalize transition-colors duration-300"
        >
          <div className="mb-2 flex items-center gap-2 lg:mb-4">
            <span>
              <FaEye />
            </span>
            <span>View All {link} &rarr;</span>
          </div>
        </Link>
      )}
      {subTitle && !skeleton && (
        <p className="section-subtitle-size mb-2">{subTitle}</p>
      )}
      {children}
    </section>
  );
}

export default SectionTitle;
