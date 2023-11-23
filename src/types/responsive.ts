type DeviceType = "mobile" | "tablet" | "desktop";

const deviceType = (width: number): DeviceType => {
    if (width < 768) {
        return "mobile";
    } else if (width < 1024) {
        return "tablet";
    } else {
        return "desktop";
    }
}

export type {
    DeviceType,
};

export {
    deviceType,
}