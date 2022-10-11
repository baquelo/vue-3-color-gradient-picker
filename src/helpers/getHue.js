import { useHsvToRgb } from '@/composables/useHsvToRgb';

export default function getHue(offsetX, width, saturation, value) {
    let hue = ((360 * offsetX) / width) | 0;

    hue = hue < 0 ? 0 : hue > 360 ? 360 : hue;

    return {
        ...useHsvToRgb(hue, saturation, value),
        hue,
    };
}
