import { MdSpaceDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FaArrowsToDot } from "react-icons/fa6";
import { SiPivotaltracker } from "react-icons/si";
import { MdOutlineSecurity } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import {
    FaBalanceScale,
    FaBuilding,
    FaCalculator,
    FaChartLine,
    FaClipboardList,
    FaFileContract,
    FaFileInvoiceDollar,
    FaGavel,
    FaGlobe,
    FaHandHoldingUsd,
    FaLaptopHouse,
    FaRegCalendarAlt,
    FaUserGraduate,
    FaUsers,
    FaUserTie,
} from "react-icons/fa";

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
                        note: "Guidance on setting up businesses internationally",
                        icon: <FaGlobe className="text-lg xl:text-xl text-primary flex-shrink-0" />,
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
                        note: "Compliance with GST & indirect taxes",
                        icon: (
                            <FaFileInvoiceDollar className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "tax_compliance/india/AF",
                        subLink: "Annual Filings",
                        note: "Regulatory filings & financial compliance",
                        icon: (
                            <FaRegCalendarAlt className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "tax_compliance/india/ATB",
                        subLink: "Accounting & Tax Convert Your Business",
                        note: "Tax planning & bookkeeping",
                        icon: (
                            <FaCalculator className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                ],
            },
            {
                subMenu: "UAE",
                subDivision: [
                    {
                        href: "tax_compliance/uae/AT",
                        subLink: "Accounting & Tax",
                        note: "Tax planning & bookkeeping",
                        icon: (
                            <FaCalculator className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "tax_compliance/uae/AF",
                        subLink: "Annual Filings",
                        note: "Regulatory filings & financial compliance",
                        icon: (
                            <FaRegCalendarAlt className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
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
                        note: "Drafting & reviewing agreements",
                        icon: (
                            <FaFileContract className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "/legal_documentation/india/EA",
                        subLink: "Employee Agreement",
                        note: "Employment contracts & policies",
                        icon: <FaUserTie className="text-lg xl:text-xl text-primary flex-shrink-0" />,
                    },
                    {
                        href: "/legal_documentation/india/RA",
                        subLink: "Remote Agreement",
                        note: "Contracts for remote work",
                        icon: (
                            <FaLaptopHouse className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "legal_documentation/india/PF",
                        subLink: "Personal & Family",
                        note: "Legal support for family matters",
                        icon: <FaUsers className="text-lg xl:text-xl text-primary flex-shrink-0" />,
                    },
                    {
                        href: "legal_documentation/india/REN",
                        subLink: "Real Estate Notices HR Policies",
                        note: "Property & workplace legalities",
                        icon: <FaBuilding className="text-lg xl:text-xl text-primary flex-shrink-0" />,
                    },
                ],
            },
            {
                subMenu: "UAE",
                subDivision: [
                    {
                        href: "legal_documentation/uae/BC",
                        subLink: "Business Contracts",
                        note: "Drafting & reviewing agreements",
                        icon: (
                            <FaFileContract className="text-lg xl:text-xl text-primary flex-shrink-0" />
                        ),
                    },
                    {
                        href: "legal_documentation/uae/PF",
                        subLink: "Personal & Family",
                        note: "Legal support for family matters",
                        icon: <FaUsers className="text-lg xl:text-xl text-primary flex-shrink-0" />,
                    },
                    {
                        href: "legal_documentation/uae/REN",
                        subLink: "Real Estate Notices HR Policies",
                        note: "Property & workplace legalities",
                        icon: <FaBuilding className="text-lg xl:text-xl text-primary flex-shrink-0" />,
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
                icon: <FaChartLine className="text-lg xl:text-xl text-primary flex-shrink-0" />,
            },
            {
                href: "/financial_consultation/BVFM",
                subMenu: "Business Valuation & Financial Modelling",
                icon: <FaBalanceScale className="text-lg xl:text-xl text-primary flex-shrink-0" />,
            },
            {
                href: "/financial_consultation/FIA",
                subMenu: "Fundraising & Investment Advisory",
                icon: (
                    <FaHandHoldingUsd className="text-lg xl:text-xl text-primary flex-shrink-0" />
                ),
            },
            {
                href: "/financial_consultation/PDI",
                subMenu: "Pitch Deck & Investment Documentation",
                icon: (
                    <FaClipboardList className="text-lg xl:text-xl text-primary flex-shrink-0" />
                ),
            },
        ],
    },
    {
        menu: "Expert Consultation",
        subCategories: [
            {
                href: "/consultAExpert/lawyers",
                subMenu: "Lawyers",
                icon: <FaGavel className="text-lg xl:text-xl text-primary flex-shrink-0" />,
            },
            {
                href: "/consultAExpert/CA_CS",
                subMenu: "CAs & CSs at your fingertips",
                icon: <FaUserGraduate className="text-lg xl:text-xl text-primary flex-shrink-0" />,
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
                lists:
                    "GST and Indirect Tax , Annual Filings , Accounting & Tax Convert Your Business",
                href: "/legal_documentation/india/BC",
            },
            {
                country: "UAE",
                lists: "Accounting & Tax , Annual Filings",
                href: "/legal_documentation/india/BC",
            },
        ],
    },
    {
        title: "Legal Documentation",
        services: [
            {
                country: "INDIA",
                lists:
                    "Business Contracts ,Personal & Family, Real Estate Notices HR Policies",
                href: "/legal_documentation/india/BC",
            },
            {
                country: "UAE",
                lists:
                    "Business Contracts ,Personal & Family, Real Estate Notices HR Policies",
                href: "/legal_documentation/india/BC",
            },
        ],
    },
    {
        title: "Expert Consultation",
        services: [
            {
                country: "India",
                lists: "Lawyers",
                href: "consultAExpert/lawyers",
            },
            {
                country: "India",
                lists: "CAs",
                href: "consultAExpert/CA_CS",
            },
            {
                country: "India",
                lists: "CSs",
                href: "consultAExpert/CA_CS",
            },
        ],
    },
    {
        title: "Business Setup",
        services: [
            {
                country: "UAE",
                lists: "International business setup",
                href: "/legal_documentation/india/BC",
            },
        ],
    },
    {
        title: "Financial Consultation",
        services: [
            {
                country: "",
                lists:
                    "Strategic Business Finance,Business Valuation,Financial Modelling,Fundraising & Investment Advisory,Pitch Deck & Investment Documentation",
                href: "/legal_documentation/india/BC",
            },
        ],
    },
];

export const businessOverviews = [
    {
        icon: (
            <MdSpaceDashboard className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Unified Dashboard",
        desc: "Track compliance, legal, and tax matters seamlessly.",
    },
    {
        icon: (
            <RiTeamFill className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Your Legal & Compliance Team",
        desc: "Lawyers + CAs + CSs in your pocket.",
    },
    {
        icon: (
            <FaArrowsToDot className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Automatic Reminders",
        desc: "Stay on top of deadlines & legal requirements.",
    },
    {
        icon: (
            <SiPivotaltracker className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Efficient Tracking",
        desc: "Real-time updates on compliance & financial health.",
    },
];

export const SCGResults = [
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "100% Data Security",
        summary: "We ensure privacy & professional discretion.",
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "On-Time Delivery",
        summary: "Quick turnaround for all legal & compliance needs.",
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Accurate & Reliable Solutions",
        summary: "Expert-driven, legally sound services.",
    },
];

export const ALCTools = [
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "AI Case Alerts & Research",
        summary: "Stay updated on legal developments.",
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Judgment Database",
        summary: "5M+ legal case references at your fingertips.",
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Compliance Tracking",
        summary: "Never miss a tax or regulatory deadline.",
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Live Court Display Board",
        summary: "Get instant updates on hearings & cases.",
    },
];

export const talkToExpert = [
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Talk to Lawyer",
        lists: ["Draft contracts", "handle disputes", "legal advisory"],
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Talk to CAs",
        lists: ["Tax planning", "auditing", "financial compliance"],
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Talk to CSs",
        lists: ["Corporate governance", "regulatory compliance."],
    },
    {
        icon: "/Icon-1.svg",
        alt: "icons",
        href: "#",
        title: "Talk to Financial analysts",
        lists: ["Investor and Company analysis"],
    },
];

export const startBusiness = [
    {
        icon: (
            <MdSpaceDashboard className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "All-in-One Unified Dashboard",
        desc: "Manage compliance, legal, and financial needs effortlessly from a single, intuitive platform.",
    },
    {
        icon: (
            <RiTeamFill className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Your Legal, Tax & Compliance Experts",
        desc: "Access lawyers, chartered accountants (CAs), and company secretaries (CSs) at your fingertips.",
    },
    {
        icon: (
            <FaArrowsToDot className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Stay Compliant with Automatic Reminders",
        desc: "Never miss a deadline! Our smart compliance tracker keeps your business aligned with the latest regulations.",
    },
    {
        icon: (
            <SiPivotaltracker className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Efficient Compliance Tracking & Monitoring",
        desc: "Automated alerts and real-time monitoring ensure you stay ahead of regulatory requirements.",
    },
    {
        icon: (
            <MdOutlineSecurity className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Security, Confidentiality & Guaranteed Results",
        desc: "We prioritize data protection, professional discretion, and 100% accuracy in every service.",
    },
    {
        icon: (
            <GrMoney className="text-4xl md:text-5xl text-primary flex-shrink-0" />
        ),
        title: "Affordable & Transparent Pricing",
        desc: "Premium legal and financial solutions from senior industry experts – at unbeatable rates.",
    },
];

export const exploreSuitLists = [
    {
        mainTitle: "Business Registration - UAE",
        desc: "Get your company up and running with hassle-free registration.",
        lists: [
            "Private Limited Company",
            "Limited Liability Partnership (LLP)",
            "One Person Company (OPC)",
            "Partnership Firm",
            "Sole Proprietorship",
        ],
        footerName: "Start your business in the UAE today",
        btnName: "Get Started",
    },
    {
        mainTitle: "GST Filing & Compliance - UAE & India",
        desc: "Stay compliant with expert tax filing services.",
        lists: [
            "GST Registration",
            "GST Filing & Returns",
            "GST Cancellation & Revocation",
            "Reply to GST Notices",
            "Indirect Tax Advisory",
        ],
        footerName: "Simplify your tax filings ",
        btnName: "Schedule a Consultation",
    },
    {
        mainTitle: "Accounting & Compliance - UAE & India",
        desc: "Accurate bookkeeping and financial reporting to keep your business on track.",
        lists: [
            "Bookkeeping & Accounting",
            "Annual Compliance Reports",
            "TDS Return Filing",
            "Income Tax Notices Handling",
            "Secretarial Audits",
        ],
        footerName: "Ensure seamless financial compliance",
        btnName: "Book a Consultation",
    },
    {
        mainTitle: "Advanced Financial Services for Businesses & Startups",
        desc: "Optimize financial health and strategic growth.",
        lists: [
            "Corporate Finance Advisory - Build strong financial structures.",
            "Cash Flow & Working Capital Management - Maintain business liquidity.",
            "Financial Risk Management - Identify & mitigate business risks.",
            "Revenue & Profitability Forecasting - Data-driven financial planning.",
            "Cap Table Management - Streamline equity distribution.",
            "Pitch Deck Creation - Investor-ready, data-backed presentations.",
        ],
        footerName: "Strategize for financial success",
        btnName: "Get Started",
    },
    {
        mainTitle: "Business Valuation & Financial Modeling",
        desc: "Make informed financial decisions with accurate business insights.",
        lists: [
            "Company Valuation Reports - Investment & acquisition insights.",
            "Financial Modeling for Investors - Forecast growth & performance.",
            "Market & Competitor Financial Analysis - Benchmark & analyze market trends.",
            "Revenue & Profitability Forecasting - Build strong financial projections.",
        ],
        footerName: "Maximize business valuation",
        btnName: "Consult Our Experts",
    },
    {
        mainTitle: "Fundraising & Investment Advisory",
        desc: "Get investment-ready with expert legal & financial support.",
        lists: [
            "Venture Capital (VC) & Angel Investment Assistance - Secure funding seamlessly.",
            "Investor Readiness & Due Diligence - Ensure compliance & transparency.",
            "Financial Due Diligence for Mergers & Acquisitions (M&A) - Assess risk & valuation accuracy.",
        ],
        footerName: "Raise funds with confidence",
        btnName: "Talk to an Expert",
    },
    {
        mainTitle: "Pitch Deck & Investment Documentation",
        desc: "Present your business with clarity and impact.",
        lists: [
            "Investor-Ready Pitch Decks - Persuasive, data-driven presentations.",
            "Business Plans & Financial Projections - Clear & compelling growth roadmaps.",
            "Cap Table Management & Structuring - Optimize equity distribution.",
            "Term Sheets & Shareholder Agreements - Legally sound investment documentation.",
        ],
        footerName: "Impress investors & secure funding",
        btnName: "Get Started",
    },
    {
        mainTitle: "Legal Documentation & Compliance",
        desc: "Protect your business with solid legal foundations.",
        lists: [
            "Business Contracts & Agreements - NDAs, MoUs, service agreements.",
            "Investor Agreements & Cap Table Management - Structuring ownership & equity.",
            "Employment & Compensation Structures - ESOPs, payroll, and benefits planning.",
            "Regulatory & Corporate Governance Compliance - Ensuring legal compliance.",
            "Intellectual Property (IP) Protection - Trademarks, copyrights & patents.",
            "Mergers & Acquisitions (M&A) Legal Support - Due diligence & deal structuring.",
            "Dispute Resolution & Litigation Support - Business legal advisory.",
        ],
        footerName: "Secure your business legally",
        btnName: "Speak to Our Experts",
    },
];

export const customerFeedbackLists = [
    {
        img: "/slider-sample.png",
        alt: "sample img",
        review: "How We Are Transforming Legal Services in India.",
        reviewer: "news channel 1",
        href: "",
    },
    {
        img: "/slider-sample.png",
        alt: "sample img",
        review: "Empowering Startups with Affordable Compliance Solutions.",
        reviewer: "news channel 2",
        href: "",
    },
    {
        img: "/slider-sample.png",
        alt: "sample img",
        review: "Making Business Setup Faster & Easier for Entrepreneurs.",
        reviewer: "news channel 3",
        href: "",
    },
];
