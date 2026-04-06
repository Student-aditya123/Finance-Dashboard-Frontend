import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variantClasses = {
    primary:
        "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white border-transparent",
    secondary:
        "bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white border-transparent",
    outline:
        "bg-white/10 text-white border border-white/30 hover:bg-white/20",
};

const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

const sharedClasses =
    "relative inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-95";

const glowClasses =
    "shadow-[0_12px_30px_-14px_rgba(99,102,241,0.75)] hover:shadow-[0_0_26px_-4px_rgba(99,102,241,0.8)]";

const disabledClasses =
    "cursor-not-allowed opacity-50 shadow-none hover:shadow-none hover:-translate-y-0";

const Button = forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const isInactive = disabled || loading;
        const variantClass = variantClasses[variant] ?? variantClasses.primary;
        const sizeClass = sizeClasses[size] ?? sizeClasses.md;

        return (
            <motion.button
                ref={ref}
                type="button"
                disabled={isInactive}
                whileTap={!isInactive ? { scale: 0.95 } : {}}
                whileHover={!isInactive ? { y: -1 } : {}}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className={`${sharedClasses} ${variantClass} ${sizeClass} ${
                    variant !== "outline" ? glowClasses : ""
                } ${isInactive ? disabledClasses : ""} ${className}`}
                {...props}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                    </span>
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export default Button;