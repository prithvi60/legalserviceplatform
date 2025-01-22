import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button"

export default function PopoverComponent({ title }: { title: string }) {
    return (
        <Popover placement="left" showArrow={true}>
            <PopoverTrigger>
                <Button>{title}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                    <div className="text-tiny">This is the popover content</div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
