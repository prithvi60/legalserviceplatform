
export const navLinks = [
    {
        menu: "Consult an Expert",
        subCategories: [
            { href: "/consultAExpert/talkToALawyer", subMenu: "Talk to a Lawyer" },
            {
                href: "/consultAExpert/talkToACA",
                subMenu: "Talk to a Chartered Accountant",
            },
            // { href: "#", subMenu: "Talk to a Company Secretary" },
        ],
    },
    {
        menu: "Business setup",
        subCategories: [
            {
                href: "#",
                subMenu: "Company Registration",
                subDivision: [
                    {
                        href: "/documentation/business_contracts/PLD",
                        subLink: "Private Limited Company",
                    },
                    {
                        href: "/documentation/business_contracts/OPC",
                        subLink: "One Person Company",
                    },
                    {
                        href: "/documentation/business_contracts/SIR",
                        subLink: "Startup India Registration",
                    },
                ],
            },
            {
                href: "#",
                subMenu: "International Business Setup",
                subDivision: [
                    {
                        href: "/documentation/business_contracts/USI",
                        subLink: "US Incorporation",
                    },
                    {
                        href: "/documentation/business_contracts/SI",
                        subLink: "Singapore Incorporation",
                    },
                    {
                        href: "/documentation/business_contracts/UKI",
                        subLink: "UK Incorporation",
                    },
                ],
            },
            {
                href: "#",
                subMenu: "Company Name Search",
                subDivision: [
                    {
                        href: "/documentation/business_contracts/CNS",
                        subLink: "Company Name Search",
                    },
                    {
                        href: "/documentation/business_contracts/CCN",
                        subLink: "Change Company Name",
                    },
                ],
            },
        ],
    },
    {
        menu: "Documentation",
        subCategories: [
            {
                href: "/documentation/business_contracts",
                subMenu: "Business Contracts",
                subDivision: [
                    {
                        href: "/documentation/business_contracts/NDA",
                        subLink: "Non Disclosure Agreement NDA",
                    },
                    {
                        href: "/documentation/business_contracts/SLA",
                        subLink: "Service Level Agreement",
                    },
                    {
                        href: "/documentation/business_contracts/FA",
                        subLink: "Franchise Agreement",
                    },
                ],
            },
            {
                href: "/documentation",
                subMenu: "Personal & Family",
                subDivision: [
                    { href: "/documentation", subLink: "Power of Attorney" },
                    {
                        href: "/documentation/business_contracts/WA",
                        subLink: "Will Registration",
                    },
                    {
                        href: "/documentation/business_contracts/POW",
                        subLink: "Probate of Will",
                    },
                ],
            },
            {
                href: "/documentation",
                subMenu: "Real Estate",
                subDivision: [
                    {
                        href: "/documentation/business_contracts/RA",
                        subLink: "Rental Agreement",
                    },
                    {
                        href: "/documentation/business_contracts/SD",
                        subLink: "Sale Deed",
                    },
                    {
                        href: "/documentation/business_contracts/GD",
                        subLink: "Gift Deed",
                    },
                ],
            },
        ],
    },
];

export const navActiveLinks = [
    {
        menu: "Company Registration",
        subDivision: [
            {
                href: "/documentation/business_contracts/PLD",
                subLink: "Private Limited Company",
            },
            {
                href: "/documentation/business_contracts/OPC",
                subLink: "One Person Company",
            },
            {
                href: "/documentation/business_contracts/SIR",
                subLink: "Startup India Registration",
            },
        ],
    },
    {
        menu: "International Business Setup",
        subDivision: [
            {
                href: "/documentation/business_contracts/USI",
                subLink: "US Incorporation",
            },
            {
                href: "/documentation/business_contracts/SI",
                subLink: "Singapore Incorporation",
            },
            {
                href: "/documentation/business_contracts/UKI",
                subLink: "UK Incorporation",
            },
        ],
    },
    {
        menu: "Company Name Search",
        subDivision: [
            {
                href: "/documentation/business_contracts/CNS",
                subLink: "Company Name Search",
            },
            {
                href: "/documentation/business_contracts/CCN",
                subLink: "Change Company Name",
            },
        ],
    },
    {
        menu: "Business Contracts",
        subDivision: [
            {
                href: "/documentation/business_contracts/NDA",
                subLink: "Non Disclosure Agreement NDA",
            },
            {
                href: "/documentation/business_contracts/SLA",
                subLink: "Service Level Agreement",
            },
            {
                href: "/documentation/business_contracts/FA",
                subLink: "Franchise Agreement",
            },
        ],
    },
    {
        menu: "Personal & Family",
        subDivision: [
            { href: "/documentation", subLink: "Power of Attorney" },
            {
                href: "/documentation/business_contracts/WA",
                subLink: "Will Registration",
            },
            {
                href: "/documentation/business_contracts/POW",
                subLink: "Probate of Will",
            },
        ],
    },
    {
        menu: "Real Estate",
        subDivision: [
            {
                href: "/documentation/business_contracts/RA",
                subLink: "Rental Agreement",
            },
            { href: "/documentation/business_contracts/SD", subLink: "Sale Deed" },
            { href: "/documentation/business_contracts/GD", subLink: "Gift Deed" },
        ],
    },
];

export const navLinks2 = [
    {
        menu: "Business setup",
        subCategories: [
            {
                subMenu: "UAE",
                subDivision: [
                    {
                        href: "/business_setup/uae/IBS",
                        subLink: "International business setup ",
                    },
                ],
            },
        ],
    },
    {
        menu: "Tax & Compliance",
        subCategories: [
            {
                subMenu: "INDIA",
                subDivision: [
                    {
                        href: "/tax_compliance/india/GIT",
                        subLink: "GST and Indirect Tax",
                    },
                    {
                        href: "tax_compliance/india/AF",
                        subLink: "Annual Filings",
                    },
                    {
                        href: "tax_compliance/india/ATB",
                        subLink: "Accounting & Tax Convert Your Business",
                    },
                ],
            },
            {
                subMenu: "UAE",
                subDivision: [
                    { href: "tax_compliance/uae/AT", subLink: "Accounting & Tax" },
                    {
                        href: "tax_compliance/uae/AF",
                        subLink: "Annual Filings",
                    },
                ],
            },
        ],
    },
    {
        menu: "Legal Documentation",
        subCategories: [
            {
                subMenu: "INDIA",
                subDivision: [
                    {
                        href: "/legal_documentation/india/BC",
                        subLink: "Business Contracts",
                    },
                    {
                        href: "/legal_documentation/india/EA",
                        subLink: "Employee Agreement",
                    },
                    {
                        href: "/legal_documentation/india/RA",
                        subLink: "Remote Agreement",
                    },
                    {
                        href: "legal_documentation/india/PF",
                        subLink: "Personal & Family",
                    },
                    {
                        href: "legal_documentation/india/REN",
                        subLink: "Real Estate Notices HR Policies",
                    },
                ],
            },
            {
                subMenu: "UAE",
                subDivision: [
                    { href: "legal_documentation/uae/BC", subLink: "Business Contracts" },
                    {
                        href: "legal_documentation/uae/PF",
                        subLink: "Personal & Family",
                    },
                    {
                        href: "legal_documentation/uae/REN",
                        subLink: "Real Estate Notices HR Policies",
                    },
                ],
            },
        ],
    },
    {
        menu: "Financial Consultation",
        subCategories: [
            {
                href: "/financial_consultation/lawyers",
                subMenu: "Strategic Business Finance",
            },
            {
                href: "/financial_consultation/BVFM",
                subMenu: "Business Valuation & Financial Modelling",
            },
            {
                href: "/financial_consultation/FIA",
                subMenu: "Fundraising & Investment Advisory",
            },
            {
                href: "/financial_consultation/PDI",
                subMenu: "Pitch Deck & Investment Documentation",
            },
        ],
    },
    {
        menu: "Expert Consultation",
        subCategories: [
            { href: "/consultAExpert/lawyers", subMenu: "Lawyers" },
            {
                href: "/consultAExpert/CA_CS",
                subMenu: "CAs & CSs at your fingertips",
            },
        ],
    },

];

export const communityServices = [
    {
        title: "Tax & Compliance",
        services: [
            {
                country: "INDIA",
                lists: "GST and Indirect Tax , Annual Filings , Accounting & Tax Convert Your Business"
            },
            {
                country: "UAE",
                lists: "Accounting & Tax , Annual Filings"
            },
        ],
    },
    {
        title: "Legal Documentation",
        services: [
            {
                country: "INDIA",
                lists: "Business Contracts ,Personal & Family, Real Estate Notices HR Policies"
            },
            {
                country: "UAE",
                lists: "Business Contracts ,Personal & Family, Real Estate Notices HR Policies"
            },
        ],
    },
    {
        title: "Expert Consultation",
        services: [
            {
                country: "Lawyers",
                lists: ""
            },
            {
                country: "CAs",
                lists: ""
            },
            {
                country: "CSs",
                lists: ""
            }
        ],
    },
    {
        title: "Financial Consultation",
        services: [
            {
                country: "",
                lists: "Strategic Business Finance,Business Valuation,Financial Modelling,Fundraising & Investment Advisory,Pitch Deck & Investment Documentation"
            },

        ],
    },
    {
        title: "Business Setup",
        services: [
            {
                country: "UAE",
                lists: "International business setup"
            },
        ],
    },

];