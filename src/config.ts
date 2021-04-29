export const MODULE_CONFIG = {
    NAME: "bytes-5e-tools",
    TEMPLATES_ROOT: "modules/bytes-5e-tools/templates",
};

export const modKey = (key: string): string => `${MODULE_CONFIG.NAME}.${key}`;
export const template = (template: string): string => `${MODULE_CONFIG.TEMPLATES_ROOT}/${template}`;
