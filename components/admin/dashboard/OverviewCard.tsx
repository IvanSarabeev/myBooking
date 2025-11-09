import { FC } from "react";
import { ArrowDown, ArrowUp, Layers } from "lucide-react";

type Trend = "up" | "down" | "neutral";

type OverviewCardProps = {
  title: string;
  value: number;
  change?: number;
  trend: Trend;
};

const OverviewCard: FC<OverviewCardProps> = ({
  title,
  value,
  change,
  trend = "neutral",
}) => {
  const getTrendColor = (trend: Trend) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  const iconSize = "size-4";

  const getTrendIcon = (trend: Trend) => {
    switch (trend) {
      case "up":
        return <ArrowUp className={iconSize} />;
      case "down":
        return <ArrowDown className={iconSize} />;
      default:
        return <Layers className={iconSize} />;
    }
  };

  const trendColor = getTrendColor(trend);
  const trendIcon = getTrendIcon(trend);

  return (
    <div className="flex flex-col justify-between gap-y-5 rounded-2xl border border-[#EDF1F1] p-4 shadow-sm bg-white">
      <div className="size-fit flex items-center justify-between gap-x-2.5">
        <h4 className="text-base font-semibold leading-[22px] tracking-tight text-[#64748B]">
          {title}
        </h4>

        {change && (
          <div className={`flex items-center gap-0.5 text-base ${trendColor}`}>
            {trendIcon}

            {Math.abs(change)}
          </div>
        )}
      </div>

      <p className="text-3xl font-semibold leading-8 tracking-tight text-[#1E293B]">
        {value}
      </p>
    </div>
  );
};

export default OverviewCard;
