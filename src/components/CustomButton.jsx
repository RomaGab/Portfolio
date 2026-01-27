import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const CustomButton = ({title, to}) => {
    return (
        <Link
            to={to}
            onClick={() => window.scrollTo(0, 0)}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3
                    bg-slate-900 text-white font-semibold rounded-full"
        >
            {title}
            <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform"/>
        </Link>
    );
};

export default CustomButton;