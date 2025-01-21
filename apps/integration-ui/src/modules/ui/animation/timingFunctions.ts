import { cubicBezier } from 'framer-motion';

export const easeInExpo = cubicBezier(0.7, 0.0, 0.84, 0.0);
export const easeOutExpo = cubicBezier(0.16, 1, 0.03, 1);
export const easeInOutExpo = cubicBezier(0.87, 0, 0.13, 1);
export const bezierMouse = cubicBezier(0.4, 0.0, 0.2, 1);
export const bezierSkeleton = cubicBezier(0.61, 0, 0.39, 1);
