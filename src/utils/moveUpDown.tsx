export const moveItem = (arr: any[], from: number, to: number) => {
    const updated = [...arr];
    const [movedItem] = updated.splice(from, 1);
    updated.splice(to, 0, movedItem);
    return updated;
};
