import React, { createContext, useReducer } from 'react';


const initialState = {
    nav: {
        bg: '#FFFFFF',
        logoContainer: '#FFFFFF',
        h1: '#4A4A4A',
        hamburger: '#E5E5E5',
        hamDiv: '#B3B3B3',
        links: '#4A4A4A',
        linksPhone: '#707070',
        linkLi: '#E8E8E8',
        linkA: '#4A4A4A',
        iconContainer: '#FFFFFF',
        iconA: '#707070',
        profile: '#B3B3B3',
        pulse: '#FF6F61',
        cart: '#FF6F61',
    },
    landing: {
        bg: '#FFFFFF',
        left: '#FF6F61',
        textLeft: '#4A4A4A',
        textLeftSpan: '#FFA726',
        center: '#FFFFFF',
        shopLink: '#FF6F61',
        centerButtons: '#FF6F61',
        centerButtonsLink: '#FFFFFF',
        centerButton2: '#FFA726',
        centerButton2Link: '#FFFFFF',
        storeButton: '#FFA726',
        aboutButton: '#FF6F61',
        right: '#F7F7F7',
        textRight: '#4A4A4A',
        textRightSpan: '#9E9E9E',
    },
    offeringSchema: {
        bg: '#FFFFFF',
        bgHover: '#F7F7F7',
        icon: '#FFA726',
        iconHover: '#FF6F61',
        title: '#4A4A4A',
        description: '#707070',
        styledLink: '#FFA726',
        styledLinkHover: '#FF6F61',
    },
    offering: {
        bg: '#FFFFFF',
        introduction: '#F7F7F7',
        introH1: '#4A4A4A',
        introH2: '#FF6F61',
        introP: '#707070',
        offers: '#FFFFFF',
    },
    contact: {
        bg: '#FFFFFF',
        title: '#4A4A4A',
        description: '#707070',
        socialLinks: '#FF6F61',
        socialLink: '#FFA726',
    },
    clientCounter: {
        bg: '#FFFFFF',
        countWrapper: '#F7F7F7',
        number: '#FF6F61',
        counter: '#FFA726',
    },
    about: {
        bg: '#FFFFFF',
        aboutSection: '#F7F7F7',
        aboutSectionH1: '#4A4A4A',
        aboutSectionH2: '#FF6F61',
        aboutSectionP: '#707070',
        faq: '#FF6F61',
        dropdown: '#FFA726',
        dropdownH1: '#4A4A4A',
        answer: '#FFFFFF',
        answerP: '#707070',
    },
    footer: {
        bg: '#F7F7F7',
        footWrapper: '#FFFFFF',
        section: '#4A4A4A',
        companyTitile: '#FF6F61',
        companyDescription: '#707070',
        sectionTitile: '#4A4A4A',
        styledLink: '#FF6F61',
        finalSection: '#FFFFFF',
        finalText: '#4A4A4A',
        finalLink: '#FF6F61',
    },
    register: {
        bg: '#FFFFFF',
        left: '#F7F7F7',
        bigCircleGradient: '#FF6F61',
        bigCircleGradient2: '#FFA726',
        c1: '#FFC107',
        c2: '#FF6F61',
        c3: '#F7F7F7',
        c4: '#E0E0E0',
        welcome: '#4A4A4A',
        description: '#707070',
        linktext: '#FF6F61',
        styledLink: '#FFA726',
        right: '#F7F7F7',
        container: '#FFFFFF',
        heading: '#4A4A4A',
        input: '#F7F7F7',
        inputBorder: '#FF6F61',
        inputTextColor: '#4A4A4A',
        inputShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        inputBorderHover: '#FFA726',
        inputHover: '#FFFFFF',
        inputShadowHover: '0 4px 6px rgba(0, 0, 0, 0.1)',
        inputFocus: '#FF6F61',
        registerBtn: '#FFA726',
        registerBtnHover: '#FF6F61',
        registerBtnShadow: '#FFA726',
        registerBtnShadowHover: '#FF6F61',
        responseMsg: '#4CAF50',
    },
    login: {
        bg: '#FFFFFF',
        left: '#F7F7F7',
        bigCircleGradient: '#FF6F61',
        bigCircleGradient2: '#FFA726',
        c1: '#FFC107',
        c2: '#FF6F61',
        c3: '#F7F7F7',
        c4: '#E0E0E0',
        welcome: '#4A4A4A',
        description: '#707070',
        linktext: '#FF6F61',
        styledLink: '#FFA726',
        right: '#F7F7F7',
        container: '#FFFFFF',
        heading: '#4A4A4A',
        input: '#F7F7F7',
        inputBorder: '#FF6F61',
        inputTextColor: '#4A4A4A',
        inputShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        inputBorderHover: '#FFA726',
        inputHover: '#FFFFFF',
        inputShadowHover: '0 4px 6px rgba(0, 0, 0, 0.1)',
        inputFocus: '#FF6F61',
        registerBtn: '#FFA726',
        registerBtnHover: '#FF6F61',
        registerBtnShadow: '#FFA726',
        registerBtnShadowHover: '#FF6F61',
        responseMsg: '#4CAF50',
    },
    customerDash: {
        h3: '#4A4A4A',
        bg: '#FFFFFF',
        sidebar: '#F7F7F7',
        ul: '#707070',
        li: '#E8E8E8',
        a: '#4A4A4A',
        svg: '#FFA726',
        span: '#FF6F61',
        contentArea: '#F7F7F7',
        CurrentSection: '#FF6F61',
        CurrentSectionH1: '#4A4A4A',
        CurrentSectionP: '#707070',
        boxContainer: '#FFFFFF',
        profileSection: '#FFFFFF',
        userInfo: '#4A4A4A',
        userInfoP: '#707070',
        form: '#F7F7F7',
        InputGroup: '#FFFFFF',
        label: '#4A4A4A',
        input: '#F7F7F7',
        inputBorder: '#FF6F61',
        btn: '#FFA726',
        btnHover: '#FF6F61',
    },
    store: {
        bg: '#FFFFFF',
        error: '#FF6F61',
        productBox: '#F7F7F7',
        productBoxBorder: '#E8E8E8',
        productName: '#4A4A4A',
        stockPriceWrapper: '#E0E0E0',
        capsuleWrapper: '#F7F7F7',
        stock: '#FF6F61',
        capsule: '#333',
        ProductDescription: '#707070',
        quantityWrapper: '#E8E8E8',
        quantityWrapperSpan: '#4A4A4A',
        action: '#FF6F61',
        actionButtonGradient1: '#FFA726',
        actionButtonGradient2: '#FF6F61',
        actionButtonGradient1Hover: '#FFA726',
        actionButtonGradient2Hover: '#FF6F61',
        svg: '#4A4A4A',
    },
    cart: {
        bg: '#FFFFFF',
        title: '#4A4A4A', // Title color
        subtitle: '#707070', // Subtitle color
        TotalPriceContainer: '#F7F7F7', // Container for total price
        TotalPrice: '#4A4A4A', // Total price text color
        ProceedButton: '#FF6F61', // Proceed button color
        EmptyCartContainer: '#F7F7F7', // Empty cart container background
        EmptyCartImage: '#D1D1D1', // Placeholder image color for empty cart
        EmptyCartMessage: '#707070', // Empty cart message text
        SuggestionMessage: '#FFA726', // Suggestion message text color
        BrowseButton: '#FFA726', // Browse button color
        ProductBox: '#F7F7F7', // Product box color
        DetailsGroup: '#E8E8E8', // Details group background color
        ProductName: '#4A4A4A', // Product name text color
        ProductDescription: '#707070', // Product description color
        QuantityGroup: '#E8E8E8', // Quantity group background color
        actionButtonGradient1: '#FFA726', // Action button gradient color 1
        actionButtonGradient2: '#FF6F61', // Action button gradient color 2
        actionButtonGradient1Hover: '#FF6F61', // Hover effect for action button 1
        actionButtonGradient2Hover: '#FFA726', // Hover effect for action button 2
        CurrentQuantity: '#4A4A4A', // Current quantity text color
        PriceStockGroup: '#E8E8E8', // Price and stock group background color
        ProductPrice: '#FF6F61', // Product price text color
        ProductPriceSpan: '#4A4A4A', // Product price span text color
        Stock: '#FF6F61', // Stock status text color
        Error: '#FF6F61', // Error message text color
    },
    overview: {
        OverviewContainer: '#FFFFFF', // Overview container background
        OverviewTitle: '#4A4A4A', // Title color
        InfoBoxesContainer: '#F7F7F7', // Background for info boxes container
        InfoBoxContainer: '#F7F7F7', // Info box container background
        InfoBoxContainerSvg: '#D1D1D1', // SVG icon color in info box
        Title: '#4A4A4A', // Info box title color
        svg: '#FFA726', // SVG color for info boxes
        LoadingText: '#707070', // Loading text color
        CountText: '#4A4A4A', // Count text color
    },

    orders: {
        container: '#FFFFFF', // Orders container background
        title: '#4A4A4A', // Title color
        svg: '#FFA726', // SVG icon color
        status: '#FFA726', // Status text color
        changeStatus: '#FF6F61', // Change status button color
        statusOptions: '#333', // Status options background color
        productContainerTitle: '#4A4A4A', // Product container title color
        productContainer: '#F7F7F7', // Product container background
        productContainerHover: '#E8E8E8', // Hover effect for product container
        productName: '#4A4A4A', // Product name text color
        productPriceAndQuantity: '#4A4A4A', // Product price and quantity color
        productQuantity: '#707070', // Product quantity text color
    },
};

// const initialState2 = {
//     nav: '',
//     logo: '', //same as textRight
//     navLink: '',
//     navLinkHover: '', // ligter sades of navLink
//     profileSvg: '',
//     CartSvg: '', //same as landingLeftBg
//     landingLeftBg: '',
//     landingRightBg: '',
//     textLeft: '',
//     textRight: '',
//     textCenter: '',
//     shopBtn: '', //same as textCenter
//     aboutBtn: '',//same as landingLeftBg
//     titile1: '',// dark header
//     titile1ButLighter: '',
//     titile2: '', //same as landingLeftBg
//     description: '',
//     labels: '',//abit lighter than titile1ButLighter
//     link1: '',//first colorfull color
//     links2: '',//same color as titile2
//     svg: '',//same as  link1
//     svg2: '',//same color as titile 2
//     mainBg: '',// super light bg that complmnet well to whole theme(its bg of all container)
//     boxBg: '', //this eed to be glass like color
//     footer: '',
//     productBox: '',
//     btnGredient1: '',//this frst gredien color
//     btnGredient2: '',//this second gredien color
// }

const initialState2 = {
    circle1: 'rgba(0, 102, 255, 0.7)', // Electric blue for dynamic effect
    circle2: 'rgba(255, 221, 51, 0.3)', // Bright yellow for attention-grabbing elements
    nav: '#0A2540', // Deep navy blue for a professional and clean navigation bar
    hamDiv: '#F4F6F9', // Light gray for the hamburger menu
    linksPhone: '#F4F6F9', // Consistent light gray for links on mobile
    pulse: '#007BFF', // Electric blue for interactive elements
    logo: '#F1F1F1', // Light silver for the logo to stand out
    navLink: '#0D74B6', // Blue-gray for navigation links
    navLinkHover: '#005B8C', // Darker blue for hover effect
    profileSvg: '#F1F1F1', // Matches the logo color for profile icon
    CartSvg: '#FFB74D', // Warm yellow for the cart icon
    landingLeftBg: '#FFB74D', // Warm yellow for the landing section left, symbolizing energy
    landingRightBg: '#0A2540', // Deep navy blue for modern and sleek contrast
    textLeft: '#0A2540', // Deep navy blue for text on the left
    textRight: '#F1F1F1', // Soft off-white for contrast on the right
    textCenter: '#007BFF', // Electric blue for emphasized center text
    shopBtn: '#007BFF', // Electric blue for call-to-action buttons
    aboutBtn: '#FFB74D', // Warm yellow for secondary buttons, symbolizing energy
    dropdown: '#FFC107', // Golden yellow for dropdowns, indicating choices
    answer: '#F1F1F1', // Soft off-white for answers in dropdowns
    titile1: '#0A2540', // Deep navy blue for headers
    titile1ButLighter: '#5A6772', // Slightly lighter slate for variation in titles
    titile2: '#FFB74D', // Warm yellow for sub-headers, adding energy
    description: '#4B5A61', // Muted gray-blue for descriptions, maintaining readability
    labels: '#A5B1C2', // Light gray-blue for less prominent labels
    link1: '#007BFF', // Electric blue for primary links
    links2: '#FFB74D', // Warm yellow for secondary links
    svg: '#007BFF', // Matches link1 for SVG icons
    svgHover: '#005B8C', // Darker blue for hover effects on icons
    svg2: '#FFB74D', // Matches links2 for secondary icon colors
    mainBg: '#F4F6F9', // Light grayish-blue for the background to keep it modern and clean
    boxBg: 'rgba(255, 255, 255, 0.9)', // Slightly opaque white for product boxes for a clean look
    footer: '#0A2540', // Deep navy blue for footer to match the nav
    productBox: '#FFFFFF', // Clean white for product box backgrounds
    btnGredient1: '#007BFF', // Electric blue gradient start for buttons
    btnGredient2: '#FFB74D', // Warm yellow gradient end for buttons
};



const reducer = (state, action) => {
    switch (action.type) {

        default:
            return state
    }
}

export const colorContext = createContext();
const ColorContextProvider = ({ children }) => {

    const [config, dispatchConfig] = useReducer(reducer, initialState2)

    return (
        <colorContext.Provider value={{ config, dispatchConfig }}>
            {children}
        </colorContext.Provider>
    );
};

export default ColorContextProvider;