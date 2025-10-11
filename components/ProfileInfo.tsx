import { FC } from "react";
import { getUserById } from "@/lib/actions/user";
import UserStatusLabel from "@/components/UserStatusLabel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";
import Image from "next/image";

type ProfileInfoProps = {
  userId: string;
};

const ProfileInfo: FC<ProfileInfoProps> = async ({ userId }) => {
  const user = await getUserById(userId);

  if (!user) return;

  return (
    <section className="relative w-full h-fit sm:max-w-[566px] flex flex-col gap-y-6 md:gap-8 xl:gap-9 p-10 pt-28 bg-gradient-to-r from-[#232839] from-60% to-[#12141D] rounded-[20px] text-light-100 mx-auto">
      <div className="absolute -top-4 left-[45%] z-10">
        <Image
          src="/icons/upside-down-tick.svg"
          alt="tick"
          height={88}
          width={59}
          loading="lazy"
        />
      </div>
      <div className="size-fit max-w-[486px] flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8">
        <div className="size-fit flex flex-col sm:flex-row items-start gap-4 md:gap-x-5 lg:gap-x-8 mr-auto">
          <Avatar className="size-[99px] border-[10px] border-[#333C5C33] rounded-[50%]">
            {/*<AvatarImage src={imgSrc} alt="profile" />*/}
            <AvatarFallback className="bg-slate-900 text-xl font-semibold">
              {getNameInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="gap-y-2.5 flex flex-col items-start text-start text-light-100">
            <UserStatusLabel status={user.status} />
            <p className="text-2xl leading-7 font-semibold tracking-tight">
              {user.fullName}
            </p>
            <p className="text-lg leading-5 font-normal tracking-tight">
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 md:gap-2">
          <p className="text-lg font-normal leading-7">University</p>
          <p className="text-2xl font-semibold leading-8 tracking-tight">
            JS Mastery Pro
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="text-lg font-normal leading-7">Student ID</p>
          <p className="text-2xl font-semibold leading-8 tracking-tight">
            234567856
          </p>
        </div>
        <Image
          src="/images/card-demo.png"
          alt="university card"
          height={267}
          width={486}
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </section>
  );
};

export default ProfileInfo;
