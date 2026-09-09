import type { SVGProps } from "react";
import {
  siInstagram,
  siTelegram,
  siX,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";

function BrandIcon({
  icon,
  ...props
}: SVGProps<SVGSVGElement> & { icon: SimpleIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon icon={siInstagram} {...props} />;
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon icon={siX} {...props} />;
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon icon={siYoutube} {...props} />;
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon icon={siTelegram} {...props} />;
}