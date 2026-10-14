import { ImageResponse } from "next/og";
import Logo from "@/components/common/logo";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white", // Solid white background for iOS
      }}
    >
      <Logo />
    </div>,
    {
      ...size,
    }
  );
}
