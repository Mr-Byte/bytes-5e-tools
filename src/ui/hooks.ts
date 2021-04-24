import { useMemo } from "react";
import { format, localize } from "./localization";

export function useTranslation(key: string, data?: Record<string, unknown>): string | undefined {
    return useMemo(() =>
        data
            ? format(key, data)
            : localize(key),
        [key, data]
    );
}