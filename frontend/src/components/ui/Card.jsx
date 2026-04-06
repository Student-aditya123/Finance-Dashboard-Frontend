import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Card = ({
    title,
    children,
    className = "",
    onClick,
    ...rest
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(15,23,42,0.2)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClick}
            className={`relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg shadow-slate-900/20
                p-4 md:p-6 ${className}`}
            {...rest}
        >
            {title && (
                <div className="mb-3 text-slate-100">
                    <h3 className="text-base font-semibold md:text-lg">{title}</h3>
                </div>
            )}

            <div className="text-slate-100">{children}</div>
        </motion.div>
    );
};

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Card.defaultProps = {
    title: undefined,
    className: "",
    onClick: undefined,
};

export default Card;