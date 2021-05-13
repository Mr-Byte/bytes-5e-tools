import { useMemo } from "react";
import { format, localize } from "common/localization";

export function useTranslation(key: string, data?: Record<string, unknown>): string {
    return useMemo(
        () =>
            data
                ? format(key, data)
                : localize(key),
        [key, data,]
    );
}