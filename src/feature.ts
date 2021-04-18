export interface Feature {
    init(): void;
}

export interface FeatureStatic {
    new(): Feature;
}
