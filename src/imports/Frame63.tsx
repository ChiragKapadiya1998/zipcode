import imgImage7 from "figma:asset/da1302ca6fc90a292f83fc6c195b2d96f6a84396.png";

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center pb-[20px] pt-[4px] px-[12px] relative rounded-tl-[16px] rounded-tr-[16px] size-full" style={{ backgroundImage: "linear-gradient(95.1955deg, rgb(220, 54, 8) 4.4464%, rgb(255, 148, 47) 51.347%, rgb(195, 42, 0) 99.158%)" }}>
      <div className="relative shrink-0 size-[12px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <p className="font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[24px] relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">Perfect for slow afternoons</p>
    </div>
  );
}