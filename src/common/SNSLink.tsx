import { iconType } from "@/types/posts/frontmatters";
import Image from "next/image";
import Link from "next/link";

const SNSLink = ({
  iconType,
  link,
  className,
}: {
  iconType: iconType;
  link: string;
  className?: string;
}) => {
  let iconPath;
  switch (iconType) {
    case "Github":
      iconPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/sns/github.svg`;
      break;
    case "Linkedin":
      iconPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/sns/linkedin.svg`;
      break;
    case "Twitter":
      iconPath = `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/sns/x.svg`;
      break;
    default:
      console.error("Invalid icon type");
      return null;
  }

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Image
        src={iconPath}
        alt={iconType}
        width={20}
        height={20}
        className="bg-white hover:bg-neutral-300 rounded-full cursor-pointer"
      />
    </Link>
  );
};

export default SNSLink;
