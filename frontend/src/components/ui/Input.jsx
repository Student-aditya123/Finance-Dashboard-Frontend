import { forwardRef, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(
    (
        {
            id,
            label,
            value = "",
            onChange,
            type = "text",
            placeholder = "",
            error = "",
            disabled = false,
            iconLeft: IconLeft,
            iconRight: IconRight,
            className = "",
            ...rest
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);

        const isFloating = useMemo(
            () => isFocused || (value !== null && value !== undefined && value.toString().length > 0),
            [isFocused, value]
        );

        const baseStyles =
            "relative w-full rounded-2xl transition-all duration-300 ease-out";

        const inputStyles =
            "peer block w-full border px-4 py-4 text-sm bg-white/80 text-slate-900 backdrop-blur-xl shadow-sm shadow-slate-200/40 focus:outline-none focus:ring-0 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-slate-950/40";

        const borderStyles = error
            ? "border-red-400 focus:border-red-400"
            : "border-transparent focus:border-blue-400 dark:focus:border-cyan-300";

        const disabledStyles =
            "cursor-not-allowed opacity-70 dark:opacity-70";

        return (
            <div className={`${baseStyles} ${className}`}>
                <div
                    className={`relative ${disabled ? "pointer-events-none" : ""}`}
                >
                    {IconLeft && (
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                            <IconLeft size={18} />
                        </div>
                    )}

                    <input
                        id={id}
                        ref={ref}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={isFloating ? placeholder : " "}
                        disabled={disabled}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={`${
                            IconLeft ? "pl-10" : ""
                        } ${IconRight ? "pr-10" : ""} ${inputStyles} ${borderStyles} ${
                            disabled ? disabledStyles : "focus:ring-2 focus:ring-blue-300 dark:focus:ring-cyan-500/30"
                        } rounded-2xl`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...rest}
                    />

                    <label
                        htmlFor={id}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transform text-sm text-slate-500 transition-all duration-300 ease-out ${
                            isFloating
                                ? "-translate-y-9 scale-90 text-blue-600 dark:text-cyan-300"
                                : "text-slate-400 dark:text-slate-400"
                        } pointer-events-none`}
                    >
                        {label}
                    </label>

                    {IconRight && (
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                            <IconRight size={18} />
                        </div>
                    )}

                    <AnimatePresence>
                        {isFocused && !error && (
                            <motion.div
                                layoutId="focus-ring"
                                className="absolute inset-0 rounded-2xl border border-blue-300/50 dark:border-cyan-300/40"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            id={`${id}-error`}
                            className="mt-2 flex items-start gap-1 text-xs text-red-500"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                        >
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;