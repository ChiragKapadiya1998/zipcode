import svgPaths from "./svg-sx71568c8b";
import imgFrame69 from "figma:asset/d7500198ffa6f83b4e593dcda3fb7dabfa30d71c.png";
import imgFrame70 from "figma:asset/b17203251600c5c7e68f5cfd5900cdc4f2298324.png";
import imgFrame71 from "figma:asset/a7ce12a493e2b3a388cb8164a8c2273f3aed69f2.png";
import imgFrame72 from "figma:asset/64f238cf27e059fc4160f1aa6c130970c82a476d.png";
import imgFrame73 from "figma:asset/d9f497c1c12284df2c1dcb7e42ec96b3ad9e90a3.png";
import imgFrame18 from "figma:asset/f23eb893348f59a0eef3df0739393d997b419cfd.png";
import imgContainer from "figma:asset/66c153ca50f307341bb0a1f14abf12bdb9ac8f8b.png";
import imgFrame19 from "figma:asset/a821d344a3c0f0c1bcfc00adb17a3cd0b61c5b58.png";
import imgImageWithFallback from "figma:asset/028bbe3a90ad19328ab104be42b9954606bcb0b4.png";
import imgImageWithFallback1 from "figma:asset/967260013cf9d8a5aa9696b1b7b195898b2dcd12.png";
import imgImage7 from "figma:asset/da1302ca6fc90a292f83fc6c195b2d96f6a84396.png";
import imgImageWithFallback2 from "figma:asset/a9b87f02cc1b19f8513c682edbc775d2b4f5f3bc.png";
import imgImageWithFallback3 from "figma:asset/14d5d01cfba2f76aa94ac55970b6b417ad392937.png";

function StatusBarTime() {
  return (
    <div className="h-[21.84px] relative rounded-[24.96px] shrink-0 w-[56.16px]" data-name="_StatusBar-time">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20.8px] leading-[21.84px] left-[21.08px] not-italic text-[16.64px] text-black text-center top-[1.98px] tracking-[-0.3328px] w-[56.16px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center pb-[3.12px] pl-[20.8px] pr-[56.16px] relative shrink-0" data-name="Left Side">
      <StatusBarTime />
    </div>
  );
}

function DynamicIsland() {
  return <div className="h-full shrink-0 w-[130px]" data-name="Dynamic Island" />;
}

function SignalWifiBattery() {
  return (
    <div className="content-stretch flex gap-[8.32px] items-start relative shrink-0" data-name="Signal, Wifi, Battery">
      <div className="h-[12.48px] relative shrink-0 w-[18.72px]" data-name="Icon / Mobile Signal">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 18.72 12.48">
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p1f134900} fill="var(--fill-0, black)" />
            <path d={svgPaths.p15423d80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1c70cb00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1955a340} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <div className="h-[12.307px] relative shrink-0 w-[17.68px]" data-name="Wifi">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6797 12.3075">
          <path d={svgPaths.p3baf1d00} fill="var(--fill-0, black)" id="Wifi" />
        </svg>
      </div>
      <div className="h-[13.52px] relative shrink-0 w-[28.497px]" data-name="_StatusBar-battery">
        <div className="-translate-y-1/2 absolute h-[13.52px] left-0 right-[2.5px] top-1/2" data-name="Outline">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 25.92 13.52">
            <path d={svgPaths.p69c2900} id="Outline" opacity="0.35" stroke="var(--stroke-0, black)" strokeWidth="1.09729" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute h-[4.389px] right-0 top-[calc(50%+0.63px)] w-[1.457px]" data-name="Battery End">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 1.45724 4.38916">
            <path d={svgPaths.p21a8a0c0} fill="var(--fill-0, black)" id="Battery End" opacity="0.4" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute h-[9.36px] left-[2.08px] right-[4.58px] top-1/2" data-name="Fill">
          <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 21.76 9.36">
            <path d={svgPaths.p313a2f00} fill="var(--fill-0, black)" id="Fill" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div className="content-stretch flex h-full items-center justify-center pl-[41.6px] pr-[20.8px] relative shrink-0" data-name="Right Side">
      <SignalWifiBattery />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex h-[73px] items-end justify-between left-1/2 top-0 w-[375px]" data-name="StatusBar">
      <LeftSide />
      <DynamicIsland />
      <RightSide />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[13.99px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9903 13.9903">
        <g clipPath="url(#clip0_1_453)" id="Icon">
          <path d={svgPaths.pc887780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
          <path d={svgPaths.p2db24280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
        </g>
        <defs>
          <clipPath id="clip0_1_453">
            <rect fill="white" height="13.9903" width="13.9903" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Icon />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">New York City</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[rgba(30,30,30,0.4)] content-stretch flex gap-[6px] items-center justify-center left-[16px] px-[10px] py-[6px] rounded-[30px] top-[74px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-[-0.5px] pointer-events-none rounded-[30.5px]" />
      <Frame29 />
      <div className="h-[7px] relative shrink-0 w-[3.5px]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 8.16667">
            <path d={svgPaths.p3a6cd80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(80,80,80,0.15)] left-[16px] rounded-[18.667px] size-[64px] top-[121px]">
      <div aria-hidden="true" className="absolute border-[1.167px] border-[rgba(185,185,185,0.7)] border-solid inset-[-0.584px] pointer-events-none rounded-[19.251px]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-white left-[34.29px] rounded-[44.722px] size-[26.667px] top-[139.29px]">
      <div aria-hidden="true" className="absolute border-[0.486px] border-[rgba(255,255,255,0.7)] border-solid inset-[-0.243px] pointer-events-none rounded-[44.965px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[16px] top-[121px]">
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[60px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[16px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <img alt="" className="absolute h-[115.38%] left-[-36.54%] max-w-none top-[-7.69%] w-[173.08%]" src={imgFrame69} />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="backdrop-blur-[27px] bg-[rgba(255,255,255,0.2)] relative rounded-[18.667px] shrink-0 size-[64px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.667px] py-[7px] relative rounded-[inherit] size-full">
        <Frame23 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.7)] border-solid inset-[-2px] pointer-events-none rounded-[20.667px]" />
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[60px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[16px] size-full" src={imgFrame70} />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="backdrop-blur-[27px] bg-[rgba(255,255,255,0.2)] relative rounded-[18.667px] shrink-0 size-[64px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.667px] py-[7px] relative rounded-[inherit] size-full">
        <Frame25 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.7)] border-solid inset-[-2px] pointer-events-none rounded-[20.667px]" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[60px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[16px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <img alt="" className="absolute h-[117.31%] left-[-37.98%] max-w-none top-[-17.31%] w-[175.96%]" src={imgFrame71} />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="backdrop-blur-[27px] bg-[rgba(255,255,255,0.2)] relative rounded-[18.667px] shrink-0 size-[64px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.667px] py-[7px] relative rounded-[inherit] size-full">
        <Frame26 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.7)] border-solid inset-[-2px] pointer-events-none rounded-[20.667px]" />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[60px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[16px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <img alt="" className="absolute h-[117.31%] left-[-37.89%] max-w-none top-[0.82%] w-[175.96%]" src={imgFrame72} />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="backdrop-blur-[27px] bg-[rgba(255,255,255,0.2)] relative rounded-[18.667px] shrink-0 size-[64px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.667px] py-[7px] relative rounded-[inherit] size-full">
        <Frame31 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.7)] border-solid inset-[-2px] pointer-events-none rounded-[20.667px]" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative rounded-[18px] shrink-0 size-[52px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[18px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[18px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[18px]">
          <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-5.8%] w-full" src={imgFrame73} />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="backdrop-blur-[27px] bg-[rgba(255,255,255,0.2)] relative rounded-[18.667px] shrink-0 size-[64px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.667px] py-[7px] relative rounded-[inherit] size-full">
        <Frame33 />
      </div>
      <div aria-hidden="true" className="absolute border-[1.25px] border-[rgba(255,255,255,0.7)] border-solid inset-[-0.625px] pointer-events-none rounded-[19.292px]" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[96px] top-[121px]">
      <Frame22 />
      <Frame24 />
      <Frame27 />
      <Frame30 />
      <Frame32 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[96px] top-[121px]">
      <Frame28 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[43.71%_85.33%_52.1%_10.93%]" data-name="Group">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <path d={svgPaths.p1cf44100} fill="var(--fill-0, #9E9E9E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute left-[10px] pointer-events-none rounded-[36.667px] size-[22px] top-[166px]">
      <div aria-hidden="true" className="absolute inset-0 rounded-[36.667px]">
        <div className="absolute bg-white inset-0 rounded-[36.667px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[36.667px] size-full" src={imgFrame18} />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-solid border-white inset-[-0.8px] rounded-[37.467px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[10px] top-[121px]">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[37px] not-italic text-[#202020] text-[12px] top-[191px] tracking-[-0.3125px]">You</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[96px] not-italic text-[#202020] text-[12px] top-[191px] tracking-[-0.3125px]">@TheEag...</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[172px] not-italic text-[#202020] text-[12px] top-[191px] tracking-[-0.3125px]">@iamloari...</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[248px] not-italic text-[#202020] text-[12px] top-[191px] tracking-[-0.3125px]">@Travel_B...</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[323px] not-italic text-[#202020] text-[12px] top-[191px] tracking-[-0.3125px]">@Superwo...</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[376px] not-italic text-[#3a3a3a] text-[11px] top-[192px] tracking-[-0.3125px]">@Latina</p>
      <Group3 />
      <Group />
      <div className="absolute flex h-[14px] items-center justify-center left-[88px] top-[146px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18.875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[14px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 1">
                <line id="Line 1" stroke="var(--stroke-0, #B0B0B0)" strokeLinecap="round" x1="0.5" x2="13.5" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[10px] top-[121px]">
      <Group2 />
      <Group4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18.042px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0417 18.0417">
        <g id="Icon">
          <path d={svgPaths.p2c4fa420} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.50348" />
          <path d={svgPaths.pe417500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.50348" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(30,30,30,0.4)] content-stretch flex items-center justify-center p-[9.022px] relative rounded-[27.065px] shrink-0">
      <div aria-hidden="true" className="absolute border-[0.902px] border-[rgba(255,255,255,0.6)] border-solid inset-[-0.451px] pointer-events-none rounded-[27.516000000000002px]" />
      <Icon1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="pointer-events-none relative rounded-[60.145px] shrink-0 size-[36.087px]">
      <div aria-hidden="true" className="absolute inset-0 rounded-[60.145px]">
        <div className="absolute bg-white inset-0 rounded-[60.145px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[60.145px]">
          <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-8.06%] w-full" src={imgFrame18} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.312px] border-solid border-white inset-[-0.656px] rounded-[60.801px]" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[36px] items-center left-[280.78px] top-[69px]">
      <Frame1 />
      <Frame5 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#1e0000] content-stretch flex h-[42px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[96px]">
      <p className="font-['Poppins:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.2px]">Near me</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[18px] py-[16px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">Meetups</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[18px] py-[16px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">Vibes</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[18px] py-[16px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">Trending</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[14px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">New this week</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[10px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[12px] tracking-[-0.2px]">Learning</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[16px] top-[240px]">
      <Frame3 />
      <Frame36 />
      <Frame37 />
      <Frame38 />
      <Frame39 />
      <Frame40 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[334px] left-0 overflow-clip top-0 w-[375px]" style={{ backgroundImage: "linear-gradient(126.782deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24.038%, rgb(242, 189, 151) 55.307%, rgb(255, 222, 222) 100%)" }}>
      <Frame2 />
      <Group5 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[13.3%_22.94%_43.21%_26.5%]" data-name="Group">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 129.45 159.533">
        <g id="Group" opacity="0.3">
          <path d={svgPaths.p139a9780} fill="var(--fill-0, #CDBDB8)" id="Vector" />
          <path d={svgPaths.p2e993300} fill="var(--fill-0, #8D6E63)" id="Vector_2" />
          <path d={svgPaths.p20603a40} fill="var(--fill-0, #CDBDB8)" id="Vector_3" />
          <path d={svgPaths.p2a20d900} fill="var(--fill-0, #8D6E63)" id="Vector_4" />
          <path d={svgPaths.p2eec4270} fill="var(--fill-0, #CDBDB8)" id="Vector_5" />
          <path d={svgPaths.p23544970} fill="var(--fill-0, #8D6E63)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return <div className="absolute blur-[12px] left-[-3.99px] opacity-50 rounded-[22437600px] size-[47.979px] top-[-3.99px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(81, 162, 255) 0%, rgb(21, 93, 252) 100%)" }} />;
}

function Icon3() {
  return <div className="shrink-0 size-[19.998px]" data-name="Icon" />;
}

function Container4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[2px] rounded-[22437600px] size-[39.996px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[22437600px]">
        <div className="absolute inset-0 rounded-[22437600px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(81, 162, 255) 0%, rgb(21, 93, 252) 100%)" }} />
        <div className="absolute inset-0 overflow-hidden rounded-[22437600px]">
          <img alt="" className="absolute h-[118.41%] left-[-44.35%] max-w-none top-[4.15%] w-[177.62%]" src={imgContainer} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[22437600px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Icon3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="pointer-events-none relative rounded-[36.667px] size-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-[36.667px]">
        <div className="absolute bg-white inset-0 rounded-[36.667px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[36.667px] size-full" src={imgFrame18} />
      </div>
      <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] rounded-[37.417px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="pointer-events-none relative rounded-[36.667px] size-full">
      <div aria-hidden="true" className="absolute inset-0 rounded-[36.667px]">
        <div className="absolute bg-white inset-0 rounded-[36.667px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[36.667px] size-full" src={imgFrame19} />
      </div>
      <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] rounded-[37.417px]" />
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[#ff6900] left-[-20px] opacity-0 rounded-[22437600px] size-[79.992px] top-[-20px]" data-name="Container" />;
}

function Container7() {
  return <div className="absolute blur-[12px] left-[-3.99px] opacity-50 rounded-[22437600px] size-[47.979px] top-[-3.99px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[19.998px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g clipPath="url(#clip0_1_459)" id="Icon">
          <path d="M8.33301 1.66699V3.3335" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d="M11.666 1.66699V3.3335" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p2bc2b780} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d="M5 1.66699V3.3335" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
        <defs>
          <clipPath id="clip0_1_459">
            <rect fill="white" height="19.9981" width="19.9981" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[2px] rounded-[22437600px] size-[39.996px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 137, 4) 0%, rgb(245, 73, 0) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[22437600px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Icon4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container6 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return <div className="blur-[12px] opacity-50 rounded-[22437600px] size-full" data-name="Container" />;
}

function Container10() {
  return <div className="blur-[12px] opacity-50 rounded-[22437600px] size-full" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="absolute h-[366.831px] left-[-51.54px] overflow-clip top-[-0.45px] w-[256.056px]" data-name="Icon">
      <div className="absolute inset-[30%_0_70%_0]" data-name="Vector">
        <div className="absolute inset-[-2.3px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 4.59719">
            <path d="M0 2.29859H256.056" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[30.5%_0_69.5%_0]" data-name="Vector">
        <div className="absolute inset-[-0.77px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 1.5324">
            <path d="M0 0.766198H256.056" id="Vector" opacity="0.5" stroke="var(--stroke-0, white)" strokeWidth="1.5324" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-0 right-0 top-1/2" data-name="Vector">
        <div className="absolute inset-[-2.3px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 4.59719">
            <path d="M0 2.29859H256.056" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[50.5%_0_49.5%_0]" data-name="Vector">
        <div className="absolute inset-[-0.77px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 1.5324">
            <path d="M0 0.766198H256.056" id="Vector" opacity="0.5" stroke="var(--stroke-0, white)" strokeWidth="1.5324" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70%_0_30%_0]" data-name="Vector">
        <div className="absolute inset-[-2.3px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 4.59719">
            <path d="M0 2.29859H256.056" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/4 right-3/4 top-0" data-name="Vector">
        <div className="absolute inset-[0_-2.3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.59719 366.831">
            <path d="M2.29859 0V366.831" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_74.5%_0_25.5%]" data-name="Vector">
        <div className="absolute inset-[0_-0.77px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5324 366.831">
            <path d="M0.766198 0V366.831" id="Vector" opacity="0.5" stroke="var(--stroke-0, white)" strokeWidth="1.5324" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 right-1/2 top-0" data-name="Vector">
        <div className="absolute inset-[0_-2.3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.59719 366.831">
            <path d="M2.29859 0V366.831" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_49.5%_0_50.5%]" data-name="Vector">
        <div className="absolute inset-[0_-0.77px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.5324 366.831">
            <path d="M0.766198 0V366.831" id="Vector" opacity="0.5" stroke="var(--stroke-0, white)" strokeWidth="1.5324" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-3/4 right-1/4 top-0" data-name="Vector">
        <div className="absolute inset-[0_-2.3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.59719 366.831">
            <path d="M2.29859 0V366.831" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4.59719" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20%_0_80%_0]" data-name="Vector">
        <div className="absolute inset-[-1.15px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 2.29859">
            <path d="M0 1.1493H256.056" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[9.66%_0_90.34%_0]" data-name="Vector">
        <div className="absolute inset-[-1.15px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 2.29859">
            <path d="M0 1.1493H256.056" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[40%_0_60%_0]" data-name="Vector">
        <div className="absolute inset-[-1.15px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 2.29859">
            <path d="M0 1.1493H256.056" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[60%_0_40%_0]" data-name="Vector">
        <div className="absolute inset-[-1.15px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 2.29859">
            <path d="M0 1.1493H256.056" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[80%_0_20%_0]" data-name="Vector">
        <div className="absolute inset-[-1.06px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.056 2.12208">
            <path d="M0 1.06104H256.056" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.12208" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_87.5%_0_12.5%]" data-name="Vector">
        <div className="absolute inset-[0_-1.15px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.29859 366.831">
            <path d="M1.1493 0V366.831" id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_62.5%_0_37.5%]" data-name="Vector">
        <div className="absolute inset-[0_-1.15px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.29859 366.831">
            <path d="M1.1493 0V366.831" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_37.5%_0_62.5%]" data-name="Vector">
        <div className="absolute inset-[0_-1.15px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.29859 366.831">
            <path d="M1.1493 0V366.831" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[0_12.5%_0_87.5%]" data-name="Vector">
        <div className="absolute inset-[0_-1.15px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.29859 366.831">
            <path d="M1.1493 0V366.831" id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeWidth="2.29859" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[42.38%_20.12%_45.41%_58.39%] items-center justify-center">
        <div className="flex-none h-[55.025px] rotate-90 w-[44.81px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 44.8098 55.0246">
              <path d={svgPaths.p1619cf00} fill="var(--fill-0, #A5D6A7)" fillOpacity="0.6" id="Vector" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[42.38%_20.12%_45.41%_78.45%] items-center justify-center">
        <div className="flex-none h-[3.668px] rotate-90 w-[44.81px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 44.8098 3.66831">
              <path d={svgPaths.p27ae1030} fill="var(--fill-0, #81C784)" id="Vector" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[75.73%_52.79%_13.8%_29.3%] items-center justify-center">
        <div className="flex-none h-[45.854px] rotate-90 w-[38.408px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 38.4084 45.8539">
              <path d={svgPaths.p1809200} fill="var(--fill-0, #A5D6A7)" fillOpacity="0.6" id="Vector" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[75.73%_52.79%_13.8%_45.77%] items-center justify-center">
        <div className="flex-none h-[3.668px] rotate-90 w-[38.408px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 38.4084 3.66831">
              <path d={svgPaths.p140fe580} fill="var(--fill-0, #81C784)" id="Vector" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <Group1 />
      <div className="absolute flex inset-[13.87%_5.4%_20.82%_5.1%] items-center justify-center">
        <div className="flex-none h-[145.748px] rotate-[54.51deg] w-[190.311px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-1.19%_-0.92%_-1.2%_-0.92%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193.811 149.237">
                <path d={svgPaths.p388c1880} id="Vector" opacity="0.9" stroke="var(--stroke-0, #0041A0)" strokeDasharray="8 7" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-[60.1%_41.99%_0.65%_17.78%]">
        <div className="absolute inset-[0_-1.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 105.16 144.154">
            <path d={svgPaths.pd4be496} id="Vector 1" opacity="0.9" stroke="var(--stroke-0, #0041A0)" strokeDasharray="10.83 7.58" strokeMiterlimit="4.13936" strokeOpacity="0.25" strokeWidth="2.16636" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[31.47%_30.35%_57.62%_54.03%] items-center justify-center">
        <div className="flex-none rotate-90 size-[39.996px]">
          <Container2 />
        </div>
      </div>
      <div className="absolute flex inset-[36.37%_24.81%_57.64%_66.6%] items-center justify-center">
        <div className="flex-none rotate-90 size-[22px]">
          <Frame6 />
        </div>
      </div>
      <div className="absolute flex inset-[40.18%_29.88%_53.82%_61.52%] items-center justify-center">
        <div className="flex-none rotate-90 size-[22px]">
          <Frame7 />
        </div>
      </div>
      <div className="absolute flex inset-[9.66%_40.04%_79.43%_44.34%] items-center justify-center">
        <div className="flex-none rotate-90 size-[39.996px]">
          <Container5 />
        </div>
      </div>
      <div className="absolute flex inset-[50.28%_42.38%_36.64%_38.88%] items-center justify-center">
        <div className="flex-none rotate-90 size-[47.979px]">
          <Container9 />
        </div>
      </div>
      <div className="absolute flex inset-[76.18%_36.91%_10.74%_44.35%] items-center justify-center">
        <div className="flex-none rotate-90 size-[47.979px]">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return <div className="absolute left-[29.41px] size-[17.327px] top-[137.61px]" data-name="Container" />;
}

function Container12() {
  return <div className="bg-[#155dfc] border-2 border-solid border-white rounded-[22437600px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[15.996px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="absolute bg-[#fbfbfb] h-[342px] left-[-0.67px] top-[0.33px] w-[173px]" data-name="Container">
      <Icon2 />
      <Container11 />
      <div className="absolute flex items-center justify-center left-[67px] size-[15.996px] top-[125px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container12 />
        </div>
      </div>
      <div className="absolute flex inset-[67.84%_6.94%_29.15%_84.25%] items-center justify-center">
        <div className="flex-none h-[15.242px] rotate-90 w-[10.295px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2948 15.2425">
              <path d={svgPaths.p4604000} fill="var(--fill-0, #0041A0)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[342px] relative shrink-0 w-[172px]" data-name="Container">
      <Container1 />
      <div className="absolute flex inset-[-9.97%_-4.84%_64.54%_-1.26%] items-center justify-center">
        <div className="-scale-y-100 flex-none h-[154.942px] rotate-[-111.71deg] skew-x-[0.25deg] w-[104.885px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.26%_-1.03%_0_-0.96%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106.971 155.41">
                <path d={svgPaths.p1e49fc80} id="Vector 2" opacity="0.9" stroke="var(--stroke-0, #02AFFF)" strokeDasharray="10.83 7.58" strokeMiterlimit="4.13936" strokeOpacity="0.15" strokeWidth="2.16636" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Realistic3DMap() {
  return (
    <div className="bg-white h-[343px] relative rounded-[16px] w-[173px]" data-name="Realistic3DMap">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.669px] relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border-[0.669px] border-[rgba(229,229,229,0.5)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[19.998px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g clipPath="url(#clip0_1_512)" id="Icon">
          <path d={svgPaths.p1736c380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p3ef9ed00} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p3a6c6800} fill="var(--fill-0, white)" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p4574100} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p5133500} fill="var(--fill-0, white)" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
        <defs>
          <clipPath id="clip0_1_512">
            <rect fill="white" height="19.9981" width="19.9981" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[189px] p-[2px] rounded-[22437600px] size-[39.996px] top-[82px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(166, 132, 255) 0%, rgb(127, 34, 254) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[22437600px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_446)" id="Icon">
          <path d={svgPaths.p244ef700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.3274 4.52516H15.6729" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p24760280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_446">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[285px] p-[2px] rounded-[22437600px] size-[40px] top-[66px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(251, 100, 182) 0%, rgb(230, 0, 118) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[22437600px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Icon6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col h-[13px] items-start justify-between relative shrink-0 w-[52px]" data-name="Container">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.35] not-italic relative shrink-0 text-[#222] text-[12px]">4 Active Trails</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[23px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[46px]" data-name="Button" style={{ backgroundImage: "linear-gradient(101.755deg, rgb(0, 5, 30) 11.855%, rgb(3, 3, 192) 38.97%, rgb(56, 125, 236) 83.731%, rgb(133, 200, 255) 101.38%)" }}>
      <p className="font-['Poppins:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.3125px]">View</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[39px] items-center relative shrink-0">
      <Container16 />
      <Button />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[76.3%_53.35%_5.78%_2.62%] items-center pb-[0.669px] pl-[8px] pr-[16.665px] pt-[0.67px] rounded-[14px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.669px] border-[rgba(229,229,229,0.5)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1)]" />
      <Frame8 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[19.998px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g clipPath="url(#clip0_1_438)" id="Icon">
          <path d={svgPaths.p27713c00} id="Vector" stroke="var(--stroke-0, #730FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
        <defs>
          <clipPath id="clip0_1_438">
            <rect fill="white" height="19.9981" width="19.9981" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex items-center justify-center left-[291px] p-[0.669px] rounded-[14px] size-[39.996px] top-[12.66px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.669px] border-[rgba(229,229,229,0.5)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Icon7 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute h-[173px] left-[16px] top-[68px] w-[343px]">
      <div className="absolute flex h-[173px] items-center justify-center left-0 top-0 w-[343px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "604.4375" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Realistic3DMap />
        </div>
      </div>
      <Container13 />
      <Container14 />
      <Container15 />
      <Button1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-[#1e0000] content-stretch flex items-center justify-center left-[16px] pr-[0.01px] rounded-[44px] size-[36.043px] top-[16px]">
      <div className="relative rounded-bl-[44px] rounded-br-[44px] rounded-tr-[44px] shrink-0 size-[18px]" data-name="icon">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[8.33%_11.99%_12%_8.33%]" data-name="vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 14.341 14.3409">
              <path clipRule="evenodd" d={svgPaths.p2839f280} fill="var(--fill-0, white)" fillRule="evenodd" id="vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🥐 Food</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">💪️ Sport</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🛍️️ Shopping</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px] w-[58px] whitespace-pre-wrap">🎸️ Music</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[8px] top-1/2">
      <Frame44 />
      <Frame45 />
      <Frame46 />
      <Frame47 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-[#ecedf2] h-[36px] left-[60px] overflow-clip rounded-[30px] top-[16px] w-[299px]">
      <Frame43 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[10.793px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7931 10.7931">
        <g clipPath="url(#clip0_1_434)" id="Icon">
          <path d={svgPaths.pf7a9180} id="Vector" stroke="var(--stroke-0, #404040)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.899426" />
          <path d={svgPaths.p9610e80} id="Vector_2" stroke="var(--stroke-0, #404040)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.899426" />
        </g>
        <defs>
          <clipPath id="clip0_1_434">
            <rect fill="white" height="10.7931" width="10.7931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <Icon8 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[-0.3125px]">9:00 - 11:00</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#222] text-[16px]">{`Coffee & Comics`}</p>
      <Frame10 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[12px] relative shrink-0 w-[135px]">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#ff4502] text-[11px] w-full whitespace-pre-wrap">TRENDING NOW</p>
      <Frame11 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[13.99px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9903 13.9903">
        <g clipPath="url(#clip0_1_417)" id="Icon">
          <path d={svgPaths.p3d613700} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
          <path d={svgPaths.p3d3ada70} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
        </g>
        <defs>
          <clipPath id="clip0_1_417">
            <rect fill="white" height="13.9903" width="13.9903" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[9.581px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#525252] text-[16px] top-[6.34px] tracking-[-0.3125px]">5</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[27.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.991px] items-center relative size-full">
        <Icon9 />
        <Text />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9964 15.9964">
        <g id="Icon">
          <path d={svgPaths.p3ef7f480} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33303" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container18 />
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[89px] relative shrink-0 w-[152px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Frame12 />
        <Container17 />
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute bg-[#fff4e9] content-stretch flex flex-col h-[113.793px] items-start left-[16px] pl-[8px] pt-[15.996px] rounded-[16px] top-[249px] w-[166px]">
      <Frame13 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[10.793px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7931 10.7931">
        <g clipPath="url(#clip0_1_434)" id="Icon">
          <path d={svgPaths.pf7a9180} id="Vector" stroke="var(--stroke-0, #404040)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.899426" />
          <path d={svgPaths.p9610e80} id="Vector_2" stroke="var(--stroke-0, #404040)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.899426" />
        </g>
        <defs>
          <clipPath id="clip0_1_434">
            <rect fill="white" height="10.7931" width="10.7931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[7px] items-start relative shrink-0 w-full">
      <Icon11 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#222] text-[14px] tracking-[-0.3125px]">14:00 - 18:00</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#222] text-[16px]">{`Art & Culture`}</p>
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[12px] relative shrink-0 w-[135px]">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0021b2] text-[11px] w-full whitespace-pre-wrap">LATEST TRAIL</p>
      <Frame17 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[13.99px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9903 13.9903">
        <g clipPath="url(#clip0_1_417)" id="Icon">
          <path d={svgPaths.p3d613700} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
          <path d={svgPaths.p3d3ada70} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16586" />
        </g>
        <defs>
          <clipPath id="clip0_1_417">
            <rect fill="white" height="13.9903" width="13.9903" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[9.581px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#525252] text-[16px] top-[6.34px] tracking-[-0.3125px]">2</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[27.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.991px] items-center relative size-full">
        <Icon12 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9964 15.9964">
        <g id="Icon">
          <path d={svgPaths.p3ef7f480} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33303" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container20 />
          <Icon13 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[89px] relative shrink-0 w-[152px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Frame16 />
        <Container19 />
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute bg-[#f2fcff] content-stretch flex flex-col h-[113.793px] items-start left-[calc(50%+6.5px)] pl-[8px] pt-[15.996px] rounded-[16px] top-[249px] w-[166px]">
      <Frame15 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0 size-[30px]">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🥐</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="bg-white h-[30px] relative rounded-[30px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center p-[16px] relative">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[12px] tracking-[-0.2px]">15 Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[16px] top-[17px]">
      <Frame53 />
      <Frame54 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[308.21px] size-[17.99px] top-[167px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9902 17.9902">
        <g clipPath="url(#clip0_1_423)" id="Icon">
          <path d={svgPaths.p1fb2fb40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
          <path d={svgPaths.pa01fa80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
        </g>
        <defs>
          <clipPath id="clip0_1_423">
            <rect fill="white" height="17.9902" width="17.9902" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#3a3a3a] content-stretch flex h-[20px] items-center justify-center left-[264.1px] pr-[0.01px] rounded-[44px] top-[22px] w-[63px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">~1–2 hrs</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[209px] left-px overflow-clip top-0 w-[343px]" data-name="ImageWithFallback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[109.27%] left-[0.02%] max-w-none top-0 w-[99.88%]" src={imgImageWithFallback} />
        </div>
        <div className="absolute bg-gradient-to-b from-[60.746%] from-[rgba(0,0,0,0)] inset-0 to-[85.746%] to-[rgba(0,0,0,0.8)]" />
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[281.21px] not-italic text-[16px] text-white top-[170px] tracking-[-0.3125px]">$$</p>
      <Frame52 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[40px] left-[16px] not-italic text-[24px] text-white top-[168px] tracking-[-1.5px]">{`Coffee & Comics Trail`}</p>
      <Icon14 />
      <Button2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[209px] overflow-clip relative rounded-[17.2px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function Frame57() {
  return (
    <div className="relative rounded-[12.8px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12.8px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[12.8px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[12.8px]">
          <img alt="" className="absolute h-[115.38%] left-[-36.54%] max-w-none top-[-7.69%] w-[173.08%]" src={imgFrame69} />
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[147px]">
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.35] min-w-full relative shrink-0 text-[#7f7f7f] text-[11px] w-[min-content] whitespace-pre-wrap">Hosted by</p>
      <p className="font-['Poppins:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#171717] text-[14px] tracking-[-0.3125px]">@TheEnthusiastSam</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[69.837px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-29.6px)] not-italic text-[14px] text-white top-[calc(50%-5px)] tracking-[-0.3125px]">Join Trail</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex h-[35px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[97px]" data-name="Button" style={{ backgroundImage: "linear-gradient(106.085deg, rgb(0, 5, 30) 11.855%, rgb(3, 3, 192) 38.97%, rgb(56, 125, 236) 83.731%, rgb(133, 200, 255) 101.38%)" }}>
      <Text2 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame56 />
      <Button3 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[343.21px]">
      <Container21 />
      <Frame55 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0 size-[30px]">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🥐</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-white h-[30px] relative rounded-[30px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center p-[16px] relative">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[12px] tracking-[-0.2px]">16 Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[16px] top-[17px]">
      <Frame61 />
      <Frame62 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[308.21px] size-[17.99px] top-[167.01px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9902 17.9902">
        <g clipPath="url(#clip0_1_423)" id="Icon">
          <path d={svgPaths.p1fb2fb40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
          <path d={svgPaths.pa01fa80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
        </g>
        <defs>
          <clipPath id="clip0_1_423">
            <rect fill="white" height="17.9902" width="17.9902" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#3a3a3a] content-stretch flex h-[20px] items-center justify-center left-[264.1px] pr-[0.01px] rounded-[44px] top-[22px] w-[63px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">~2–3 hrs</p>
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[209px] left-px overflow-clip top-0 w-[343px]" data-name="ImageWithFallback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[109.27%] left-[0.02%] max-w-none top-0 w-[99.88%]" src={imgImageWithFallback1} />
        </div>
        <div className="absolute bg-gradient-to-b from-[60.746%] from-[rgba(0,0,0,0)] inset-0 to-[85.746%] to-[rgba(0,0,0,0.8)]" />
      </div>
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[300.21px] not-italic text-[16px] text-right text-white top-[170px] tracking-[-0.3125px]">$</p>
      <Frame60 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[40px] left-[16px] not-italic text-[24px] text-white top-[168px] tracking-[-1.5px]">Urban Art Experience</p>
      <Icon15 />
      <Button4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="col-1 h-[209px] ml-0 mt-[18px] overflow-clip relative rounded-[17.2px] row-1 w-[343.21px]" data-name="Container">
      <ImageWithFallback1 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="col-1 content-stretch flex gap-[2px] items-center justify-center ml-[135px] mt-0 pb-[20px] pt-[4px] px-[12px] relative rounded-tl-[16px] rounded-tr-[16px] row-1" style={{ backgroundImage: "linear-gradient(95.1955deg, rgb(220, 54, 8) 4.4464%, rgb(255, 148, 47) 51.347%, rgb(195, 42, 0) 99.158%)" }}>
      <div className="relative shrink-0 size-[12px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <p className="font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[24px] relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">Perfect for slow afternoons</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Container22 />
      <Frame19 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="relative rounded-[11.789px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[11.789px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[11.789px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[11.789px] size-full" src={imgFrame70} />
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[147px]">
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.35] min-w-full relative shrink-0 text-[#7f7f7f] text-[11px] w-[min-content] whitespace-pre-wrap">Hosted by</p>
      <p className="font-['Poppins:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#171717] text-[14px] tracking-[-0.3125px]">@iamlorina</p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame65 />
      <Frame66 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[69.837px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-29.6px)] not-italic text-[14px] text-white top-[calc(50%-5px)] tracking-[-0.3125px]">Join Trail</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex h-[35px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[97px]" data-name="Button" style={{ backgroundImage: "linear-gradient(106.085deg, rgb(0, 5, 30) 11.855%, rgb(3, 3, 192) 38.97%, rgb(56, 125, 236) 83.731%, rgb(133, 200, 255) 101.38%)" }}>
      <Text3 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame64 />
      <Button5 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[343.21px]">
      <Group6 />
      <Frame63 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0 size-[30px]">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🥐</p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-white h-[30px] relative rounded-[30px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center p-[16px] relative">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[12px] tracking-[-0.2px]">16 Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[16px] top-[17px]">
      <Frame69 />
      <Frame70 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[308.21px] size-[17.99px] top-[167.01px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9902 17.9902">
        <g clipPath="url(#clip0_1_423)" id="Icon">
          <path d={svgPaths.p1fb2fb40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
          <path d={svgPaths.pa01fa80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
        </g>
        <defs>
          <clipPath id="clip0_1_423">
            <rect fill="white" height="17.9902" width="17.9902" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#3a3a3a] content-stretch flex h-[20px] items-center justify-center left-[264.1px] pr-[0.01px] rounded-[44px] top-[22px] w-[63px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">~3–4 hrs</p>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute h-[209px] left-px overflow-clip top-0 w-[343px]" data-name="ImageWithFallback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[109.27%] left-[0.02%] max-w-none top-0 w-[99.88%]" src={imgImageWithFallback2} />
        </div>
        <div className="absolute bg-gradient-to-b from-[60.746%] from-[rgba(0,0,0,0)] inset-0 to-[85.746%] to-[rgba(0,0,0,0.8)]" />
      </div>
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[300.21px] not-italic text-[16px] text-right text-white top-[170px] tracking-[-0.3125px]">$$$</p>
      <Frame68 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[40px] left-[16px] not-italic text-[24px] text-white top-[168px] tracking-[-1.5px]">{`Street Art & Skates`}</p>
      <Icon16 />
      <Button6 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[209px] overflow-clip relative rounded-[17.2px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback2 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[60px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[16px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <img alt="" className="absolute h-[91.8%] left-[-18.56%] max-w-none top-[-0.16%] w-[137.7%]" src={imgFrame71} />
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[9.919px] py-[5.951px] relative rounded-[11.789px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[11.789px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[11.789px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[11.789px] size-full" src={imgFrame70} />
      </div>
      <Frame74 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[147px]">
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.35] min-w-full relative shrink-0 text-[#7f7f7f] text-[11px] w-[min-content] whitespace-pre-wrap">Hosted by</p>
      <p className="font-['Poppins:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#171717] text-[14px] tracking-[-0.3125px]">@TravelwithTejas</p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame73 />
      <Frame75 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[69.837px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-29.6px)] not-italic text-[14px] text-white top-[calc(50%-5px)] tracking-[-0.3125px]">Join Trail</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex h-[35px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[97px]" data-name="Button" style={{ backgroundImage: "linear-gradient(106.085deg, rgb(0, 5, 30) 11.855%, rgb(3, 3, 192) 38.97%, rgb(56, 125, 236) 83.731%, rgb(133, 200, 255) 101.38%)" }}>
      <Text4 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame72 />
      <Button7 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[343.21px]">
      <Container23 />
      <Frame71 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[30px] shrink-0 size-[30px]">
      <p className="font-['Poppins:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] tracking-[-0.2px]">🥐</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-white h-[30px] relative rounded-[30px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center p-[16px] relative">
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3a3a3a] text-[12px] tracking-[-0.2px]">15 Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[16.1px] top-[17px]">
      <Frame78 />
      <Frame79 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[308.21px] size-[17.99px] top-[167.01px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9902 17.9902">
        <g clipPath="url(#clip0_1_423)" id="Icon">
          <path d={svgPaths.p1fb2fb40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
          <path d={svgPaths.pa01fa80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49918" />
        </g>
        <defs>
          <clipPath id="clip0_1_423">
            <rect fill="white" height="17.9902" width="17.9902" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#3a3a3a] content-stretch flex h-[20px] items-center justify-center left-[264.1px] pr-[0.01px] rounded-[44px] top-[22px] w-[63px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.3125px]">~3–4 hrs</p>
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[209px] left-px overflow-clip top-0 w-[343px]" data-name="ImageWithFallback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[109.27%] left-[0.02%] max-w-none top-0 w-[99.88%]" src={imgImageWithFallback3} />
        </div>
        <div className="absolute bg-gradient-to-b from-[52.871%] from-[rgba(0,0,0,0)] inset-0 to-[85.746%] to-[rgba(0,0,0,0.8)]" />
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[279.21px] not-italic text-[16px] text-white top-[170px] tracking-[-0.3125px]">$$</p>
      <Frame77 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.1] left-[16.1px] not-italic text-[24px] text-white top-[146px] tracking-[-1.5px] w-[248px] whitespace-pre-wrap">{`Fam Meetup & Experiences`}</p>
      <Icon17 />
      <Button8 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[209px] overflow-clip relative rounded-[17.2px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback3 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="relative rounded-[12.8px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12.8px]">
        <div className="absolute bg-[rgba(80,80,80,0.2)] inset-0 rounded-[12.8px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[12.8px]">
          <img alt="" className="absolute h-[115.38%] left-[-36.54%] max-w-none top-[-7.69%] w-[173.08%]" src={imgFrame69} />
        </div>
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-[147px]">
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.35] min-w-full relative shrink-0 text-[#7f7f7f] text-[11px] w-[min-content] whitespace-pre-wrap">Hosted by</p>
      <p className="font-['Poppins:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#171717] text-[14px] tracking-[-0.3125px]">@TheEnthusiastSam</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame82 />
      <Frame83 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-[69.837px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-29.6px)] not-italic text-[14px] text-white top-[calc(50%-5px)] tracking-[-0.3125px]">Join Trail</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex h-[35px] items-center justify-center pr-[0.01px] relative rounded-[44px] shrink-0 w-[97px]" data-name="Button" style={{ backgroundImage: "linear-gradient(106.085deg, rgb(0, 5, 30) 11.855%, rgb(3, 3, 192) 38.97%, rgb(56, 125, 236) 83.731%, rgb(133, 200, 255) 101.38%)" }}>
      <Text5 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame81 />
      <Button9 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[343.21px]">
      <Container24 />
      <Frame80 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 overflow-clip top-[387px] w-[375px]">
      <Frame51 />
      <div className="bg-[#f1f1f1] h-[3px] shrink-0 w-full" />
      <Frame59 />
      <div className="bg-[#f1f1f1] h-[3px] shrink-0 w-full" />
      <Frame67 />
      <div className="bg-[#f1f1f1] h-[3px] shrink-0 w-full" />
      <Frame76 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="-translate-x-1/2 absolute bg-white h-[1650px] left-1/2 overflow-clip rounded-[30px] top-[294px] w-[375px]">
      <Frame14 />
      <Frame9 />
      <Frame42 />
      <Frame48 />
      <Frame49 />
      <Frame50 />
    </div>
  );
}

export default function CreatorLedTrailsDiscovery() {
  return (
    <div className="bg-white relative size-full" data-name="Creator Led Trails: Discovery 1.1">
      <StatusBar />
      <Frame />
      <Frame41 />
    </div>
  );
}