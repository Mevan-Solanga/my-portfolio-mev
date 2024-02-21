import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="max-4-prose">
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
