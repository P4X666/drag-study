export const getItemWithWidth = (hoverClientX: number, itemWidth: number, length: number = 0): number => {
    if (length === 0) {
        return 0;
    }
    if (hoverClientX > itemWidth * length) {
        return length;
    }
    return getItemWithWidth(hoverClientX, itemWidth, length - 1);
};
