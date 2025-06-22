import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", marginTop: "20px" }}
        data-ad-client="ca-pub-5183370140149927"
        data-ad-slot="4337395286"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <ins
        className="adsbygoogle"
        style={{ display: "block", marginTop: "20px" }}
        data-ad-client="ca-pub-5183370140149927"
        data-ad-slot="6956089260" // slot khác nếu muốn quảng cáo khác
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;