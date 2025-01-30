import { CardComponent } from "../UI/CardComponent";


const Consultants = () => {
    return (
        <section className="padding w-full space-y-12 bg-[#FFFBEE]">
            <h3 className="font-Archivo text-3xl tracking-wider font-semibold text-center md:text-5xl xl:text-6xl text-secondary">
                Scholarly work by our panel of Consultants
            </h3>
            <div className="flex flex-col md:flex-row justify-center md:flex-wrap xl:flex-nowrap gap-4">
                {consultantLists.map((item, idx) => (
                    <CardComponent data={item} key={idx} />
                ))}
            </div>
        </section>
    );
};

export default Consultants;

export const consultantLists = [
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/avatar-1.jpg",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/avatar-1.jpg",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/avatar-1.jpg",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
];
