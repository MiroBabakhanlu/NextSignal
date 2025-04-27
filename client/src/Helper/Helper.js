export const getQuantity = (state, id) => {
    const item = state.selectedItems.find(item => item._id == id)
    if (!item || !item.quantity) {
        return 0;
    }
    return item.quantity;
}