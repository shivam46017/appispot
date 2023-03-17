import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/popover";
const PopoverHorizon = (props) => {
  const { extra, trigger, content } = props;
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        className={`w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 ${extra}`}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverHorizon;
