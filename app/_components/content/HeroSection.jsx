import Image from "next/image";
import React from "react";

function HeroSection({ banners }) {
  return (
    <>
      <div className="container mx-auto">
        {banners
          .filter((item) => item.title === "firstBenner")
          .map((item) => {
            // جلب رابط الصورة من أكثر من احتمال
            let imgUrl =
              item.imgSrc?.url ||
              item.img?.data?.attributes?.url ||
              item.img?.url ||
              item.img ||
              "";

            // إضافة رابط السيرفر إذا كان الرابط بيتغير
            // if (imgUrl && !imgUrl.startsWith("http")) {
            //   imgUrl = `http://localhost:1337${imgUrl}`;
            // }

            return (
              <div
                key={item.id}
                className="w-full h-16 sm:h-18 md:h-40 lg:h-40 relative"
              >
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt={"banner"}
                    fill
                    className=" rounded-lg"
                    priority
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="container flex mx-auto p-4 gap-0">
        <div className="container ">
          {banners
            .filter((item) => item.title === "womenOffer")
            .map((item) => {
              // جلب رابط الصورة من أكثر من احتمال
              let imgUrl =
                item.imgSrc?.url ||
                item.img?.data?.attributes?.url ||
                item.img?.url ||
                item.img ||
                "";
              // إضافة رابط السيرفر إذا كان الرابط بيتغير
              // if (imgUrl && !imgUrl.startsWith("http")) {
              //   imgUrl = `http://localhost:1337${imgUrl}`;
              // }

              return (
                <div
                  key={item.id}
                  className="w-full h-40 sm:h-56 md:h-72 lg:h-80 relative  shadow-lg flex items-center justify-center"
                >
                  {imgUrl && (
                    <Image
                      src={imgUrl}
                      alt={"banner"}
                      fill
                      className=" transition-all duration-300"
                      sizes="(max-width: 640px) 100vw , (max-width: 1024px) 50vw, 600px"
                      priority
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div className="container ">
          {banners
            .filter((item) => item.title === "menOffer")
            .map((item) => {
              // جلب رابط الصورة من أكثر من احتمال
              let imgUrl =
                item.imgSrc?.url ||
                item.img?.data?.attributes?.url ||
                item.img?.url ||
                item.img ||
                "";

              // إضافة رابط السيرفر إذا كان الرابط بيتغير
              // if (imgUrl && !imgUrl.startsWith("http")) {
              //   imgUrl = `http://localhost:1337${imgUrl}`;
              // }

              return (
                <div
                  key={item.id}
                  className="w-full h-40 sm:h-56 md:h-72 lg:h-80 relative  shadow-lg flex items-center justify-center"
                >
                  {imgUrl && (
                    <Image
                      src={imgUrl}
                      alt={"banner"}
                      className=" transition-all duration-300"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default HeroSection;
