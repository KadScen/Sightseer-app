const imageInfos = (state = '' , action) => {
    switch (action.type) {
        case 'IMAGEINFOS':
            return state = action.payload;
        default:
            return state;
    }
}

export default imageInfos;